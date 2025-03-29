import { NextResponse } from "next/server"
import { siteConfig } from "@/lib/config"
import { memoryCache } from "@/lib/cache"

// Cache TTL dalam detik (30 menit)
const CACHE_TTL = 1800

export async function GET(request: Request) {
  // Cek maintenance mode
  if (siteConfig.maintenance.enabled) {
    return new NextResponse(
      JSON.stringify(
        {
          status: siteConfig.maintenance.apiResponse.status,
          creator: siteConfig.api.creator,
          message: siteConfig.maintenance.apiResponse.message,
        },
        null,
        2
      ),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      }
    )
  }

  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json(
      {
        status: false,
        creator: siteConfig.api.creator,
        error: "URL is required",
      },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    )
  }

  try {
    const cacheKey = `ytmp3-${url}`
    const cachedResponse = memoryCache.get(cacheKey)

    if (cachedResponse) {
      return new NextResponse(
        JSON.stringify(
          {
            status: true,
            creator: siteConfig.api.creator,
            result: cachedResponse,
            cached: true,
            version: "v2",
          },
          null,
          2
        ),
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=1800, s-maxage=3600",
          },
        }
      )
    }

    // Fetch data dari API eksternal
    const response = await fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(url)}`)
    const data = await response.json()

    if (data.result) {
      memoryCache.set(cacheKey, data.result, CACHE_TTL)
    }

    return new NextResponse(
      JSON.stringify(
        {
          status: true,
          creator: siteConfig.api.creator,
          result: data.result,
          version: "v2",
        },
        null,
        2
      ),
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "public, max-age=1800, s-maxage=3600",
        },
      }
    )
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        {
          status: false,
          creator: siteConfig.api.creator,
          error: error instanceof Error ? error.message : "An error occurred",
        },
        null,
        2
      ),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      }
    )
  }
}
