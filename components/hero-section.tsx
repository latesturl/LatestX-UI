"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/lib/config"

export function HeroSection() {
  const scrollToApiEndpoints = () => {
    const apiEndpointsSection = document.getElementById("api-endpoints")
    if (apiEndpointsSection) {
      apiEndpointsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden py-12 md:py-24">
      <div className="container relative px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="relative mb-12">
            <div className="relative inline-block text-left">
              <div className="absolute -top-8 right-0 transform translate-x-1/2">
                <Badge
                  className="rounded-full px-4 py-1 text-sm font-medium"
                  style={{
                    backgroundColor: "rgba(209, 213, 219, 0.9)",
                    color: "rgb(31, 41, 55)",
                  }}
                >
                  {siteConfig.version}
                </Badge>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
                <span className="gradient-text">{siteConfig.name}</span>
              </h1>

              <div className="absolute -bottom-8 left-0 transform -translate-x-1/2">
                <Badge
                  className="rounded-full px-4 py-1 text-sm font-medium"
                  style={{
                    backgroundColor:
                      siteConfig.status === "online" ? "rgba(74, 222, 128, 0.9)" : "rgba(248, 113, 113, 0.9)",
                    color: "white",
                  }}
                >
                  {siteConfig.status === "online" ? "Online" : "Offline"}
                </Badge>
              </div>
            </div>
          </div>

          <p className="mb-8 md:mb-12 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {siteConfig.description}
          </p>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="h-12 px-8 text-base rounded-full bg-white text-black hover:bg-white/90"
              onClick={scrollToApiEndpoints}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

