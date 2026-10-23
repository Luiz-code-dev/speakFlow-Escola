import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-data'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/termos`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacidade`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
