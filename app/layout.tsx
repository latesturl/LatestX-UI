import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import type React from "react"
import { siteConfig, getBackgroundStyles } from "@/lib/config"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: `${siteConfig.name} | API Documentation`,
  description: `${siteConfig.description}. Explore our API endpoints for various services.`,
  keywords: "free API, unlimited API, bot development, AI API, anime",
  robots: "index, follow",
  themeColor: "#4F46E5",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const backgroundStyles = getBackgroundStyles()

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased min-h-screen overflow-x-hidden`}
        style={backgroundStyles}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {siteConfig.background.type === "image" && <div className="fixed inset-0 bg-black/60 -z-10 w-full h-full" />}
          <div className="relative z-0 min-h-screen">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'