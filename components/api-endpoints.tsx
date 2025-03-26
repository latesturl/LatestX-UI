"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Loader2,
  PlayCircle,
  Copy,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  LinkIcon,
  Terminal,
  AlertCircle,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
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

// Helper function to get category style
function getCategoryStyle(category: string): React.CSSProperties {
  const categoryConfig = siteConfig.apiCategories.find((c) => c.name === category)

  switch (categoryConfig?.color) {
    case "blue":
      return {
        borderColor: "rgba(59, 130, 246, 0.3)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        color: "rgb(59, 130, 246)",
      }
    case "purple":
      return {
        borderColor: "rgba(168, 85, 247, 0.3)",
        backgroundColor: "rgba(168, 85, 247, 0.1)",
        color: "rgb(168, 85, 247)",
      }
    case "green":
      return {
        borderColor: "rgba(34, 197, 94, 0.3)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        color: "rgb(34, 197, 94)",
      }
    case "yellow":
      return {
        borderColor: "rgba(234, 179, 8, 0.3)",
        backgroundColor: "rgba(234, 179, 8, 0.1)",
        color: "rgb(234, 179, 8)",
      }
    case "red":
      return {
        borderColor: "rgba(239, 68, 68, 0.3)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        color: "rgb(239, 68, 68)",
      }
    default:
      return {
        borderColor: "rgba(148, 163, 184, 0.3)",
        backgroundColor: "rgba(148, 163, 184, 0.1)",
        color: "rgb(148, 163, 184)",
      }
  }
}

export function ApiEndpoints() {
  const [params, setParams] = useState<Record<string, string>>({})
  const [results, setResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [openEndpoints, setOpenEndpoints] = useState<Record<string, boolean>>({})
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(siteConfig.apiCategories.map((cat) => [cat.name, true])),
  )
  const [executedEndpoints, setExecutedEndpoints] = useState<Record<string, boolean>>({})
  const [directLinks, setDirectLinks] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState<Record<string, string>>({})
  const [apiStatus, setApiStatus] = useState<Record<string, boolean>>({})

  const handleParamChange = (endpointPath: string, paramName: string, value: string) => {
    setParams((prev) => ({
      ...prev,
      [`${endpointPath}:${paramName}`]: value,
    }))
  }

  // Check API status for specific endpoints
  const checkApiStatus = async (endpoint: any) => {
    if (endpoint.path === "/ai/hydromind") {
      try {
        const response = await fetch(`/api${endpoint.path}`)
        const data = await response.json()
        setApiStatus((prev) => ({ ...prev, [endpoint.path]: data.status }))
        return data.status
      } catch (error) {
        setApiStatus((prev) => ({ ...prev, [endpoint.path]: false }))
        return false
      }
    }
    return true // Default to true for other endpoints
  }

  const executeEndpoint = async (endpoint: any) => {
    setLoading((prev) => ({ ...prev, [endpoint.path]: true }))

    try {
      // Check API status first for certain endpoints
      if (endpoint.path === "/ai/hydromind") {
        const isAvailable = await checkApiStatus(endpoint)
        if (!isAvailable) {
          setResults((prev) => ({
            ...prev,
            [endpoint.path]: {
              status: false,
              error: "External API is currently unavailable. Please try again later.",
            },
          }))
          setLoading((prev) => ({ ...prev, [endpoint.path]: false }))
          return
        }
      }

      // Collect parameters for this endpoint
      const endpointParams: Record<string, string> = {}
      endpoint.parameters.forEach((param: any) => {
        endpointParams[param.name] = params[`${endpoint.path}:${param.name}`] || ""
      })

      let response

      if (endpoint.method === "GET") {
        // Execute the GET API call
        const queryParams = new URLSearchParams()
        Object.entries(endpointParams).forEach(([key, value]) => {
          if (value) queryParams.append(key, value)
        })

        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""
        response = await fetch(`/api${endpoint.path}${queryString}`)

        // Generate direct API access link
        const directLink = `/api${endpoint.path}${queryString}`
        setDirectLinks((prev) => ({ ...prev, [endpoint.path]: directLink }))
      } else if (endpoint.method === "POST") {
        // Execute the POST API call with a timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

        try {
          response = await fetch(`/api${endpoint.path}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(endpointParams),
            signal: controller.signal,
          })

          clearTimeout(timeoutId)

          // Generate direct API access link (for documentation purposes only)
          setDirectLinks((prev) => ({ ...prev, [endpoint.path]: `/api${endpoint.path}` }))
        } catch (error) {
          clearTimeout(timeoutId)
          if (error.name === "AbortError") {
            throw new Error("Request timed out. The server took too long to respond.")
          }
          throw error
        }
      }

      if (endpoint.path === "/random/ba") {
        const blob = await response.blob()
        setResults((prev) => ({
          ...prev,
          [endpoint.path]: { imageUrl: URL.createObjectURL(blob) },
        }))
      } else {
        // Try to parse as JSON, but handle text responses gracefully
        try {
          const data = await response.json()
          setResults((prev) => ({ ...prev, [endpoint.path]: data }))
        } catch (error) {
          // If JSON parsing fails, try to get the text
          const text = await response.text()
          setResults((prev) => ({
            ...prev,
            [endpoint.path]: {
              status: false,
              error: `Failed to parse response: ${text.substring(0, 100)}${text.length > 100 ? "..." : ""}`,
            },
          }))
        }
      }

      // Mark this endpoint as executed
      setExecutedEndpoints((prev) => ({
        ...prev,
        [endpoint.path]: true,
      }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [endpoint.path]: {
          status: false,
          error: error instanceof Error ? error.message : "An error occurred",
        },
      }))
    } finally {
      setLoading((prev) => ({ ...prev, [endpoint.path]: false }))
    }
  }

  const toggleEndpoint = (path: string) => {
    setOpenEndpoints((prev) => ({
      ...prev,
      [path]: !prev[path],
    }))

    // Check API status when opening hydromind endpoint
    if (path === "/ai/hydromind" && !openEndpoints[path]) {
      checkApiStatus({ path })
    }
  }

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getEndpointExample = (endpoint: any) => {
    if (endpoint.method === "GET") {
      return `fetch('${siteConfig.api.baseUrl}/api${endpoint.path}${
        endpoint.parameters.length > 0
          ? `?${endpoint.parameters.map((p) => `${p.name}=${p.name === "text" ? "Hello" : p.name === "model" ? "@groq/qwen-2.5-32b" : "value"}`).join("&")}`
          : ""
      }')
${
  endpoint.path === "/random/ba"
    ? `.then(response => response.blob())
.then(blob => {
  const url = URL.createObjectURL(blob)
  // Use the image URL
})`
    : `.then(response => response.json())
.then(data => console.log(data))`
}`
    } else if (endpoint.method === "POST") {
      return `fetch('${siteConfig.api.baseUrl}/api${endpoint.path}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ${endpoint.parameters.map((p) => `${p.name}: ${p.name === "text" ? '"Hello"' : p.name === "model" ? '"@groq/qwen-2.5-32b"' : p.name === "responses" ? "1" : '"value"'}`).join(",\n    ")}
  }),
})
.then(response => response.json())
.then(data => console.log(data))`
    }
  }

  // Update the getCurlExample function to use a proper curl command format
  const getCurlExample = (endpoint: any) => {
    if (endpoint.method === "GET") {
      return `curl -X GET "${siteConfig.api.baseUrl}/api${endpoint.path}${
        endpoint.parameters.length > 0
          ? `?${endpoint.parameters.map((p) => `${p.name}=${p.name === "text" ? "Hello" : p.name === "model" ? "@groq/qwen-2.5-32b" : "value"}`).join("&")}`
          : ""
      }"`
    } else if (endpoint.method === "POST") {
      return `curl -X POST "${siteConfig.api.baseUrl}/api${endpoint.path}" -H "Content-Type: application/json" -d '{"${endpoint.parameters.map((p) => `${p.name}":"${p.name === "text" ? "Hello" : p.name === "model" ? "@groq/qwen-2.5-32b" : p.name === "responses" ? "1" : "value"}`).join('","')}"}'`
    }
  }

  // Generate a link to the documentation for this endpoint
  const getEndpointDocsLink = (endpoint: any) => {
    return `/docs#${endpoint.path.replace(/\//g, "-").slice(1)}`
  }

  const setTab = (path: string, tab: string) => {
    setActiveTab((prev) => ({
      ...prev,
      [path]: tab,
    }))
  }

  return (
    <section id="api-endpoints" className="container py-16 md:py-20 morph-animation">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-2xl md:text-3xl font-bold">API Endpoints</h2>
        <p className="mb-8 text-center text-sm md:text-base text-muted-foreground">
          Explore and test our API endpoints directly from your browser
        </p>

        <div className="grid gap-4">
          {siteConfig.apiCategories.map((category) => (
            <Collapsible
              key={category.name}
              open={openCategories[category.name]}
              onOpenChange={() => toggleCategory(category.name)}
              className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-200 morph-item"
            >
              <div className="flex items-center p-3 cursor-pointer" onClick={() => toggleCategory(category.name)}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    {openCategories[category.name] ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                <div className="flex items-center gap-2 ml-2">
                  <Badge variant="outline" className="font-medium text-xs" style={getCategoryStyle(category.name)}>
                    {category.name}
                  </Badge>
                  <span className="text-sm font-medium">{category.name} APIs</span>
                </div>
              </div>

              <CollapsibleContent>
                <div className="border-t p-2">
                  <div className="grid gap-3">
                    {category.endpoints.map((endpoint, index) => (
                      <Collapsible
                        key={index}
                        open={openEndpoints[endpoint.path]}
                        onOpenChange={() => toggleEndpoint(endpoint.path)}
                        className="rounded-lg border bg-card/50 text-card-foreground shadow-sm overflow-hidden transition-all duration-200 morph-item-inner"
                      >
                        <div
                          className="flex items-center p-2 cursor-pointer"
                          onClick={() => toggleEndpoint(endpoint.path)}
                        >
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-auto">
                              {openEndpoints[endpoint.path] ? (
                                <ChevronDown className="h-3 w-3 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                              )}
                            </Button>
                          </CollapsibleTrigger>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-grow ml-2 overflow-hidden">
                            <div className="flex items-center gap-2 min-w-0">
                              <Badge variant={endpoint.method.toLowerCase() as any}>{endpoint.method}</Badge>
                              <span className="font-mono text-xs sm:text-sm font-medium truncate">{endpoint.path}</span>

                              {/* Media Type Badge */}
                              {endpoint.mediaType && (
                                <Badge variant={getMediaTypeBadgeVariant(endpoint.mediaType)}>
                                  {siteConfig.mediaTypes.find((m) => m.type === endpoint.mediaType)?.badge || "DATA"}
                                </Badge>
                              )}

                              {executedEndpoints[endpoint.path] && (
                                <Badge
                                  variant="outline"
                                  style={{
                                    borderColor: "rgba(34, 197, 94, 0.3)",
                                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                                    color: "rgb(34, 197, 94)",
                                  }}
                                  className="text-xs"
                                >
                                  Executed
                                </Badge>
                              )}

                              {/* Removed the "Available" badge as requested */}
                            </div>
                            <p className="text-xs text-muted-foreground sm:ml-auto truncate">{endpoint.description}</p>
                          </div>
                        </div>

                        <CollapsibleContent>
                          <div className="border-t p-3">
                            <div className="grid gap-3">
                              {/* API Status Warning for HydroMind */}
                              {endpoint.path === "/ai/hydromind" && apiStatus[endpoint.path] === false && (
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 text-red-500">
                                  <AlertCircle className="h-4 w-4" />
                                  <span className="text-xs">
                                    The external API is currently unavailable. Requests may fail or time out.
                                  </span>
                                </div>
                              )}

                              {/* Media Type Information */}
                              <div className="space-y-1">
                                <h3 className="text-xs font-medium">Media Type</h3>
                                <div className="flex items-center gap-2">
                                  <Badge variant={getMediaTypeBadgeVariant(endpoint.mediaType)}>
                                    {siteConfig.mediaTypes.find((m) => m.type === endpoint.mediaType)?.badge || "DATA"}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{endpoint.mediaType}</span>
                                </div>
                              </div>

                              {endpoint.parameters.length > 0 && (
                                <div className="space-y-3">
                                  <h3 className="text-xs font-medium">Parameters</h3>
                                  <div className="grid gap-2 sm:grid-cols-2">
                                    {endpoint.parameters.map((param: any, paramIndex: number) => (
                                      <div key={paramIndex} className="flex flex-col">
                                        <label className="text-xs mb-1">
                                          {param.name} {param.required && <span className="text-red-500">*</span>}
                                        </label>
                                        <Input
                                          placeholder={param.description}
                                          value={params[`${endpoint.path}:${param.name}`] || ""}
                                          onChange={(e) => handleParamChange(endpoint.path, param.name, e.target.value)}
                                          className="h-8 text-xs"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-2">
                                <Button
                                  onClick={() => executeEndpoint(endpoint)}
                                  disabled={
                                    loading[endpoint.path] ||
                                    endpoint.parameters.some(
                                      (p: any) => p.required && !params[`${endpoint.path}:${p.name}`],
                                    ) ||
                                    (endpoint.path === "/ai/hydromind" && apiStatus[endpoint.path] === false)
                                  }
                                  className="h-8 text-xs px-3 py-1 morph-button"
                                  size="sm"
                                >
                                  {loading[endpoint.path] ? (
                                    <>
                                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                      Executing...
                                    </>
                                  ) : (
                                    <>
                                      <PlayCircle className="mr-1 h-3 w-3" />
                                      Execute
                                    </>
                                  )}
                                </Button>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 text-xs px-3 py-1 morph-button"
                                  onClick={() =>
                                    copyToClipboard(
                                      activeTab[endpoint.path] === "curl"
                                        ? getCurlExample(endpoint)
                                        : getEndpointExample(endpoint),
                                    )
                                  }
                                >
                                  <Copy className="mr-1 h-3 w-3" />
                                  Copy Example
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 text-xs px-3 py-1 morph-button"
                                  asChild
                                >
                                  <a href={getEndpointDocsLink(endpoint)} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-1 h-3 w-3" />
                                    View Docs
                                  </a>
                                </Button>
                              </div>

                              <div className="space-y-2">
                                <div className="flex border-b">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`h-8 text-xs px-3 py-1 rounded-none ${activeTab[endpoint.path] !== "curl" ? "border-b-2 border-primary" : ""}`}
                                    onClick={() => setTab(endpoint.path, "fetch")}
                                  >
                                    Fetch
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`h-8 text-xs px-3 py-1 rounded-none ${activeTab[endpoint.path] === "curl" ? "border-b-2 border-primary" : ""}`}
                                    onClick={() => setTab(endpoint.path, "curl")}
                                  >
                                    <Terminal className="mr-1 h-3 w-3" />
                                    cURL
                                  </Button>
                                </div>
                                <pre className="overflow-x-auto rounded-lg bg-muted p-2 text-xs">
                                  <code>
                                    {activeTab[endpoint.path] === "curl"
                                      ? getCurlExample(endpoint)
                                      : getEndpointExample(endpoint)}
                                  </code>
                                </pre>
                              </div>

                              {directLinks[endpoint.path] && (
                                <div className="space-y-2">
                                  <h3 className="text-xs font-medium">Direct API Access</h3>
                                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                                    <LinkIcon className="h-3 w-3 text-muted-foreground" />
                                    <code className="text-xs flex-1 overflow-x-auto">{directLinks[endpoint.path]}</code>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild>
                                      <a href={directLinks[endpoint.path]} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-3 w-3" />
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {results[endpoint.path] && (
                                <div className="space-y-2">
                                  <h3 className="text-xs font-medium">Result</h3>
                                  <div className="rounded-lg bg-muted p-2 max-h-60 overflow-auto">
                                    {endpoint.path === "/random/ba" && results[endpoint.path].imageUrl ? (
                                      <div className="flex justify-center">
                                        <img
                                          src={results[endpoint.path].imageUrl || "/placeholder.svg"}
                                          alt="Random Blue Archive"
                                          className="max-h-56 rounded-md"
                                        />
                                      </div>
                                    ) : (
                                      <pre className="overflow-x-auto whitespace-pre-wrap text-xs">
                                        <code>{JSON.stringify(results[endpoint.path], null, 2)}</code>
                                      </pre>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center text-xs text-muted-foreground">{siteConfig.copyright}</div>
    </section>
  )
}

