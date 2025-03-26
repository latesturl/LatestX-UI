import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const endpoints = [
  {
    method: "GET",
    path: "/api/users",
    description: "Retrieve a list of users",
    example: `fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data))`,
  },
  {
    method: "POST",
    path: "/api/users",
    description: "Create a new user",
    example: `fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John Doe' })
})`,
  },
  {
    method: "PUT",
    path: "/api/users/:id",
    description: "Update an existing user",
    example: `fetch('/api/users/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Jane Doe' })
})`,
  },
]

export function ApiSection() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-3xl font-bold">API Endpoints</h2>
        <div className="grid gap-6">
          {endpoints.map((endpoint, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <span
                    className={`rounded px-2.5 py-0.5 text-sm font-semibold
                    ${
                      endpoint.method === "GET"
                        ? "bg-green-500/10 text-green-500"
                        : endpoint.method === "POST"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <CardTitle className="font-mono">{endpoint.path}</CardTitle>
                </div>
                <CardDescription>{endpoint.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-lg bg-muted p-4">
                  <code className="text-sm">{endpoint.example}</code>
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

