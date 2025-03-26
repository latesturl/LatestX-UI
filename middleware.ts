import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { siteConfig } from "@/lib/config"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
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

  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next()

    // Add CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

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

