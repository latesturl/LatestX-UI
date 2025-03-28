import { NextResponse } from "next/server"
import { siteConfig } from "@/lib/config"
import { memoryCache } from "@/lib/cache"

// Cache TTL in seconds
const CACHE_TTL = 3600 // 1 hour
const LINKS_CACHE_KEY = "ba-image-links"

export async function GET() {
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
    // Try to get image URLs from cache first
    let imageUrls = memoryCache.get<string[]>(LINKS_CACHE_KEY)

    // If not in cache, fetch them
    if (!imageUrls) {
      const response = await fetch(
        "https://raw.githubusercontent.com/latesturl/blue-archive-r-img/refs/heads/main/links.json",
      )
      imageUrls = await response.json()

      // Cache the image URLs
      memoryCache.set(LINKS_CACHE_KEY, imageUrls, CACHE_TTL)
    }

    // Select a random image URL
    const randomUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)]

    // Fetch the image
    const imageResponse = await fetch(randomUrl)
    const imageArrayBuffer = await imageResponse.arrayBuffer()

    // Return the image with appropriate headers
    return new NextResponse(imageArrayBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache, no-store, must-revalidate", // Don't cache random images
        "X-Creator": siteConfig.api.creator,
        "X-Version": "v2",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        creator: siteConfig.api.creator,
        error: error instanceof Error ? error.message : "An error occurred",
        version: "v2",
      },
      { status: 500 },
    )
  }
}

