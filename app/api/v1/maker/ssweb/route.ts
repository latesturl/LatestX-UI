import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";
import { memoryCache } from "@/lib/cache";

// Cache TTL dalam detik (1 jam)
const CACHE_TTL = 3600;

export async function GET(request: Request) {
  // Cek mode maintenance
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
        status: 503, // Service Unavailable
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      }
    );
  }

  // Ambil query parameter
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse(
      JSON.stringify(
        {
          status: false,
          creator: siteConfig.api.creator,
          error: "Parameter 'url' wajib diisi",
        },
        null,
        2
      ),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      }
    );
  }

  try {
    // Cache key berdasarkan URL
    const cacheKey = `screenshot-${url}`;

    // Cek cache dulu
    const cachedResponse = memoryCache.get<ArrayBuffer>(cacheKey);
    if (cachedResponse) {
      return new NextResponse(cachedResponse, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=1800, s-maxage=3600",
          "X-Creator": siteConfig.api.creator,
          "X-Version": "v1",
          "X-Cached": "true",
        },
      });
    }

    // URL API screenshot
    const apiUrl = `https://shot.screenshotapi.net/v3/screenshot?token=CAT52T2-KBAMH90-QSRSS68-5G961WS&url=${encodeURIComponent(url)}&width=1920&height=1080&output=image&file_type=png&no_cookie_banners=true&wait_for_event=load`;

    // Fetch screenshot
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Gagal mengambil screenshot (${response.status})`);
    }

    // Ambil data gambar
    const imageBuffer = await response.arrayBuffer();

    // Simpan ke cache
    memoryCache.set(cacheKey, imageBuffer, CACHE_TTL);

    // Kirim gambar dengan header yang sesuai
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=1800, s-maxage=3600",
        "X-Creator": siteConfig.api.creator,
        "X-Version": "v1",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        {
          status: false,
          creator: siteConfig.api.creator,
          error: error instanceof Error ? error.message : "Terjadi kesalahan",
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
    );
  }
}
