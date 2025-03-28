"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  useEffect(() => {
    // Create sparkle effect
    const createSparkle = () => {
      const snowContainer = document.getElementById("snow-container")
      if (!snowContainer) return

      const sparkle = document.createElement("div")
      sparkle.classList.add("snowflake")
      sparkle.textContent = "✨" // Sparkle character

      // Set random position and animation duration for each sparkle
      const left = Math.random() * 100 // Random horizontal position
      const duration = Math.random() * 10 + 5 // Random duration between 5s and 15s
      const scale = Math.random() * 1.5 + 0.5 // Random size between 0.5 and 2

      sparkle.style.left = `${left}%`
      sparkle.style.animationDuration = `${duration}s`
      sparkle.style.transform = `scale(${scale})`

      snowContainer.appendChild(sparkle)

      // Remove sparkle after animation ends
      sparkle.addEventListener("animationend", () => {
        sparkle.remove()
      })
    }

    // Create sparkles every 300ms (reduced frequency from 100ms to 300ms)
    const sparkleInterval = setInterval(createSparkle, 300)

    // Clean up interval on component unmount
    return () => clearInterval(sparkleInterval)
  }, [])

  return (
    <div className="bg-white text-gray-900 flex items-center justify-center h-screen w-screen overflow-hidden fixed inset-0 transition-colors duration-300">
      <div className="text-center morph-item px-4 sm:px-6 max-w-md w-full">
        <div className="mx-auto mb-4 relative w-48 h-48 sm:w-56 sm:h-56">
          <Image src="/images/404.gif" alt="Confused Anime Girl" fill className="object-contain" priority />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          Oops! The page you&apos;re looking for doesn&apos;t exist. The anime girl is just as confused as you are.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition morph-button"
          >
            Retry
          </button>
          <Link
            href="/"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition morph-button"
          >
            Go Home
          </Link>
        </div>
      </div>

      <div id="snow-container" className="pointer-events-none">
        {/* Sparkles will be generated dynamically with JavaScript */}
      </div>
    </div>
  )
}

