import { generateSitemap } from '../lib/generateSitemap';

function Sitemap() {
  // This component will never render
  return null;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSitemap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
}

export default Sitemap;

