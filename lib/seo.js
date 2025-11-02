// SEO Configuration and Utility Functions
const siteConfig = {
  siteName: 'Wise Numbers LTD',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://wisenumbers.co.uk',
  defaultTitle: 'Wise Numbers LTD | Premier Accounting Services in the UK',
  defaultDescription: 'Expert-led accounting firm in Birmingham, UK. Chartered accountants providing accounting, tax, and bookkeeping services. Trusted by businesses across the UK.',
  defaultKeywords: 'wise numbers, accountant services UK, accounting firm Birmingham, chartered accountant UK, tax services UK, bookkeeping services UK',
  locale: 'en_GB',
  organization: {
    name: 'Wise Numbers LTD',
    legalName: 'Wise Numbers LTD',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://wisenumbers.co.uk',
    logo: '/logo.png',
    address: {
      streetAddress: 'Apex House, Calthorpe Road',
      addressLocality: 'Birmingham',
      postalCode: 'B15 1TR',
      addressCountry: 'GB',
      addressRegion: 'England'
    },
    contactPoint: {
      telephone: '+44-7889-255949',
      contactType: 'Customer Service',
      email: 'info@wisenumbers.co.uk',
      areaServed: 'GB',
      availableLanguage: 'English'
    },
    sameAs: [
      // Add social media URLs when available
    ]
  }
};

/**
 * Generate canonical URL for a page
 */
export function getCanonicalUrl(path = '') {
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generate page title
 */
export function getPageTitle(title) {
  if (!title) return siteConfig.defaultTitle;
  return title.includes(siteConfig.siteName) 
    ? title 
    : `${title} | ${siteConfig.siteName}`;
}

/**
 * Generate Organization schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.organization.name,
    legalName: siteConfig.organization.legalName,
    url: siteConfig.organization.url,
    logo: `${siteConfig.siteUrl}${siteConfig.organization.logo}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.organization.address.streetAddress,
      addressLocality: siteConfig.organization.address.addressLocality,
      postalCode: siteConfig.organization.address.postalCode,
      addressCountry: siteConfig.organization.address.addressCountry,
      addressRegion: siteConfig.organization.address.addressRegion
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.organization.contactPoint.telephone,
      contactType: siteConfig.organization.contactPoint.contactType,
      email: siteConfig.organization.contactPoint.email,
      areaServed: siteConfig.organization.contactPoint.areaServed,
      availableLanguage: siteConfig.organization.contactPoint.availableLanguage
    },
    ...(siteConfig.organization.sameAs.length > 0 && {
      sameAs: siteConfig.organization.sameAs
    })
  };
}

/**
 * Generate LocalBusiness schema
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.siteUrl}#business`,
    name: siteConfig.organization.name,
    image: `${siteConfig.siteUrl}${siteConfig.organization.logo}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.organization.address.streetAddress,
      addressLocality: siteConfig.organization.address.addressLocality,
      postalCode: siteConfig.organization.address.postalCode,
      addressCountry: siteConfig.organization.address.addressCountry,
      addressRegion: siteConfig.organization.address.addressRegion
    },
    telephone: siteConfig.organization.contactPoint.telephone,
    email: siteConfig.organization.contactPoint.email,
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom'
    },
    priceRange: '$$',
    url: siteConfig.organization.url
  };
}

/**
 * Generate AccountingService schema
 */
export function getAccountingServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    '@id': `${siteConfig.siteUrl}#accounting-service`,
    name: `${siteConfig.organization.name} - Accounting Services`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.organization.name,
      url: siteConfig.organization.url
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom'
    },
    serviceType: [
      'Accounting Services',
      'Bookkeeping',
      'Financial Management',
      'Tax Preparation',
      'Tax Planning',
      'Financial Consultancy'
    ],
    url: `${siteConfig.siteUrl}/accounting-services`
  };
}

/**
 * Generate ProfessionalService schema
 */
export function getProfessionalServiceSchema(serviceType = 'ProfessionalService') {
  return {
    '@context': 'https://schema.org',
    '@type': serviceType,
    '@id': `${siteConfig.siteUrl}#professional-service`,
    name: `${siteConfig.organization.name} - ${serviceType}`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.organization.name,
      url: siteConfig.organization.url,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.organization.address.streetAddress,
        addressLocality: siteConfig.organization.address.addressLocality,
        postalCode: siteConfig.organization.address.postalCode,
        addressCountry: siteConfig.organization.address.addressCountry
      },
      telephone: siteConfig.organization.contactPoint.telephone,
      email: siteConfig.organization.contactPoint.email
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom'
    }
  };
}

/**
 * Generate WebSite schema
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.siteUrl}#website`,
    url: siteConfig.siteUrl,
    name: siteConfig.siteName,
    publisher: {
      '@id': `${siteConfig.siteUrl}#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.siteUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Generate FAQPage schema
 */
export function getFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// Export siteConfig both as default and named export for flexibility
export { siteConfig };
export default siteConfig;

