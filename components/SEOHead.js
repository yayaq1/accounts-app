import Head from 'next/head';
import {
  getCanonicalUrl,
  getPageTitle,
  getOrganizationSchema,
  getLocalBusinessSchema,
  getAccountingServiceSchema,
  getProfessionalServiceSchema,
  getWebSiteSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  siteConfig
} from '../lib/seo';

/**
 * SEOHead Component - Reusable SEO component for dynamic meta tags
 * @param {Object} props - SEO configuration props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords (comma-separated)
 * @param {string} props.path - Page path for canonical URL
 * @param {string} props.image - Open Graph image URL
 * @param {boolean} props.noindex - Whether to noindex this page
 * @param {Array} props.schemaTypes - Array of schema types to include (e.g., ['Organization', 'LocalBusiness'])
 * @param {Array} props.breadcrumbs - Array of {name, url} for breadcrumbs
 * @param {Array} props.faqs - Array of {question, answer} for FAQ schema
 */
export default function SEOHead({
  title,
  description,
  keywords,
  path = '/',
  image,
  noindex = false,
  schemaTypes = [],
  breadcrumbs = [],
  faqs = []
}) {
  const pageTitle = getPageTitle(title);
  const metaDescription = description || siteConfig.defaultDescription;
  const metaKeywords = keywords || siteConfig.defaultKeywords;
  const canonicalUrl = getCanonicalUrl(path);
  const ogImage = image || `${siteConfig.siteUrl}/logo.png`;
  
  // Generate structured data schemas
  const schemas = [];
  
  schemaTypes.forEach(type => {
    switch (type) {
      case 'Organization':
        schemas.push(getOrganizationSchema());
        break;
      case 'LocalBusiness':
        schemas.push(getLocalBusinessSchema());
        break;
      case 'AccountingService':
        schemas.push(getAccountingServiceSchema());
        break;
      case 'ProfessionalService':
        schemas.push(getProfessionalServiceSchema('ProfessionalService'));
        break;
      case 'TaxService':
        schemas.push(getProfessionalServiceSchema('TaxService'));
        break;
      case 'WebSite':
        schemas.push(getWebSiteSchema());
        break;
      default:
        break;
    }
  });
  
  if (breadcrumbs.length > 0) {
    schemas.push(getBreadcrumbSchema(breadcrumbs));
  }
  
  if (faqs.length > 0) {
    schemas.push(getFAQSchema(faqs));
  }

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={siteConfig.organization.name} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content={siteConfig.locale} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags */}
      <meta name="geo.region" content="GB-ENG" />
      <meta name="geo.placename" content="Birmingham" />
      <meta name="geo.position" content="52.4862;-1.8904" />
      <meta name="ICBM" content="52.4862, -1.8904" />
      
      {/* Structured Data (JSON-LD) */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}

