import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { blogQueries } from '../../lib/supabase';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', slug: '' });

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    setLoading(true);
    const { data, error } = await blogQueries.getTags();
    if (error) {
      console.error('Error loading tags:', error);
    } else {
      setTags(data || []);
    }
    setLoading(false);
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = formData.slug || generateSlug(formData.name);

    try {
      if (editingId) {
        const { error } = await blogQueries.updateTag(editingId, {
          name: formData.name,
          slug,
        });
        if (error) throw error;
      } else {
        const { error } = await blogQueries.createTag({
          name: formData.name,
          slug,
        });
        if (error) throw error;
      }

      setFormData({ name: '', slug: '' });
      setShowForm(false);
      setEditingId(null);
      loadTags();
    } catch (error) {
      console.error('Error saving tag:', error);
      alert('Failed to save tag. It may already exist.');
    }
  };

  const handleEdit = (tag) => {
    setFormData({ name: tag.name, slug: tag.slug });
    setEditingId(tag.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this tag?')) return;

    try {
      const { error } = await blogQueries.deleteTag(id);
      if (error) throw error;
      loadTags();
    } catch (error) {
      console.error('Error deleting tag:', error);
      alert('Failed to delete tag. It may be in use.');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', slug: '' });
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tags</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({ name: '', slug: '' });
            }}
            className="flex items-center space-x-2 bg-[#3b445f] text-white px-4 py-2 rounded-lg hover:bg-[#4a5575] transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>New Tag</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Edit Tag' : 'New Tag'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: formData.slug || generateSlug(e.target.value),
                    })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, slug: generateSlug(e.target.value) })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b445f] focus:border-transparent"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#3b445f] text-white rounded-lg hover:bg-[#4a5575]"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading tags...</div>
        ) : tags.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No tags yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tags.map((tag) => (
                  <tr key={tag.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {tag.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tag.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(tag)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(tag.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

