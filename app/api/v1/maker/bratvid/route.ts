import { NextResponse } from "next/server"
import { siteConfig } from "@/lib/config"
import { memoryCache } from "@/lib/cache"

// Cache TTL in seconds
const CACHE_TTL = 3600 // 1 hour

export async function GET(request: Request) {
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

  // Get query parameters
  const { searchParams } = new URL(request.url)
  const text = searchParams.get("text")

  if (!text) {
    return new NextResponse(
      JSON.stringify(
        {
          status: false,
          creator: siteConfig.api.creator,
          error: "Text parameter is required",
          version: "v1",
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

  try {
    // Create a cache key based on the text parameter
    const cacheKey = `bratvid-${text}`

    // Try to get from cache first
    const cachedResponse = memoryCache.get<ArrayBuffer>(cacheKey)
    if (cachedResponse) {
      return new NextResponse(cachedResponse, {
        headers: {
          "Content-Type": "video/mp4",
          "Cache-Control": "public, max-age=1800, s-maxage=3600",
          "X-Creator": siteConfig.api.creator,
          "X-Version": "v1",
          "X-Cached": "true",
        },
      })
    }

    // Fetch the video from the external API
    const response = await fetch(`https://api.hiuraa.my.id/maker/bratvid?text=${encodeURIComponent(text)}`)

    if (!response.ok) {
      throw new Error(`External API returned status ${response.status}`)
    }

    // Get the video data
    const videoBuffer = await response.arrayBuffer()

    // Cache the video data
    memoryCache.set(cacheKey, videoBuffer, CACHE_TTL)

    // Return the video with appropriate headers
    return new NextResponse(videoBuffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Cache-Control": "public, max-age=1800, s-maxage=3600",
        "X-Creator": siteConfig.api.creator,
        "X-Version": "v1",
      },
    })
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        {
          status: false,
          creator: siteConfig.api.creator,
          error: error instanceof Error ? error.message : "An error occurred",
          version: "v1",
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

