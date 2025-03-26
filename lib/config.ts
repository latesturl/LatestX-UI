// Site configuration
export const siteConfig = {
  // Website information
  name: "LatestX-Api's",
  description: "Beautiful, modern, and easy-to-use API documentation",
  version: "1.0.0",
  status: "online", // "online" or "offline"
  copyright: "© 2025 LatestURL. All rights reserved.",

  // Maintenance mode configuration
  maintenance: {
    enabled: false, // Set to true to enable maintenance mode
    title: "Website Under Maintenance",
    message:
      "We're currently upgrading our systems to serve you better. Please check back in a few hours. We apologize for any inconvenience caused.",
    showHomeLink: false, // Whether to show the "Go Home" button
    // API response during maintenance
    apiResponse: {
      status: false,
      message:
        "Our API services are currently undergoing scheduled maintenance. We expect to be back online shortly. Thank you for your patience.",
    },
  },

  // Logo configuration
  logo: {
    // Set to empty string for no logo (default)
    // For local file: "/path/to/logo.svg"
    // For URL: "https://example.com/logo.svg"
    src: "https://raw.githubusercontent.com/latesturl/dbCDN/refs/heads/main/logo.svg",
    width: 40,
    height: 40,
    alt: "LatestX-Api's", // Alt text for accessibility
    autoInvert: true, // Automatically invert logo color based on theme
  },

  // Background configuration - just change the type and value to update the background
  background: {
    type: "default", // "default", "gradient", "image", "pattern"
    value: "", // URL for image, gradient string, or pattern name
    // Add responsive options
    responsive: {
      mobile: true, // Enable mobile-specific optimizations
      fallbackColor: "#121212", // Fallback color while image loads
    },
  },

  // API information
  api: {
    baseUrl: "https://api.raolprojects.my.id", // Updated base URL
    creator: "LatestURL",
  },

  // Social links
  links: {
    github: "https://github.com/latesturl",
  },

  // Status codes
  statusCodes: [
    { code: 200, name: "OK", description: "The request was successful." },
    { code: 400, name: "Bad Request", description: "The request was invalid or cannot be served." },
    { code: 403, name: "Forbidden", description: "The request is forbidden." },
    { code: 429, name: "Too Many Requests", description: "Rate limit exceeded." },
    { code: 500, name: "Internal Server Error", description: "An error occurred on the server." },
  ],

  // Media types
  mediaTypes: [
    {
      type: "application/json",
      description: "JSON data format for structured information",
      badge: "JSON",
    },
    {
      type: "image/png",
      description: "PNG image format with transparency support",
      badge: "PNG",
    },
    {
      type: "image/jpeg",
      description: "JPEG image format for photographs",
      badge: "JPEG",
    },
    {
      type: "text/plain",
      description: "Plain text format for simple content",
      badge: "TEXT",
    },
    {
      type: "application/octet-stream",
      description: "Binary data format for raw file downloads",
      badge: "BIN",
    },
  ],

  // API Categories and Endpoints
  apiCategories: [
    {
      name: "AI",
      color: "blue",
      endpoints: [
        {
          method: "POST",
          path: "/ai/hydromind",
          description: "Generate AI responses using HydroMind",
          mediaType: "application/json",
          parameters: [
            { name: "text", type: "string", required: true, description: "The text prompt to send to the AI" },
            {
              name: "model",
              type: "string",
              required: true,
              description: "The AI model to use (e.g., @groq/qwen-2.5-32b)",
            },
            {
              name: "responses",
              type: "number",
              required: false,
              description: "Number of responses to generate (optional)",
            },
          ],
        },
        {
          method: "GET",
          path: "/ai/luminai",
          description: "Generate AI responses using LuminAI",
          mediaType: "application/json",
          parameters: [
            { name: "text", type: "string", required: true, description: "The text prompt to send to the AI" },
          ],
        },
      ],
    },
    {
      name: "Media",
      color: "purple",
      endpoints: [
        {
          method: "GET",
          path: "/random/ba",
          description: "Get a random Blue Archive image",
          mediaType: "image/png",
          parameters: [],
        },
      ],
    },
  ],
}

// Helper function to get category color
export function getCategoryColor(category: string) {
  const categoryConfig = siteConfig.apiCategories.find((c) => c.name === category)

  switch (categoryConfig?.color) {
    case "blue":
      return "bg-blue-500/10 text-blue-500 border-blue-500/30"
    case "purple":
      return "bg-purple-500/10 text-purple-500 border-purple-500/30"
    case "green":
      return "bg-green-500/10 text-green-500 border-green-500/30"
    case "yellow":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
    case "red":
      return "bg-red-500/10 text-red-500 border-red-500/30"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/30"
  }
}

// Helper function to get method color
export function getMethodColor(method: string) {
  switch (method) {
    case "GET":
      return "bg-green-500/10 text-green-500 border-green-500/30"
    case "POST":
      return "bg-blue-500/10 text-blue-500 border-blue-500/30"
    case "PUT":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
    case "DELETE":
      return "bg-red-500/10 text-red-500 border-red-500/30"
    default:
      return "bg-purple-500/10 text-purple-500 border-purple-500/30"
  }
}

// Helper function to get media type color and badge
export function getMediaTypeInfo(mediaType: string) {
  const mediaTypeConfig = siteConfig.mediaTypes.find((m) => m.type === mediaType)

  if (!mediaTypeConfig) {
    return {
      color: "bg-gray-500/10 text-gray-500 border-gray-500/30",
      badge: "DATA",
    }
  }

  // Use more explicit and consistent color classes that will work in production
  switch (mediaType) {
    case "application/json":
      return {
        color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
        badge: mediaTypeConfig.badge,
      }
    case "image/png":
      return {
        color: "bg-purple-500/10 text-purple-500 border-purple-500/30",
        badge: mediaTypeConfig.badge,
      }
    case "image/jpeg":
      return {
        color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30",
        badge: mediaTypeConfig.badge,
      }
    case "image/gif":
      return {
        color: "bg-pink-500/10 text-pink-500 border-pink-500/30",
        badge: mediaTypeConfig.badge,
      }
    case "text/plain":
      return {
        color: "bg-blue-500/10 text-blue-500 border-blue-500/30",
        badge: mediaTypeConfig.badge,
      }
    case "text/html":
      return {
        color: "bg-orange-500/10 text-orange-500 border-orange-500/30",
        badge: mediaTypeConfig.badge,
      }
    case "application/octet-stream":
      return {
        color: "bg-slate-500/10 text-slate-500 border-slate-500/30",
        badge: mediaTypeConfig.badge,
      }
    default:
      return {
        color: "bg-gray-500/10 text-gray-500 border-gray-500/30",
        badge: mediaTypeConfig.badge || "DATA",
      }
  }
}

// Helper function to get status code color
export function getStatusCodeColor(code: number) {
  if (code >= 200 && code < 300) return "status-200 bg-green-500/10 text-green-500 border-green-500/30"
  if (code >= 300 && code < 400) return "bg-blue-500/10 text-blue-500 border-blue-500/30"
  if (code >= 400 && code < 500) return "status-400 bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
  if (code >= 500) return "status-500 bg-red-500/10 text-red-500 border-red-500/30"
  return "bg-gray-500/10 text-gray-500 border-gray-500/30"
}

// Update the getBackgroundStyles function to be more responsive
export function getBackgroundStyles() {
  const { type, value, responsive } = siteConfig.background
  const fallbackColor = responsive?.fallbackColor || "#121212"

  switch (type) {
    case "gradient":
      return {
        background: value,
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }
    case "image":
      return {
        backgroundColor: fallbackColor, // Fallback color while image loads
        backgroundImage: `url(${value})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        // Fix for iOS
        WebkitBackgroundSize: "cover",
        MozBackgroundSize: "cover",
        OBackgroundSize: "cover",
      }
    case "pattern":
      return {
        backgroundImage: `url(/patterns/${value || "topography"}.svg)`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "scroll", // Better for mobile
        position: "relative",
        width: "100%",
        minHeight: "100vh",
      }
    default:
      return {
        position: "relative",
        width: "100%",
        minHeight: "100vh",
      } // Default theme handled by Tailwind
  }
}

// Helper function to get the overlay styles
export function getOverlayStyles() {
  const { type, overlay, overlayOpacity } = siteConfig.background

  if (type === "image" && overlay) {
    return {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity || 0.7})`,
      zIndex: -1,
    }
  }

  return {}
}

