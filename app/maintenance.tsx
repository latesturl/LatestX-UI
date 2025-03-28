"use client"

import { useEffect } from "react"
import Link from "next/link"
import { siteConfig } from "@/lib/config"

export default function Maintenance() {
  useEffect(() => {
    // Create sparkle effect similar to 404 page but less frequent
    const createSparkle = () => {
      const snowContainer = document.getElementById("snow-container")
      if (!snowContainer) return

      const sparkle = document.createElement("div")
      sparkle.classList.add("snowflake")
      sparkle.textContent = "❄️" // Snowflake character

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

    // Create sparkles every 500ms (balanced frequency)
    const sparkleInterval = setInterval(createSparkle, 500)

    // Limit the maximum number of snowflakes
    const maxSnowflakes = 40
    const checkSnowflakesCount = setInterval(() => {
      const snowContainer = document.getElementById("snow-container")
      if (snowContainer && snowContainer.children.length > maxSnowflakes) {
        // Remove oldest snowflakes if we exceed the maximum
        while (snowContainer.children.length > maxSnowflakes) {
          snowContainer.removeChild(snowContainer.firstChild)
        }
      }
    }, 2000)

    // Clean up intervals on component unmount
    return () => {
      clearInterval(sparkleInterval)
      clearInterval(checkSnowflakesCount)
    }
  }, [])

  return (
    <div className="bg-white text-gray-900 flex items-center justify-center h-screen w-screen overflow-hidden fixed inset-0 transition-colors duration-300">
      <div className="text-center morph-item px-4 sm:px-6 max-w-md w-full">
        <div className="mx-auto mb-4 relative w-48 h-48 sm:w-56 sm:h-56">
          <img
            src="https://raw.githubusercontent.com/latesturl/dbCDN/refs/heads/main/my-DB/maintenance.gif"
            alt="Maintenance"
            className="object-contain w-full h-full"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{siteConfig.maintenance.title}</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-4">{siteConfig.maintenance.message}</p>

        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition morph-button"
          >
            Retry
          </button>
          {siteConfig.maintenance.showHomeLink && (
            <Link
              href="/"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition morph-button"
            >
              Go Home
            </Link>
          )}
        </div>
      </div>

      <div id="snow-container" className="pointer-events-none">
        {/* Snowflakes will be generated dynamically with JavaScript */}
      </div>
    </div>
  )
}

