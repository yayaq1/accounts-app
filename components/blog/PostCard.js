import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';

export default function PostCard({ post }) {
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
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {post.featured_image && (
        <div className="relative h-48 w-full">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category) => (
              <span
                key={category.id}
                className="inline-block px-3 py-1 text-xs font-semibold text-[#3b445f] bg-blue-100 rounded-full"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}
        <h2 className="font-montserrat text-2xl font-bold text-[#242A33] mb-3 hover:text-[#3b445f] transition-colors">
          <Link href={`/blog/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </h2>
        {post.excerpt && (
          <p className="text-[#242A33] mb-4 line-clamp-3 font-montserrat">{post.excerpt}</p>
        )}
        <div className="flex items-center justify-between">
          {publishedDate && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <time dateTime={post.published_at}>{publishedDate}</time>
            </div>
          )}
          <Link href={`/blog/${post.slug}`}>
            <a className="flex items-center text-[#3b445f] font-medium hover:text-[#4a5575] transition-colors">
              Read more
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Link>
        </div>
      </div>
    </article>
  );
}

