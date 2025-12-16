import Head from 'next/head';
import { getCanonicalUrl, getPageTitle, getArticleSchema, getOrganizationSchema, siteConfig } from '../../lib/seo';

export default function BlogSEO({ post }) {
  const pageTitle = getPageTitle(post.seo_title || post.title);
  const metaDescription = post.seo_description || post.excerpt || siteConfig.defaultDescription;
  const canonicalUrl = getCanonicalUrl(`/blog/${post.slug}`);
  const ogImage = post.featured_image 
    ? (post.featured_image.startsWith('http') ? post.featured_image : `${siteConfig.siteUrl}${post.featured_image}`)
    : `${siteConfig.siteUrl}/logo.png`;

  const articleSchema = getArticleSchema(post);
  const organizationSchema = getOrganizationSchema();

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="author" content={siteConfig.organization.name} />
      <meta name="robots" content="index,follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content={siteConfig.locale} />
      {post.published_at && (
        <meta property="article:published_time" content={post.published_at} />
      )}
      {post.updated_at && (
        <meta property="article:modified_time" content={post.updated_at} />
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </Head>
  );
}

