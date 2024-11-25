import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Classic favicon */}
        <link rel="icon" type="image/x-icon" href="favicon.ico" />

        {/* Modern favicons */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />

        {/* Apple touch icon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />

        {/* Android web app manifest */}
        <link rel="manifest" href="manifest.json" />

        {/* Optional: Add theme color for mobile browsers */}
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className="bg-gray-200 font-roboto tracking-wider">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
