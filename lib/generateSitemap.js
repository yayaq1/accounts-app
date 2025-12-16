// Sitemap generation utility
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wisenumbers.co.uk';

const pages = [
  {
    url: '',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date().toISOString()
  },
  {
    url: '/about-us',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  },
  {
    url: '/accounting-services',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString()
  },
  {
    url: '/tax-services',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString()
  },
  {
    url: '/sectors-we-serve',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString()
  },
  {
    url: '/blog',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString()
  }
];

export function generateSitemap(blogPosts = []) {
  // Add blog posts to sitemap
  const blogPages = blogPosts.map((post) => ({
    url: `/blog/${post.slug}`,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: post.updated_at || post.published_at || post.created_at || new Date().toISOString()
  }));

  const allPages = [...pages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return sitemap;
}

export function getSitemapPages() {
  return pages;
}

