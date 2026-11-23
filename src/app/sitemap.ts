import { MetadataRoute } from 'next'
import { SITE_URL } from '@/content/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: SITE_URL,                lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/media`,     lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/teaching`,  lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ]
}
