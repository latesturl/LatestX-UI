import { NextResponse } from "next/server"
import { siteConfig } from "@/lib/config"
import { memoryCache } from "@/lib/cache"

// Set a reasonable timeout for the external API call
const API_TIMEOUT = 10000 // 10 seconds
// Cache TTL in seconds for successful responses
const CACHE_TTL = 1800 // 30 minutes

async function hydromind(content: string, model: string, responses?: number) {
  try {
    // Create a cache key based on the parameters
    const cacheKey = `hydromind-${content}-${model}-${responses || 1}`

    // Try to get from cache first
    const cachedResponse = memoryCache.get(cacheKey)
    if (cachedResponse) {
      return {
        result: cachedResponse,
        cached: true,
      }
    }

    const formData = new FormData()
    formData.append("content", content)
    formData.append("model", model)

    // Add responses parameter if provided
    if (responses) {
      formData.append("responses", responses.toString())
    }

    // Create an AbortController to handle timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

    try {
      const response = await fetch("https://mind.hydrooo.web.id/v1/chat/", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      })

      clearTimeout(timeoutId) // Clear the timeout if the request completes

      // Get the response text first
      const responseText = await response.text()

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${responseText}`)
      }

      // Try to parse as JSON, but handle text responses gracefully
      try {
        const data = JSON.parse(responseText)

        // Cache the successful response
        if (data.result) {
          memoryCache.set(cacheKey, data.result, CACHE_TTL)
        }

        return data
      } catch (parseError) {
        // If it's not valid JSON, return a structured response
        const result = responseText.trim()

        // Cache the successful response
        memoryCache.set(cacheKey, result, CACHE_TTL)

        return {
          result,
        }
      }
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("External API request timed out after 10 seconds")
      }
      throw error
    }
  } catch (error) {
    console.error("Hydromind API error:", error)
    throw error
  }
}

// Simple function to check if the external API is available
async function checkApiStatus() {
  // Check if we have a cached status
  const cachedStatus = memoryCache.get("hydromind-api-status")
  if (cachedStatus !== null) {
    return cachedStatus
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout for status check

    try {
      const response = await fetch("https://mind.hydrooo.web.id/", {
        method: "HEAD",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      const status = response.ok

      // Cache the status for 5 minutes (300 seconds)
      memoryCache.set("hydromind-api-status", status, 300)

      return status
    } catch (error) {
      clearTimeout(timeoutId)

      // Cache the failed status for 1 minute (60 seconds)
      memoryCache.set("hydromind-api-status", false, 60)

      return false
    }
  } catch (error) {
    // Cache the failed status for 1 minute (60 seconds)
    memoryCache.set("hydromind-api-status", false, 60)

    return false
  }
}

export async function POST(request: Request) {
  // Check if maintenance mode is enabled
  if (siteConfig.maintenance.enabled) {
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

  try {
    // Safely parse the request body
    let body
    try {
      body = await request.json()
    } catch (error) {
      return new NextResponse(
        JSON.stringify(
          {
            status: false,
            creator: siteConfig.api.creator,
            error: "Invalid JSON in request body",
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

    const { text, model, responses } = body

    if (!text || !model) {
      return new NextResponse(
        JSON.stringify(
          {
            status: false,
            creator: siteConfig.api.creator,
            error: "Text and Model are required",
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

    // Check if the external API is available
    const isApiAvailable = await checkApiStatus()
    if (!isApiAvailable) {
      return new NextResponse(
        JSON.stringify(
          {
            status: false,
            creator: siteConfig.api.creator,
            error: "External API is currently unavailable. Please try again later.",
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

    try {
      const data = await hydromind(text, model, responses ? Number(responses) : undefined)

      return new NextResponse(
        JSON.stringify(
          {
            status: true,
            creator: siteConfig.api.creator,
            result: data.result,
            cached: data.cached || false,
            version: "v2",
          },
          null,
          2,
        ),
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": data.cached
              ? "public, max-age=1800, s-maxage=3600"
              : "public, max-age=1800, s-maxage=3600",
          },
        },
      )
    } catch (error) {
      // Handle specific error types
      if (error.message.includes("timed out")) {
        return new NextResponse(
          JSON.stringify(
            {
              status: false,
              creator: siteConfig.api.creator,
              error: "Request to external API timed out. Try a simpler prompt or try again later.",
            },
            null,
            2,
          ),
          {
            status: 504, // Gateway Timeout
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Cache-Control": "no-store",
            },
          },
        )
      }

      return new NextResponse(
        JSON.stringify(
          {
            status: false,
            creator: siteConfig.api.creator,
            error: error instanceof Error ? error.message : "External API error",
          },
          null,
          2,
        ),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
          },
        },
      )
    }
  } catch (error) {
    // Catch-all error handler
    console.error("Unhandled error in hydromind route:", error)
    return new NextResponse(
      JSON.stringify(
        {
          status: false,
          creator: siteConfig.api.creator,
          error: "An unexpected error occurred",
        },
        null,
        2,
      ),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      },
    )
  }
}

// Add a health check endpoint
export async function GET() {
  const isApiAvailable = await checkApiStatus()

  return new NextResponse(
    JSON.stringify(
      {
        status: isApiAvailable,
        creator: siteConfig.api.creator,
        message: isApiAvailable ? "HydroMind API is available" : "HydroMind API is currently unavailable",
        version: "v2",
      },
      null,
      2,
    ),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=60, s-maxage=300", // Cache for 1 minute client-side, 5 minutes on CDN
      },
    },
  )
}

