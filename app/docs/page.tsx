import type React from "react"
import { NavBar } from "@/components/nav-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { siteConfig } from "@/lib/config"

// Helper function to get badge variant based on media type
function getMediaTypeBadgeVariant(mediaType: string) {
  switch (mediaType) {
    case "application/json":
      return "json"
    case "image/png":
      return "png"
    case "image/jpeg":
      return "jpeg"
    case "text/plain":
      return "text"
    case "application/octet-stream":
      return "bin"
    default:
      return "outline"
  }
}

// Helper function to get status code style
function getStatusCodeStyle(code: number): React.CSSProperties {
  if (code >= 200 && code < 300) {
    return {
      borderColor: "rgba(34, 197, 94, 0.3)",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      color: "rgb(34, 197, 94)",
    }
  }
  if (code >= 300 && code < 400) {
    return {
      borderColor: "rgba(59, 130, 246, 0.3)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      color: "rgb(59, 130, 246)",
    }
  }
  if (code >= 400 && code < 500) {
    return {
      borderColor: "rgba(234, 179, 8, 0.3)",
      backgroundColor: "rgba(234, 179, 8, 0.1)",
      color: "rgb(234, 179, 8)",
    }
  }
  if (code >= 500) {
    return {
      borderColor: "rgba(239, 68, 68, 0.3)",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      color: "rgb(239, 68, 68)",
    }
  }
  return {
    borderColor: "rgba(148, 163, 184, 0.3)",
    backgroundColor: "rgba(148, 163, 184, 0.1)",
    color: "rgb(148, 163, 184)",
  }
}

export default function DocsPage() {
  return (
    <>
      <NavBar />
      <main className="container py-16 md:py-24 mt-14 md:mt-16 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">API Documentation</h1>
            <p className="text-sm md:text-lg text-muted-foreground">
              Comprehensive guide to using the {siteConfig.name} endpoints
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Getting Started</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Learn how to use our API endpoints in your applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-4 md:p-6">
              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Base URL</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">
                  All API endpoints are relative to the base URL:
                </p>
                <pre className="bg-muted p-2 md:p-3 rounded-md text-xs md:text-sm overflow-x-auto">
                  <code>{siteConfig.api.baseUrl}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Authentication</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Currently, our APIs are available without authentication. However, we recommend using appropriate rate
                  limiting in your applications to prevent abuse.
                </p>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Response Format</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">
                  All API responses are returned in JSON format with a consistent structure:
                </p>
                <pre className="bg-muted p-2 md:p-3 rounded-md text-xs md:text-sm overflow-x-auto">
                  <code>{`{
  "status": true,     // boolean indicating success or failure
  "creator": "${siteConfig.api.creator}", // creator information
  "result": {}        // the actual response data
}`}</code>
                </pre>
                <p className="text-xs md:text-sm text-muted-foreground mt-2">
                  In case of errors, the response will include an error message:
                </p>
                <pre className="bg-muted p-2 md:p-3 rounded-md text-xs md:text-sm overflow-x-auto">
                  <code>{`{
  "status": false,
  "creator": "${siteConfig.api.creator}",
  "error": "Error message"
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Media Types</CardTitle>
              <CardDescription className="text-xs md:text-sm">Content types returned by our APIs</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="grid gap-4">
                {siteConfig.mediaTypes.map((mediaType) => {
                  const badgeVariant = getMediaTypeBadgeVariant(mediaType.type)
                  return (
                    <div key={mediaType.type} className="flex items-start gap-3 p-3 rounded-lg border bg-card/50">
                      <Badge variant={badgeVariant}>{mediaType.badge}</Badge>
                      <div>
                        <h4 className="text-sm font-medium">{mediaType.type}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{mediaType.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Status Codes</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Common HTTP status codes returned by our APIs
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="grid gap-4">
                {siteConfig.statusCodes.map((status) => (
                  <div key={status.code} className="flex items-start gap-3 p-3 rounded-lg border bg-card/50">
                    <Badge variant="outline" className="font-mono text-xs" style={getStatusCodeStyle(status.code)}>
                      {status.code}
                    </Badge>
                    <div>
                      <h4 className="text-sm font-medium">{status.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{status.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Available APIs</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Detailed documentation for all available API endpoints
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-4 md:p-6">
              {siteConfig.apiCategories.map((category) => (
                <div key={category.name} className="space-y-6">
                  <h3 className="text-base md:text-lg font-medium">{category.name} APIs</h3>

                  {category.endpoints.map((endpoint, index) => {
                    const mediaTypeBadge = getMediaTypeBadgeVariant(endpoint.mediaType)
                    return (
                      <div
                        key={index}
                        id={endpoint.path.replace(/\//g, "-").slice(1)}
                        className="space-y-4 p-4 rounded-lg border bg-card/50"
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={endpoint.method.toLowerCase() as any}>{endpoint.method}</Badge>
                          <span className="font-mono text-xs md:text-sm font-medium">{endpoint.path}</span>

                          {/* Media Type Badge */}
                          {endpoint.mediaType && (
                            <Badge variant={mediaTypeBadge}>
                              {siteConfig.mediaTypes.find((m) => m.type === endpoint.mediaType)?.badge || "DATA"}
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs md:text-sm text-muted-foreground">{endpoint.description}</p>

                        {/* Media Type Information */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-medium">Media Type</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant={mediaTypeBadge}>
                              {siteConfig.mediaTypes.find((m) => m.type === endpoint.mediaType)?.badge || "DATA"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{endpoint.mediaType}</span>
                          </div>
                        </div>

                        {endpoint.parameters.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-medium">Parameters</h4>
                            <div className="grid gap-2">
                              {endpoint.parameters.map((param, paramIndex) => (
                                <div key={paramIndex} className="flex items-start gap-2 text-xs">
                                  <div className="font-mono min-w-[80px]">{param.name}</div>
                                  <div className="min-w-[60px] text-muted-foreground">{param.type}</div>
                                  <div className="text-muted-foreground">
                                    {param.description}
                                    {param.required && <span className="text-red-500 ml-1">(Required)</span>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <h4 className="text-xs font-medium">Example Request (Fetch)</h4>
                          <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                            <code>
                              {endpoint.method === "GET"
                                ? `fetch('${siteConfig.api.baseUrl}/api${endpoint.path}${
                                    endpoint.parameters.length > 0
                                      ? `?${endpoint.parameters.map((p) => `${p.name}=${p.name === "text" ? "Hello" : p.name === "model" ? "@groq/qwen-2.5-32b" : "value"}`).join("&")}`
                                      : ""
                                  }')`
                                : `fetch('${siteConfig.api.baseUrl}/api${endpoint.path}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ${endpoint.parameters.map((p) => `${p.name}: ${p.name === "text" ? '"Hello"' : p.name === "model" ? '"@groq/qwen-2.5-32b"' : p.name === "responses" ? "1" : '"value"'}`).join(",\n    ")}
  }),
})`}
                            </code>
                          </pre>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs font-medium">Example Request (cURL)</h4>
                          <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                            <code>
                              {endpoint.method === "GET"
                                ? `curl -X GET "${siteConfig.api.baseUrl}/api${endpoint.path}${
                                    endpoint.parameters.length > 0
                                      ? `?${endpoint.parameters.map((p) => `${p.name}=${p.name === "text" ? "Hello" : p.name === "model" ? "@groq/qwen-2.5-32b" : "value"}`).join("&")}`
                                      : ""
                                  }"`
                                : `curl -X POST "${siteConfig.api.baseUrl}/api${endpoint.path}" -H "Content-Type: application/json" -d '{"${endpoint.parameters.map((p) => `${p.name}":"${p.name === "text" ? "Hello" : p.name === "model" ? "@groq/qwen-2.5-32b" : p.name === "responses" ? "1" : "value"}`).join('","')}"}'`}
                            </code>
                          </pre>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs font-medium">Example Response</h4>
                          <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                            <code>
                              {endpoint.mediaType === "image/png" || endpoint.mediaType === "image/jpeg"
                                ? `// Binary image data returned with Content-Type: ${endpoint.mediaType}`
                                : `{
  "status": true,
  "creator": "${siteConfig.api.creator}",
  "result": ${
    endpoint.path === "/ai/luminai" || endpoint.path === "/ai/hydromind"
      ? `{
    "text": "This is an AI-generated response to your prompt."
  }`
      : `{
    // Response data specific to this endpoint
  }`
  }
}`}
                            </code>
                          </pre>
                        </div>

                        <div>
                          <Button variant="outline" size="sm" className="h-8 text-xs" asChild>
                            <Link href={`/#api-endpoints`}>Try it out</Link>
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="mt-12 text-center text-xs text-muted-foreground">{siteConfig.copyright}</div>
        </div>
      </main>
    </>
  )
}

