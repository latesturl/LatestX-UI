import { NextResponse } from "next/server"; 
import { siteConfig } from "@/lib/config"; 
import { memoryCache } from "@/lib/cache";

// Cache TTL dalam detik (1 jam) const CACHE_TTL = 3600;

export async function GET(request) { // Periksa mode maintenance if (siteConfig.maintenance.enabled) { return new NextResponse( JSON.stringify( { status: siteConfig.maintenance.apiResponse.status, creator: siteConfig.api.creator, message: siteConfig.maintenance.apiResponse.message, }, null, 2 ), { status: 503, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", }, } ); }

// Ambil parameter URL const { searchParams } = new URL(request.url); const videoUrl = searchParams.get("url");

if (!videoUrl) { return new NextResponse( JSON.stringify( { status: false, creator: siteConfig.api.creator, error: "Parameter 'url' diperlukan", }, null, 2 ), { status: 400, headers: { "Content-Type": "application/json; charset=utf-8", }, } ); }

try { // Cek cache terlebih dahulu const cacheKey = tiktok-${videoUrl}; const cachedResponse = memoryCache.get(cacheKey); if (cachedResponse) { return new NextResponse(cachedResponse, { headers: { "Content-Type": "video/mp4", "Cache-Control": "public, max-age=1800, s-maxage=3600", "X-Creator": siteConfig.api.creator, "X-Version": "v1", "X-Cached": "true", }, }); }

// Fetch data dari downloader pihak ketiga
const response = await fetch(`https://api.tikmate.app/api/lookup?url=${encodeURIComponent(videoUrl)}`);
const data = await response.json();

if (!data || !data.videoUrl) {
  throw new Error("Gagal mendapatkan tautan unduhan");
}

// Fetch video dari URL
const videoResponse = await fetch(data.videoUrl);
const videoBuffer = await videoResponse.arrayBuffer();

// Simpan ke cache
memoryCache.set(cacheKey, videoBuffer, CACHE_TTL);

return new NextResponse(videoBuffer, {
  headers: {
    "Content-Type": "video/mp4",
    "Cache-Control": "public, max-age=1800, s-maxage=3600",
    "X-Creator": siteConfig.api.creator,
    "X-Version": "v1",
  },
});

} catch (error) { return new NextResponse( JSON.stringify( { status: false, creator: siteConfig.api.creator, error: error.message || "Terjadi kesalahan", }, null, 2 ), { status: 500, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", }, } ); } }
