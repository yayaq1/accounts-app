import { useState, useEffect } from 'react';
import { blogQueries } from '../../lib/supabase';
import PostCard from '../../components/blog/PostCard';
import SEOHead from '../../components/SEOHead';
import { Loader } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const postsPerPage = 9;

  useEffect(() => {
    loadPosts();
  }, [page]);

  const loadPosts = async () => {
    setLoading(true);
    const offset = (page - 1) * postsPerPage;
    const { data, error } = await blogQueries.getPublishedPosts(postsPerPage, offset);

    if (error) {
      console.error('Error loading posts:', error);
    } else {
      if (page === 1) {
        setPosts(data || []);
      } else {
        setPosts((prev) => [...prev, ...(data || [])]);
      }
      setHasMore((data || []).length === postsPerPage);
    }
    setLoading(false);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <SEOHead
        title="Blog | Wise Numbers LTD"
        description="Read our latest articles about accounting, tax services, and financial advice for UK businesses."
      />
      <div className="min-h-screen bg-[#E5E7EB] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold text-[#242A33] mb-4">
              Wise Numbers Blog
            </h1>
            <p className="text-xl text-[#242A33] max-w-2xl mx-auto font-montserrat">
              Insights, tips, and updates on accounting, tax services, and financial
              management for UK businesses.
            </p>
          </div>

          {loading && page === 1 ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="w-8 h-8 text-gray-400 animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="px-8 py-3 bg-[#3b445f] text-white rounded-lg hover:bg-[#4a5575] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-montserrat font-medium"
                  >
                    {loading ? 'Loading...' : 'Load More Posts'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

