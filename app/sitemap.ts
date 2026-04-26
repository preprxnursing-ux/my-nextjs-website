import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://prenclex.com', lastModified: new Date(), priority: 1 },
    { url: 'https://prenclex.com/courses', lastModified: new Date(), priority: 0.9 },
    { url: 'https://prenclex.com/courses/nclex-rn', lastModified: new Date(), priority: 0.9 },
    { url: 'https://prenclex.com/courses/nclex-pn', lastModified: new Date(), priority: 0.8 },
    { url: 'https://prenclex.com/nursing-tv', lastModified: new Date(), priority: 0.9 },
    { url: 'https://prenclex.com/pricing', lastModified: new Date(), priority: 0.8 },
    { url: 'https://prenclex.com/features', lastModified: new Date(), priority: 0.7 },
    { url: 'https://prenclex.com/testimonials', lastModified: new Date(), priority: 0.7 },
    { url: 'https://prenclex.com/blog', lastModified: new Date(), priority: 0.7 },
    { url: 'https://prenclex.com/faq', lastModified: new Date(), priority: 0.6 },
    { url: 'https://prenclex.com/contact', lastModified: new Date(), priority: 0.6 },
  ]
}
