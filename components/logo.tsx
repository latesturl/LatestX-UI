"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from "next/image"
import { siteConfig } from "@/lib/config"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({
  className = "",
  width = siteConfig.logo.width || 32,
  height = siteConfig.logo.height || 32,
}: LogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [inverted, setInverted] = useState(true) // Default to inverted (white) for dark theme

  useEffect(() => {
    setMounted(true)
    // Determine if we should invert based on theme
    const isDark = theme === "dark" || resolvedTheme === "dark"
    setInverted(isDark)
  }, [theme, resolvedTheme])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div style={{ width, height }} />
  }

  if (!siteConfig.logo.src) {
    return null
  }

  // If auto-invert is enabled, apply filter for color inversion
  const filterStyle = siteConfig.logo.autoInvert && inverted ? { filter: "invert(1) brightness(2)" } : {}

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src={siteConfig.logo.src || "/placeholder.svg"}
        alt={siteConfig.logo.alt || siteConfig.name}
        width={width}
        height={height}
        className="h-auto"
        style={filterStyle}
      />
    </div>
  )
}

