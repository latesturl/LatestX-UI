import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";
import { memoryCache } from "@/lib/cache";
import os from "os";

const CACHE_TTL = 1800; // Cache TTL dalam detik (30 menit)

export async function GET() {
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
    );
  }

  const cacheKey = `server-info`;
  const cachedResponse = memoryCache.get(cacheKey);

  if (cachedResponse) {
    return new NextResponse(
      JSON.stringify(
        {
          status: true,
          creator: siteConfig.api.creator,
          server: cachedResponse,
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
    );
  }

  try {
    const uptime = process.uptime();
    const cpuUsage = os.loadavg()[0];
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memUsage = ((usedMem / totalMem) * 100).toFixed(2);

    const serverInfo = {
      uptime: `${Math.floor(uptime)}s`,
      cpuLoad: cpuUsage.toFixed(2),
      memory: {
        total: `${(totalMem / 1024 / 1024).toFixed(2)} MB`,
        used: `${(usedMem / 1024 / 1024).toFixed(2)} MB`,
        free: `${(freeMem / 1024 / 1024).toFixed(2)} MB`,
        usage: `${memUsage}%`,
      },
      platform: os.platform(),
      arch: os.arch(),
    };

    memoryCache.set(cacheKey, serverInfo, CACHE_TTL);

    return new NextResponse(
      JSON.stringify(
        {
          status: true,
          creator: siteConfig.api.creator,
          server: serverInfo,
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
    );
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
    );
  }
}
