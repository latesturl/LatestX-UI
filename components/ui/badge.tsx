import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Update the badgeVariants function to ensure consistent styling
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Document formats
        json: "border-yellow-500/50 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
        xml: "border-orange-500/50 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
        pdf: "border-red-600/50 bg-red-600/10 text-red-600 hover:bg-red-600/20",
        csv: "border-green-600/50 bg-green-600/10 text-green-600 hover:bg-green-600/20",
        html: "border-orange-500/50 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
        text: "border-blue-500/50 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
        // Image formats
        png: "border-purple-500/50 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
        jpeg: "border-indigo-500/50 bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20",
        gif: "border-pink-500/50 bg-pink-500/10 text-pink-500 hover:bg-pink-500/20",
        svg: "border-teal-500/50 bg-teal-500/10 text-teal-500 hover:bg-teal-500/20",
        webp: "border-cyan-500/50 bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20",
        // Audio formats
        mp3: "border-emerald-500/50 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
        wav: "border-lime-500/50 bg-lime-500/10 text-lime-500 hover:bg-lime-500/20",
        // Video formats
        mp4: "border-red-500/50 bg-red-500/10 text-red-500 hover:bg-red-500/20",
        webm: "border-rose-500/50 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20",
        // Archive formats
        zip: "border-amber-500/50 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
        // Binary formats
        bin: "border-slate-500/50 bg-slate-500/10 text-slate-500 hover:bg-slate-500/20",
        // HTTP methods
        get: "border-green-500/50 bg-green-500/10 text-green-500 hover:bg-green-500/20",
        post: "border-blue-500/50 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
        put: "border-yellow-500/50 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
        delete: "border-red-500/50 bg-red-500/10 text-red-500 hover:bg-red-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  style?: React.CSSProperties
}

// Update the Badge component to use more consistent styling
function Badge({ className, variant, style, ...props }: BadgeProps) {
  // Define default styles based on variant
  let defaultStyle: React.CSSProperties = {}

  // Document formats
  if (variant === "json") {
    defaultStyle = {
      borderColor: "rgba(234, 179, 8, 0.5)",
      backgroundColor: "rgba(234, 179, 8, 0.1)",
      color: "rgb(234, 179, 8)",
    }
  } else if (variant === "xml") {
    defaultStyle = {
      borderColor: "rgba(249, 115, 22, 0.5)",
      backgroundColor: "rgba(249, 115, 22, 0.1)",
      color: "rgb(249, 115, 22)",
    }
  } else if (variant === "pdf") {
    defaultStyle = {
      borderColor: "rgba(220, 38, 38, 0.5)",
      backgroundColor: "rgba(220, 38, 38, 0.1)",
      color: "rgb(220, 38, 38)",
    }
  } else if (variant === "csv") {
    defaultStyle = {
      borderColor: "rgba(22, 163, 74, 0.5)",
      backgroundColor: "rgba(22, 163, 74, 0.1)",
      color: "rgb(22, 163, 74)",
    }
  } else if (variant === "html") {
    defaultStyle = {
      borderColor: "rgba(249, 115, 22, 0.5)",
      backgroundColor: "rgba(249, 115, 22, 0.1)",
      color: "rgb(249, 115, 22)",
    }
  } else if (variant === "text") {
    defaultStyle = {
      borderColor: "rgba(59, 130, 246, 0.5)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      color: "rgb(59, 130, 246)",
    }
  }
  // Image formats
  else if (variant === "png") {
    defaultStyle = {
      borderColor: "rgba(168, 85, 247, 0.5)",
      backgroundColor: "rgba(168, 85, 247, 0.1)",
      color: "rgb(168, 85, 247)",
    }
  } else if (variant === "jpeg") {
    defaultStyle = {
      borderColor: "rgba(99, 102, 241, 0.5)",
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      color: "rgb(99, 102, 241)",
    }
  } else if (variant === "gif") {
    defaultStyle = {
      borderColor: "rgba(236, 72, 153, 0.5)",
      backgroundColor: "rgba(236, 72, 153, 0.1)",
      color: "rgb(236, 72, 153)",
    }
  } else if (variant === "svg") {
    defaultStyle = {
      borderColor: "rgba(20, 184, 166, 0.5)",
      backgroundColor: "rgba(20, 184, 166, 0.1)",
      color: "rgb(20, 184, 166)",
    }
  } else if (variant === "webp") {
    defaultStyle = {
      borderColor: "rgba(6, 182, 212, 0.5)",
      backgroundColor: "rgba(6, 182, 212, 0.1)",
      color: "rgb(6, 182, 212)",
    }
  }
  // Audio formats
  else if (variant === "mp3") {
    defaultStyle = {
      borderColor: "rgba(16, 185, 129, 0.5)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      color: "rgb(16, 185, 129)",
    }
  } else if (variant === "wav") {
    defaultStyle = {
      borderColor: "rgba(132, 204, 22, 0.5)",
      backgroundColor: "rgba(132, 204, 22, 0.1)",
      color: "rgb(132, 204, 22)",
    }
  }
  // Video formats
  else if (variant === "mp4") {
    defaultStyle = {
      borderColor: "rgba(239, 68, 68, 0.5)",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      color: "rgb(239, 68, 68)",
    }
  } else if (variant === "webm") {
    defaultStyle = {
      borderColor: "rgba(244, 63, 94, 0.5)",
      backgroundColor: "rgba(244, 63, 94, 0.1)",
      color: "rgb(244, 63, 94)",
    }
  }
  // Archive formats
  else if (variant === "zip") {
    defaultStyle = {
      borderColor: "rgba(245, 158, 11, 0.5)",
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      color: "rgb(245, 158, 11)",
    }
  }
  // Binary formats
  else if (variant === "bin") {
    defaultStyle = {
      borderColor: "rgba(148, 163, 184, 0.5)",
      backgroundColor: "rgba(148, 163, 184, 0.1)",
      color: "rgb(148, 163, 184)",
    }
  }
  // HTTP methods
  else if (variant === "get") {
    defaultStyle = {
      borderColor: "rgba(34, 197, 94, 0.5)",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      color: "rgb(34, 197, 94)",
    }
  } else if (variant === "post") {
    defaultStyle = {
      borderColor: "rgba(59, 130, 246, 0.5)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      color: "rgb(59, 130, 246)",
    }
  } else if (variant === "put") {
    defaultStyle = {
      borderColor: "rgba(234, 179, 8, 0.5)",
      backgroundColor: "rgba(234, 179, 8, 0.1)",
      color: "rgb(234, 179, 8)",
    }
  } else if (variant === "delete") {
    defaultStyle = {
      borderColor: "rgba(239, 68, 68, 0.5)",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      color: "rgb(239, 68, 68)",
    }
  }

  return <div className={cn(badgeVariants({ variant }), className)} style={{ ...defaultStyle, ...style }} {...props} />
}

export { Badge, badgeVariants }

