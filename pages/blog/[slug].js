import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { blogQueries } from '../../lib/supabase';
import BlogSEO from '../../components/blog/BlogSEO';
import { Calendar, Tag, Folder, Loader } from 'lucide-react';
import Link from 'next/link';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  const loadPost = async () => {
    setLoading(true);
    const { data, error } = await blogQueries.getPostBySlug(slug);

    if (error || !data) {
      router.push('/blog');
      return;
    }

    setPost(data);
    setLoading(false);
  };

  if (loading || !post) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <Loader className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const categories = post.post_categories?.map((pc) => pc.category) || [];
  const tags = post.post_tags?.map((pt) => pt.tag) || [];

  return (
    <>
      <BlogSEO post={post} />
      <article className="min-h-screen bg-[#E5E7EB] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-8">
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <Link key={category.id} href={`/blog?category=${category.slug}`}>
                    <a className="inline-block px-3 py-1 text-sm font-semibold text-[#3b445f] bg-blue-100 rounded-full hover:bg-blue-200 transition-colors font-montserrat">
                      {category.name}
                    </a>
                  </Link>
                ))}
              </div>
            )}
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold text-[#242A33] mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-xl text-[#242A33] mb-6 font-montserrat">{post.excerpt}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#242A33] font-montserrat">
              {publishedDate && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime={post.published_at}>{publishedDate}</time>
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-[#242A33] prose-headings:font-montserrat prose-p:text-[#242A33] prose-p:font-montserrat prose-a:text-[#3b445f] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#242A33] prose-img:rounded-lg prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start gap-2">
                <Tag className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
                      <a className="inline-block px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        #{tag.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-gray-300">
            <Link href="/blog">
              <a className="inline-flex items-center text-[#3b445f] font-medium hover:text-[#4a5575] transition-colors font-montserrat">
                ← Back to Wise Numbers Blog
              </a>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

