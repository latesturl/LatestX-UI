// Site configuration
export const siteConfig = {
  // Website information
  name: "Kenz-Api's",
  description: "Modern, Simple, and easy-to-use API documentation",
  version: "1.0.0",
  status: "online", // "online" or "offline"
  copyright: "© 2025 KenzXUI. All rights reserved.",

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
    alt: "Kenzz-Api's", // Alt text for accessibility
    autoInvert: true, // Automatically invert logo color based on theme
  },

  // Background configuration - just change the type and value to update the background
  background: {
    type: "image", // "default", "gradient", "image", "pattern"
    value: "https://kenz.cloudx.biz.id/download/1743169223464.webp", // URL for image, gradient string, or pattern name
    // Add responsive options
    responsive: {
      mobile: true, // Enable mobile-specific optimizations
      fallbackColor: "#121212", // Fallback color while image loads
    },
  },

  // API information
  api: {
    baseUrl: "https://api.kenz.my.id", // Updated base URL
    creator: "KenzXUI",
    versions: ["v1", "v2"], // Available API versions
    defaultVersion: "v2", // Default API version
    rateLimit: {
      limit: 1000, // Requests per minute (default)
      window: "1 minute", // Human-readable window
      windowMs: 60 * 1000, // Window in milliseconds (1 minute)
      resetTimeMs: 5 * 60 * 1000, // Reset time in milliseconds (5 minutes)
      headerPrefix: "X-RateLimit", // Prefix for rate limit headers
      // Explanation of rate limit settings
      explanation: `
        Rate limiting controls how many API requests can be made within a specific time period.
        - limit: Maximum number of requests allowed in the time window (default: 1000)
        - windowMs: Time window in milliseconds (default: 60000ms = 1 minute)
        - resetTimeMs: Time until rate limit counters reset (default: 300000ms = 5 minutes)
        
        These settings help prevent API abuse while allowing legitimate usage.
        You can adjust these values based on your specific needs.
      `,
    },
  },

  // Social links
  links: {
    github: "https://github.com/kenz-publish",
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
      type: "application/pdf",
      description: "PDF document format for reports and documents",
      badge: "PDF",
    },
    {
      type: "application/xml",
      description: "XML data format for structured information",
      badge: "XML",
    },
    {
      type: "application/zip",
      description: "ZIP archive format for compressed files",
      badge: "ZIP",
    },
    {
      type: "audio/mp3",
      description: "MP3 audio format for sound files",
      badge: "MP3",
    },
    {
      type: "audio/wav",
      description: "WAV audio format for high-quality sound files",
      badge: "WAV",
    },
    {
      type: "image/gif",
      description: "GIF image format for animations",
      badge: "GIF",
    },
    {
      type: "image/jpeg",
      description: "JPEG image format for photographs",
      badge: "JPEG",
    },
    {
      type: "image/png",
      description: "PNG image format with transparency support",
      badge: "PNG",
    },
    {
      type: "image/svg+xml",
      description: "SVG vector image format for scalable graphics",
      badge: "SVG",
    },
    {
      type: "image/webp",
      description: "WebP image format for optimized web images",
      badge: "WEBP",
    },
    {
      type: "text/csv",
      description: "CSV format for tabular data",
      badge: "CSV",
    },
    {
      type: "text/html",
      description: "HTML format for web pages",
      badge: "HTML",
    },
    {
      type: "text/plain",
      description: "Plain text format for simple content",
      badge: "TEXT",
    },
    {
      type: "video/mp4",
      description: "MP4 video format for animated content",
      badge: "MP4",
    },
    {
      type: "video/webm",
      description: "WebM video format for web videos",
      badge: "WEBM",
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
          method: "GET",
          path: "/ai/luminai",
          description: "Generate AI responses using LuminAI",
          mediaType: "application/json",
          parameters: [
            { name: "text", type: "string", required: true, description: "The text prompt to send to the AI" },
          ],
          versions: ["v1", "v2"], // Available in both versions
        },
        {
          method: "GET",
          path: "/ai/deepseek-r1",
          description: "Generate AI responses using DeepSeek-R1",
          mediaType: "application/json",
          parameters: [
            { name: "text", type: "string", required: true, description: "The text prompt to send to the AI" },
          ],
          versions: ["v1", "v2"], // Available in both versions
        },
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
          versions: ["v1", "v2"], // Available in both versions
        },
      ],
    },
    {
  name: "Download",
  color: "red",
  endpoints: [
    {
      method: "GET",
      path: "/download/ytmp3",
      description: "Convert YouTube video to MP3",
      mediaType: "audio/mp3",
      parameters: [
        { name: "url", type: "string", required: true, description: "YouTube video URL" },
      ],
      versions: ["v1", "v2"],
    },
  ],
}, 
    {
  name: "Search",
  color: "green",
  endpoints: [
    {
      method: "GET",
      path: "/search/apk",
      description: "Search for APKs in PlayStore",
      mediaType: "application/json",
      parameters: [
        { name: "q", type: "string", required: true, description: "Search query" },
      ],
      versions: ["v1", "v2"],
    },
  ],
}, 
    {
      name: "Maker",
      color: "purple",
      endpoints: [
        {
          method: "GET",
          path: "/maker/brat",
          description: "Generate a brat style image with custom text",
          mediaType: "image/png",
          parameters: [
            { name: "text", type: "string", required: true, description: "The text to display in the brat image" },
          ],
          versions: ["v1", "v2"], // Available in both versions
        },
        {
          method: "GET",
          path: "/maker/bratvid",
          description: "Generate a brat style video with custom text",
          mediaType: "video/mp4",
          parameters: [
            { name: "text", type: "string", required: true, description: "The text to display in the brat video" },
          ],
          versions: ["v1", "v2"], // Available in both versions
        },
      ],
    },
    {
      name: "Media",
      color: "green",
      endpoints: [
        {
          method: "GET",
          path: "/random/ba",
          description: "Get a random Blue Archive image",
          mediaType: "image/png",
          parameters: [],
          versions: ["v1", "v2"], // Available in both versions
        },
      ],
    },
    {
    name: "Server",
    color: "red",
    endpoints: [
      {
        method: "GET",
        path: "/server/info",
        description: "Get server information",
        mediaType: "application/json",
        parameters: [],
        versions: ["v2"],
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
      return "bg-blue-500/10 text-blue-500 border-blue-500/50"
    case "purple":
      return "bg-purple-500/10 text-purple-500 border-purple-500/50"
    case "green":
      return "bg-green-500/10 text-green-500 border-green-500/50"
    case "yellow":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/50"
    case "red":
      return "bg-red-500/10 text-red-500 border-red-500/50"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/50"
  }
}

// Helper function to get method color
export function getMethodColor(method: string) {
  switch (method) {
    case "GET":
      return "bg-green-500/10 text-green-500 border-green-500/50"
    case "POST":
      return "bg-blue-500/10 text-blue-500 border-blue-500/50"
    case "PUT":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/50"
    case "DELETE":
      return "bg-red-500/10 text-red-500 border-red-500/50"
    default:
      return "bg-purple-500/10 text-purple-500 border-purple-500/50"
  }
}

// Helper function to get media type color and badge
export function getMediaTypeInfo(mediaType: string) {
  const mediaTypeConfig = siteConfig.mediaTypes.find((m) => m.type === mediaType)

  if (!mediaTypeConfig) {
    return {
      color: "bg-gray-500/10 text-gray-500 border-gray-500/50",
      badge: "DATA",
    }
  }

  // Use more explicit and consistent color classes that will work in production
  switch (mediaType) {
    // Document formats
    case "application/json":
      return {
        color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/50",
        badge: mediaTypeConfig.badge,
      }
    case "application/xml":
      return {
        color: "bg-orange-500/10 text-orange-500 border-orange-500/50",
        badge: mediaTypeConfig.badge,
      }
    case "application/pdf":
      return {
        color: "bg-red-600/10 text-red-600 border-red-600/50",
        badge: mediaTypeConfig.badge,
      }
    case "text/csv":
      return {
        color: "bg-green-600/10 text-green-600 border-green-600/50",
        badge: mediaTypeConfig.badge,
      }
    case "text/html":
      return {
        color: "bg-orange-500/10 text-orange-500 border-orange-500/50",
        badge: mediaTypeConfig.badge,
      }
    case "text/plain":
      return {
        color: "bg-blue-500/10 text-blue-500 border-blue-500/50",
        badge: mediaTypeConfig.badge,
      }

    // Image formats
    case "image/png":
      return {
        color: "bg-purple-500/10 text-purple-500 border-purple-500/50",
        badge: mediaTypeConfig.badge,
      }
    case "image/jpeg":
      return {
        color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/50",
        badge: mediaTypeConfig.badge,
      }
    case "image/gif":
      return {
        color: "bg-pink-500/10 text-pink-500 border-pink-500/50",
        badge: mediaTypeConfig.badge,
      }
    case "image/svg+xml":
      return {
        color: "bg-teal-500/10 text-teal-500 border-teal-500/50",
        badge: mediaTypeConfig.badge,
      }
    case "image/webp":
      return {
        color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/50",
        badge: mediaTypeConfig.badge,
      }

    // Audio formats
    case "audio/mp3":
      return {
        color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/50",
        badge: mediaTypeConfig.badge,
      }
    case "audio/wav":
      return {
        color: "bg-lime-500/10 text-lime-500 border-lime-500/50",
        badge: mediaTypeConfig.badge,
      }

    // Video formats
    case "video/mp4":
      return {
        color: "bg-red-500/10 text-red-500 border-red-500/50",
        badge: mediaTypeConfig.badge,
      }
    case "video/webm":
      return {
        color: "bg-rose-500/10 text-rose-500 border-rose-500/50",
        badge: mediaTypeConfig.badge,
      }

    // Archive formats
    case "application/zip":
      return {
        color: "bg-amber-500/10 text-amber-500 border-amber-500/50",
        badge: mediaTypeConfig.badge,
      }

    // Binary formats
    case "application/octet-stream":
      return {
        color: "bg-slate-500/10 text-slate-500 border-slate-500/50",
        badge: mediaTypeConfig.badge,
      }

    default:
      return {
        color: "bg-gray-500/10 text-gray-500 border-gray-500/50",
        badge: mediaTypeConfig.badge || "DATA",
      }
  }
}

// Helper function to get status code color
export function getStatusCodeColor(code: number) {
  if (code >= 200 && code < 300) return "status-200 bg-green-500/10 text-green-500 border-green-500/50"
  if (code >= 300 && code < 400) return "bg-blue-500/10 text-blue-500 border-blue-500/50"
  if (code >= 400 && code < 500) return "status-400 bg-yellow-500/10 text-yellow-500 border-yellow-500/50"
  if (code >= 500) return "status-500 bg-red-500/10 text-red-500 border-red-500/50"
  return "bg-gray-500/10 text-gray-500 border-gray-500/50"
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

