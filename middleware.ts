import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { siteConfig } from "@/lib/config"
import { memoryCache } from "@/lib/cache"

// Get rate limiting configuration from siteConfig
const RATE_LIMIT = siteConfig.api.rateLimit.limit // requests per minute (configurable in config.ts)
const RATE_LIMIT_WINDOW = siteConfig.api.rateLimit.windowMs // time window in milliseconds
const RATE_LIMIT_RESET = siteConfig.api.rateLimit.resetTimeMs // reset time in milliseconds
const HEADER_PREFIX = siteConfig.api.rateLimit.headerPrefix // prefix for rate limit headers

// Rate limiting implementation
function getRateLimitResponse(ip: string) {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW

  // Get the requests for this IP
  const requestHistory = memoryCache.get<number[]>(`rate-limit:${ip}`) || []

  // Filter out requests outside the current window
  const recentRequests = requestHistory.filter((timestamp) => timestamp > windowStart)

  // Check if the rate limit is exceeded
  if (recentRequests.length >= RATE_LIMIT) {
    return new NextResponse(
      JSON.stringify(
        {
          status: false,
          creator: siteConfig.api.creator,
          error: "Rate limit exceeded. Please try again later.",
          limit: RATE_LIMIT,
          window: siteConfig.api.rateLimit.window,
          resetTime: Math.ceil((now + RATE_LIMIT_RESET) / 1000),
        },
        null,
        2,
      ),
      {
        status: 429, // Too Many Requests
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
          [`${HEADER_PREFIX}-Limit`]: RATE_LIMIT.toString(),
          [`${HEADER_PREFIX}-Remaining`]: "0",
          [`${HEADER_PREFIX}-Reset`]: Math.ceil((now + RATE_LIMIT_RESET) / 1000).toString(),
        },
      },
    )
  }

  // Add the current request to history and update the cache
  recentRequests.push(now)
  memoryCache.set(`rate-limit:${ip}`, recentRequests, RATE_LIMIT_RESET / 1000)

  // Return remaining requests info
  return {
    remaining: RATE_LIMIT - recentRequests.length,
    headers: {
      [`${HEADER_PREFIX}-Limit`]: RATE_LIMIT.toString(),
      [`${HEADER_PREFIX}-Remaining`]: (RATE_LIMIT - recentRequests.length).toString(),
      [`${HEADER_PREFIX}-Reset`]: Math.ceil((now + RATE_LIMIT_RESET) / 1000).toString(),
    },
  }
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get client IP
  const ip = request.ip || "unknown"

  // Check if maintenance mode is enabled
  if (siteConfig.maintenance.enabled) {
    // For API routes, return a JSON response
    if (request.nextUrl.pathname.startsWith("/api/")) {
      return new NextResponse(
        JSON.stringify(
          {
            status: siteConfig.maintenance.apiResponse.status,
            creator: siteConfig.api.creator,
            message: siteConfig.maintenance.apiResponse.message,
          },
          null,
          2,
        ),
        {
          status: 503, // Service Unavailable
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
          },
        },
      )
    }

    // For non-API routes, redirect to maintenance page
    // Skip redirect if already on the maintenance page
    if (request.nextUrl.pathname !== "/maintenance") {
      const url = request.nextUrl.clone()
      url.pathname = "/maintenance"
      return NextResponse.rewrite(url)
    }
  }

  // Handle API versioning and rate limiting
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // Block API requests that don't use versioning
    if (!request.nextUrl.pathname.startsWith("/api/v1/") && !request.nextUrl.pathname.startsWith("/api/v2/")) {
      return new NextResponse(
        JSON.stringify(
          {
            status: false,
            creator: siteConfig.api.creator,
            error: "API version is required. Please use /api/v1/ or /api/v2/",
          },
          null,
          2,
        ),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
          },
        },
      )
    }

    // Apply rate limiting for API requests
    const rateLimitResult = getRateLimitResponse(ip)

    // If rate limit is exceeded, return the error response
    if (rateLimitResult instanceof NextResponse) {
      return rateLimitResult
    }

    // Continue with the request but add rate limit headers
    const response = NextResponse.next()

    // Add CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    // Add rate limit headers
    Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    // Add caching headers for GET requests
    if (request.method === "GET") {
      // Cache successful responses for 1 hour (3600 seconds)
      response.headers.set("Cache-Control", "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400")
    }

    return response
  }

  // For static assets, add caching headers
  if (
    request.nextUrl.pathname.match(/\.(jpg|jpeg|gif|png|svg|ico|webp|css|js)$/) ||
    request.nextUrl.pathname.startsWith("/_next/")
  ) {
    const response = NextResponse.next()

    // Cache static assets for 7 days (604800 seconds)
    response.headers.set("Cache-Control", "public, max-age=604800, immutable")

    return response
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
}

