import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ai-tools-free.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // يمكنك إضافة صفحات أخرى هنا يدوياً أو جلبها من قاعدة بيانات
    {
      url: 'https://ai-tools-free.vercel.app/tools',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
