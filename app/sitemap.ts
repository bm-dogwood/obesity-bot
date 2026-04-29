import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://obesity.bot'
  const now = new Date()

  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/bmi-calculator', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/obesity-treatment-options', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/glp1-medications-guide', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/weight-loss-surgery-guide', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/obesity-statistics-by-state', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/insurance-coverage-weight-loss', priority: 0.85, changeFrequency: 'monthly' as const },
  ]

  return routes.map(r => ({
    url: `${base}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
