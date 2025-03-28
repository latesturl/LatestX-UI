import { NavBar } from "@/components/nav-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, GitMerge, GitPullRequest } from "lucide-react"
import { siteConfig } from "@/lib/config"

export default function GuidePage() {
  return (
    <>
      <NavBar />
      <main className="container py-16 md:py-24 mt-14 md:mt-16 px-4" data-page="guide">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Link href="/docs">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Documentation
              </Button>
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Developer Guide</h1>
            <p className="text-sm md:text-lg text-muted-foreground">
              Learn how to add new API categories and implement APIs in {siteConfig.name}
            </p>
          </div>

          {/* Table of Contents */}
          <Card className="mb-8">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Table of Contents</CardTitle>
              <CardDescription className="text-xs md:text-sm">Quick navigation to guide sections</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#adding-api-categories" className="text-blue-500 hover:underline">
                    Adding API Categories
                  </a>
                </li>
                <li>
                  <a href="#implementing-apis" className="text-blue-500 hover:underline">
                    Implementing APIs
                  </a>
                </li>
                <li>
                  <a href="#testing-apis" className="text-blue-500 hover:underline">
                    Testing APIs
                  </a>
                </li>
                <li>
                  <a href="#deployment" className="text-blue-500 hover:underline">
                    Deployment
                  </a>
                </li>
                <li>
                  <a href="#best-practices" className="text-blue-500 hover:underline">
                    Best Practices
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Adding API Categories */}
          <Card className="mb-8" id="adding-api-categories">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Adding API Categories</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                How to add new API categories to the configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-4 md:p-6">
              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Step 1: Update the Config File</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  Open <code className="bg-muted px-1 py-0.5 rounded">lib/config.ts</code> and locate the{" "}
                  <code className="bg-muted px-1 py-0.5 rounded">apiCategories</code> array in the{" "}
                  <code className="bg-muted px-1 py-0.5 rounded">siteConfig</code> object.
                </p>

                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="text-xs md:text-sm font-medium mb-2">Example: Adding a new category</p>
                  <pre className="text-xs overflow-x-auto">
                    <code>{`// lib/config.ts
export const siteConfig = {
  // ... other config
  apiCategories: [
    // ... existing categories
    {
      name: "Analytics", // New category name
      color: "green",    // Choose from: blue, purple, green, yellow, red
      endpoints: [
        // Define endpoints for this category (see next step)
      ],
    },
  ],
}`}</code>
                  </pre>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground">
                  The <code className="bg-muted px-1 py-0.5 rounded">color</code> property determines the styling of the
                  category badge. Available options are: blue, purple, green, yellow, and red.
                </p>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Step 2: Define Endpoints</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  For each category, define the endpoints that belong to it in the{" "}
                  <code className="bg-muted px-1 py-0.5 rounded">endpoints</code> array.
                </p>

                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="text-xs md:text-sm font-medium mb-2">Example: Adding endpoints to a category</p>
                  <pre className="text-xs overflow-x-auto">
                    <code>{`endpoints: [
  {
    method: "GET",
    path: "/analytics/stats",
    description: "Get usage statistics",
    mediaType: "application/json",
    parameters: [
      { 
        name: "period", 
        type: "string", 
        required: false, 
        description: "Time period (daily, weekly, monthly)" 
      },
    ],
    versions: ["v1", "v2"], // Available in both versions
  },
  // Add more endpoints as needed
],`}</code>
                  </pre>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground">
                  Each endpoint requires the following properties:
                </p>
                <ul className="list-disc list-inside text-xs md:text-sm text-muted-foreground space-y-1 mt-2">
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">method</code>: HTTP method (GET, POST, PUT, DELETE)
                  </li>
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">path</code>: The endpoint path (without /api/v1 or
                    /api/v2 prefix)
                  </li>
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">description</code>: A brief description of what the
                    endpoint does
                  </li>
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">mediaType</code>: The content type returned (e.g.,
                    application/json, image/png)
                  </li>
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">parameters</code>: Array of parameters the endpoint
                    accepts
                  </li>
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">versions</code>: Array of API versions this endpoint
                    is available in
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Step 3: Add Media Types (if needed)</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  If your new API returns a media type that isn't already defined, add it to the{" "}
                  <code className="bg-muted px-1 py-0.5 rounded">mediaTypes</code> array in the config.
                </p>

                <div className="bg-muted p-4 rounded-md">
                  <p className="text-xs md:text-sm font-medium mb-2">Example: Adding a new media type</p>
                  <pre className="text-xs overflow-x-auto">
                    <code>{`mediaTypes: [
  // ... existing media types
  {
    type: "application/xml",
    description: "XML data format for structured information",
    badge: "XML",
  },
],`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementing APIs */}
          <Card className="mb-8" id="implementing-apis">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Implementing APIs</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                How to create the actual API implementation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-4 md:p-6">
              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Step 1: Create API Route Files</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  Create route files for each API version in the appropriate directory structure.
                </p>

                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="text-xs md:text-sm font-medium mb-2">File structure example:</p>
                  <pre className="text-xs overflow-x-auto">
                    <code>{`app/
├── api/
│   ├── v1/
│   │   └── analytics/
│   │       └── stats/
│   │           └── route.ts
│   └── v2/
│       └── analytics/
│           └── stats/
│               └── route.ts`}</code>
                  </pre>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground">
                  The file structure should match the endpoint path defined in the config. For example, if your endpoint
                  is <code className="bg-muted px-1 py-0.5 rounded">/analytics/stats</code>, create files at{" "}
                  <code className="bg-muted px-1 py-0.5 rounded">app/api/v1/analytics/stats/route.ts</code> and{" "}
                  <code className="bg-muted px-1 py-0.5 rounded">app/api/v2/analytics/stats/route.ts</code>.
                </p>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Step 2: Implement API Logic</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  Implement the API logic in the route files. Here's a template for a GET endpoint:
                </p>

                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="text-xs md:text-sm font-medium mb-2">Example: GET endpoint implementation</p>
                  <pre className="text-xs overflow-x-auto">
                    <code>{`import { NextResponse } from "next/server"
import { siteConfig } from "@/lib/config"
import { memoryCache } from "@/lib/cache"

// Cache TTL in seconds
const CACHE_TTL = 3600 // 1 hour

export async function GET(request: Request) {
  // Check if maintenance mode is enabled
  if (siteConfig.maintenance.enabled) {
    return new NextResponse(
      JSON.stringify(
        {
          status: siteConfig.maintenance.apiResponse.status,
          creator: siteConfig.api.creator,
          message: siteConfig.maintenance.apiResponse.message,
        },
        null,
        2
      ),
      {
        status: 503, // Service Unavailable
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      }
    )
  }

  // Get query parameters
  const { searchParams } = new URL(request.url)
  const period = searchParams.get("period") || "daily"

  try {
    // Create a cache key
    const cacheKey = \`analytics-stats-\${period}\`

    // Try to get from cache first
    const cachedResponse = memoryCache.get(cacheKey)
    if (cachedResponse) {
      return new NextResponse(
        JSON.stringify(
          {
            status: true,
            creator: siteConfig.api.creator,
            result: cachedResponse,
            cached: true,
            version: "v1", // or "v2" depending on the file location
          },
          null,
          2
        ),
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=1800, s-maxage=3600",
          },
        }
      )
    }

    // Implement your API logic here
    const result = {
      period,
      totalRequests: 12345,
      uniqueUsers: 678,
      // Add more data as needed
    }

    // Cache the result
    memoryCache.set(cacheKey, result, CACHE_TTL)

    // Return the response
    return new NextResponse(
      JSON.stringify(
        {
          status: true,
          creator: siteConfig.api.creator,
          result,
          version: "v1", // or "v2" depending on the file location
        },
        null,
        2
      ),
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "public, max-age=1800, s-maxage=3600",
        },
      }
    )
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        {
          status: false,
          creator: siteConfig.api.creator,
          error: error instanceof Error ? error.message : "An error occurred",
          version: "v1", // or "v2" depending on the file location
        },
        null,
        2
      ),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      }
    )
  }
}`}</code>
                  </pre>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground mb-4">For POST endpoints, use this template:</p>

                <div className="bg-muted p-4 rounded-md">
                  <p className="text-xs md:text-sm font-medium mb-2">Example: POST endpoint implementation</p>
                  <pre className="text-xs overflow-x-auto">
                    <code>{`import { NextResponse } from "next/server"
import { siteConfig } from "@/lib/config"

export async function POST(request: Request) {
  // Check if maintenance mode is enabled
  if (siteConfig.maintenance.enabled) {
    return new NextResponse(
      JSON.stringify(
        {
          status: siteConfig.maintenance.apiResponse.status,
          creator: siteConfig.api.creator,
          message: siteConfig.maintenance.apiResponse.message,
        },
        null,
        2
      ),
      {
        status: 503, // Service Unavailable
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      }
    )
  }

  try {
    // Parse request body
    let body
    try {
      body = await request.json()
    } catch (error) {
      return new NextResponse(
        JSON.stringify(
          {
            status: false,
            creator: siteConfig.api.creator,
            error: "Invalid JSON in request body",
          },
          null,
          2
        ),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
          },
        }
      )
    }

    // Validate required parameters
    const { param1, param2 } = body
    if (!param1 || !param2) {
      return new NextResponse(
        JSON.stringify(
          {
            status: false,
            creator: siteConfig.api.creator,
            error: "Missing required parameters",
          },
          null,
          2
        ),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
          },
        }
      )
    }

    // Implement your API logic here
    const result = {
      // Process the request and generate a response
    }

    // Return the response
    return new NextResponse(
      JSON.stringify(
        {
          status: true,
          creator: siteConfig.api.creator,
          result,
          version: "v1", // or "v2" depending on the file location
        },
        null,
        2
      ),
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store", // Don't cache POST responses
        },
      }
    )
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        {
          status: false,
          creator: siteConfig.api.creator,
          error: error instanceof Error ? error.message : "An error occurred",
          version: "v1", // or "v2" depending on the file location
        },
        null,
        2
      ),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      }
    )
  }
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Step 3: Implement Caching (Recommended)</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  For better performance, implement caching for your API responses using the{" "}
                  <code className="bg-muted px-1 py-0.5 rounded">memoryCache</code> utility.
                </p>

                <div className="bg-muted p-4 rounded-md">
                  <p className="text-xs md:text-sm font-medium mb-2">Caching best practices:</p>
                  <ul className="list-disc list-inside text-xs md:text-sm text-muted-foreground space-y-1">
                    <li>Cache GET requests that don't change frequently</li>
                    <li>Use appropriate TTL (Time To Live) values based on how often the data changes</li>
                    <li>Include cache status in the response (cached: true/false)</li>
                    <li>Don't cache sensitive or user-specific data</li>
                    <li>
                      Set appropriate Cache-Control headers:
                      <ul className="list-disc list-inside ml-4">
                        <li>
                          <code className="bg-muted px-1 py-0.5 rounded">public, max-age=1800, s-maxage=3600</code> for
                          cacheable responses
                        </li>
                        <li>
                          <code className="bg-muted px-1 py-0.5 rounded">no-store</code> for non-cacheable responses
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing APIs */}
          <Card className="mb-8" id="testing-apis">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Testing APIs</CardTitle>
              <CardDescription className="text-xs md:text-sm">How to test your API implementations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-4 md:p-6">
              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Step 1: Local Testing</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  Test your API locally before deploying to production.
                </p>

                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="text-xs md:text-sm font-medium mb-2">Start the development server:</p>
                  <pre className="text-xs overflow-x-auto">
                    <code>{`npm run dev
# or
yarn dev
# or
pnpm dev`}</code>
                  </pre>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground">
                  Once the server is running, you can test your API using the built-in API testing interface at{" "}
                  <code className="bg-muted px-1 py-0.5 rounded">http://localhost:3000</code> or using tools like
                  Postman, cURL, or the browser.
                </p>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Step 2: Testing with cURL</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  Use cURL to test your API endpoints from the command line.
                </p>

                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="text-xs md:text-sm font-medium mb-2">Example: Testing a GET endpoint</p>
                  <pre className="text-xs overflow-x-auto">
                    <code>{`curl -X GET "http://localhost:3000/api/v1/analytics/stats?period=weekly"`}</code>
                  </pre>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <p className="text-xs md:text-sm font-medium mb-2">Example: Testing a POST endpoint</p>
                  <pre className="text-xs overflow-x-auto">
                    <code>{`curl -X POST "http://localhost:3000/api/v1/analytics/data" \\
  -H "Content-Type: application/json" \\
  -d '{"param1":"value1","param2":"value2"}'`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Step 3: Testing Edge Cases</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  Make sure to test various scenarios to ensure your API is robust.
                </p>

                <ul className="list-disc list-inside text-xs md:text-sm text-muted-foreground space-y-1">
                  <li>Missing required parameters</li>
                  <li>Invalid parameter values</li>
                  <li>Rate limiting behavior</li>
                  <li>Maintenance mode behavior</li>
                  <li>Error handling</li>
                  <li>Caching behavior</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Deployment */}
          <Card className="mb-8" id="deployment">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Deployment</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                How to deploy your API changes to production
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-4 md:p-6">
              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Step 1: Version Control</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  Commit your changes to the version control system.
                </p>

                <div className="bg-muted p-4 rounded-md">
                  <p className="text-xs md:text-sm font-medium mb-2">Example Git commands:</p>
                  <pre className="text-xs overflow-x-auto">
                    <code>{`# Create a new branch
git checkout -b feature/new-analytics-api

# Add your changes
git add .

# Commit your changes
git commit -m "Add analytics API endpoints"

# Push to remote repository
git push origin feature/new-analytics-api`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Step 2: Pull Request</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  Create a pull request to merge your changes into the main branch.
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Include a detailed description of your changes in the pull request.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <GitMerge className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Request a code review from team members before merging.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Step 3: Deployment</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  Deploy your changes to the production environment.
                </p>

                <div className="bg-muted p-4 rounded-md">
                  <p className="text-xs md:text-sm font-medium mb-2">Deployment process:</p>
                  <ol className="list-decimal list-inside text-xs md:text-sm text-muted-foreground space-y-1">
                    <li>Merge the pull request into the main branch</li>
                    <li>
                      The CI/CD pipeline will automatically deploy the changes to the staging environment for final
                      testing
                    </li>
                    <li>After successful testing in staging, promote the changes to the production environment</li>
                    <li>Monitor the deployment logs and metrics to ensure everything is working as expected</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="mb-8" id="best-practices">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Best Practices</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Guidelines for creating high-quality APIs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-4 md:p-6">
              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">API Design</h3>
                <ul className="list-disc list-inside text-xs md:text-sm text-muted-foreground space-y-1">
                  <li>Use descriptive and consistent naming for endpoints</li>
                  <li>Follow RESTful principles when appropriate</li>
                  <li>Use appropriate HTTP methods (GET, POST, PUT, DELETE)</li>
                  <li>Return meaningful error messages and status codes</li>
                  <li>Validate input parameters thoroughly</li>
                  <li>Document all parameters and return values</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Performance</h3>
                <ul className="list-disc list-inside text-xs md:text-sm text-muted-foreground space-y-1">
                  <li>Implement caching for frequently accessed data</li>
                  <li>Optimize database queries</li>
                  <li>Use pagination for large result sets</li>
                  <li>Compress responses when appropriate</li>
                  <li>Set appropriate cache headers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Security</h3>
                <ul className="list-disc list-inside text-xs md:text-sm text-muted-foreground space-y-1">
                  <li>Validate and sanitize all input</li>
                  <li>Implement rate limiting to prevent abuse</li>
                  <li>Use HTTPS for all API endpoints</li>
                  <li>Don't expose sensitive information in responses</li>
                  <li>Follow the principle of least privilege</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Versioning</h3>
                <ul className="list-disc list-inside text-xs md:text-sm text-muted-foreground space-y-1">
                  <li>Maintain backward compatibility within a version</li>
                  <li>Document breaking changes between versions</li>
                  <li>Support multiple versions during transition periods</li>
                  <li>Use semantic versioning (major.minor.patch) for API versions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium mb-2">Monitoring and Logging</h3>
                <ul className="list-disc list-inside text-xs md:text-sm text-muted-foreground space-y-1">
                  <li>Implement comprehensive logging for all API requests</li>
                  <li>Monitor API usage, performance, and errors</li>
                  <li>Set up alerts for unusual patterns or errors</li>
                  <li>Regularly review logs and metrics to identify issues</li>
                  <li>Track rate limit usage and adjust limits if necessary</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center text-xs text-muted-foreground">{siteConfig.copyright}</div>
        </div>
      </main>
    </>
  )
}

