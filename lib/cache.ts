// Simple in-memory cache implementation
type CacheItem<T> = {
  value: T
  expiry: number
}

class MemoryCache {
  private cache: Map<string, CacheItem<any>> = new Map()

  // Set a value in the cache with an expiration time in seconds
  set<T>(key: string, value: T, ttlSeconds = 3600): void {
    const expiry = Date.now() + ttlSeconds * 1000
    this.cache.set(key, { value, expiry })

    // Cleanup expired items occasionally
    if (Math.random() < 0.1) {
      this.cleanup()
    }
  }

  // Get a value from the cache
  get<T>(key: string): T | null {
    const item = this.cache.get(key)

    // Return null if item doesn't exist or has expired
    if (!item || item.expiry < Date.now()) {
      if (item) {
        this.cache.delete(key) // Clean up expired item
      }
      return null
    }

    return item.value as T
  }

  // Remove a value from the cache
  delete(key: string): void {
    this.cache.delete(key)
  }

  // Clear all items from the cache
  clear(): void {
    this.cache.clear()
  }

  // Clean up expired items
  private cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry < now) {
        this.cache.delete(key)
      }
    }
  }
}

// Export a singleton instance
export const memoryCache = new MemoryCache()

// Helper function to cache API responses
export async function cachedFetch<T>(url: string, options?: RequestInit, ttlSeconds = 3600): Promise<T> {
  // Create a cache key based on the URL and options
  const cacheKey = `${url}-${JSON.stringify(options || {})}`

  // Check if we have a cached response
  const cachedResponse = memoryCache.get<T>(cacheKey)
  if (cachedResponse) {
    return cachedResponse
  }

  // If not cached, make the actual fetch request
  const response = await fetch(url, options)

  // Only cache successful responses
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  // Parse the response
  const data = (await response.json()) as T

  // Cache the response
  memoryCache.set<T>(cacheKey, data, ttlSeconds)

  return data
}

