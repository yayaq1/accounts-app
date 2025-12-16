import { generateSitemap } from '../lib/generateSitemap';
import { supabase } from '../lib/supabase';

function Sitemap() {
  // This component will never render
  return null;
}

export async function getServerSideProps({ res }) {
  // Get all published blog posts
  let blogPosts = [];
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('slug, updated_at, published_at, created_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(1000);

    if (!error && data) {
      blogPosts = data;
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  const sitemap = generateSitemap(blogPosts);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
}

export default Sitemap;

