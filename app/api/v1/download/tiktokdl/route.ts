import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";
import { memoryCache } from "@/lib/cache";

// Cache TTL (dalam detik)
const CACHE_TTL = 3600; // 1 jam

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

  // Ambil parameter query
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse(
      JSON.stringify(
        {
          status: false,
          creator: siteConfig.api.creator,
          error: "Parameter 'url' diperlukan",
          version: "v1",
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
    // Buat cache key berdasarkan URL
    const cacheKey = `tiktokdl-${url}`;
    const cachedResponse = memoryCache.get<ArrayBuffer>(cacheKey);

    if (cachedResponse) {
      return new NextResponse(cachedResponse, {
        headers: {
          "Content-Type": "video/mp4",
          "Cache-Control": "public, max-age=1800, s-maxage=3600",
          "X-Creator": siteConfig.api.creator,
          "X-Version": "v1",
          "X-Cached": "true",
        },
      });
    }

    // Kirim request ke API eksternal
    const formData = new FormData();
    formData.append("id", url);

    const response = await fetch("https://ttsave.app/download", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Gagal mendapatkan video (Status ${response.status})`);
    }

    const videoBuffer = await response.arrayBuffer();

    // Simpan di cache
    memoryCache.set(cacheKey, videoBuffer, CACHE_TTL);

    // Kirim response dalam format MP4
    return new NextResponse(videoBuffer, {
      headers: {
        "Content-Type": "video/mp4",
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
          version: "v1",
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
