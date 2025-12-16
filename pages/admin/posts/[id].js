import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/AdminLayout';
import Editor from '../../../components/admin/Editor';
import ImageUpload from '../../../components/admin/ImageUpload';
import { blogQueries } from '../../../lib/supabase';
import { Save, Loader } from 'lucide-react';

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: null,
    status: 'draft',
    seo_title: '',
    seo_description: '',
    categoryIds: [],
    tagIds: [],
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (id) {
      loadPost();
      loadTaxonomies();
    }
  }, [id]);

  const loadPost = async () => {
    setLoading(true);
    const { data, error } = await blogQueries.getPostById(id);

    if (error) {
      console.error('Error loading post:', error);
      alert('Failed to load post');
      router.push('/admin');
      return;
    }

    if (data) {
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        featured_image: data.featured_image || null,
        status: data.status || 'draft',
        seo_title: data.seo_title || '',
        seo_description: data.seo_description || '',
        categoryIds: data.post_categories?.map((pc) => pc.category_id) || [],
        tagIds: data.post_tags?.map((pt) => pt.tag_id) || [],
      });
    }
    setLoading(false);
  };

  const loadTaxonomies = async () => {
    const [catsRes, tagsRes] = await Promise.all([
      blogQueries.getCategories(),
      blogQueries.getTags(),
    ]);
    setCategories(catsRes.data || []);
    setTags(tagsRes.data || []);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: formData.slug || generateSlug(title),
      seo_title: formData.seo_title || title,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const postData = {
        ...formData,
        published_at:
          formData.status === 'published' && !formData.published_at
            ? new Date().toISOString()
            : formData.published_at,
      };

      // Remove categoryIds and tagIds from postData
      const { categoryIds, tagIds, ...postUpdateData } = postData;

      const { error } = await blogQueries.updatePost(id, postUpdateData);

      if (error) throw error;

      // Update categories and tags
      await Promise.all([
        blogQueries.setPostCategories(id, categoryIds),
        blogQueries.setPostTags(id, tagIds),
      ]);

      router.push('/admin');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b445f] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b445f] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b445f] focus:border-transparent"
              />
            </div>

            <ImageUpload
              currentImage={formData.featured_image}
              onImageUploaded={(url) => setFormData({ ...formData, featured_image: url })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <Editor
                content={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b445f] focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.categoryIds.includes(cat.id)}
                        onChange={(e) => {
                          const newIds = e.target.checked
                            ? [...formData.categoryIds, cat.id]
                            : formData.categoryIds.filter((id) => id !== cat.id);
                          setFormData({ ...formData, categoryIds: newIds });
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
                  {tags.map((tag) => (
                    <label key={tag.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.tagIds.includes(tag.id)}
                        onChange={(e) => {
                          const newIds = e.target.checked
                            ? [...formData.tagIds, tag.id]
                            : formData.tagIds.filter((id) => id !== tag.id);
                          setFormData({ ...formData, tagIds: newIds });
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Title
              </label>
              <input
                type="text"
                value={formData.seo_title}
                onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b445f] focus:border-transparent"
                placeholder={formData.title || 'SEO title'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Description
              </label>
              <textarea
                value={formData.seo_description}
                onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b445f] focus:border-transparent"
                placeholder="SEO description (recommended: 150-160 characters)"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-2 bg-[#3b445f] text-white rounded-lg hover:bg-[#4a5575] disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

