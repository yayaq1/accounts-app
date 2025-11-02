import '../styles/globals.css';
import Head from 'next/head';
import siteConfig from '../lib/seo';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Default SEO - can be overridden by page-specific SEOHead */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3b445f" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
