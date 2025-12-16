import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for blog operations
export const blogQueries = {
  // Get all published posts
  async getPublishedPosts(limit = 10, offset = 0) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        post_categories (
          category:categories (*)
        ),
        post_tags (
          tag:tags (*)
        )
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    return { data, error };
  },

  // Get post by slug
  async getPostBySlug(slug) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        post_categories (
          category:categories (*)
        ),
        post_tags (
          tag:tags (*)
        )
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    return { data, error };
  },

  // Get all posts (for admin)
  async getAllPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    return { data, error };
  },

  // Get post by ID (for admin)
  async getPostById(id) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        post_categories (
          category_id
        ),
        post_tags (
          tag_id
        )
      `)
      .eq('id', id)
      .single();

    return { data, error };
  },

  // Create post
  async createPost(postData) {
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()
      .single();

    return { data, error };
  },

  // Update post
  async updatePost(id, postData) {
    const { data, error } = await supabase
      .from('posts')
      .update(postData)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Delete post
  async deletePost(id) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    return { error };
  },

  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    return { data, error };
  },

  // Get all tags
  async getTags() {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name');

    return { data, error };
  },

  // Create category
  async createCategory(categoryData) {
    const { data, error } = await supabase
      .from('categories')
      .insert([categoryData])
      .select()
      .single();

    return { data, error };
  },

  // Update category
  async updateCategory(id, categoryData) {
    const { data, error } = await supabase
      .from('categories')
      .update(categoryData)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Delete category
  async deleteCategory(id) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    return { error };
  },

  // Create tag
  async createTag(tagData) {
    const { data, error } = await supabase
      .from('tags')
      .insert([tagData])
      .select()
      .single();

    return { data, error };
  },

  // Update tag
  async updateTag(id, tagData) {
    const { data, error } = await supabase
      .from('tags')
      .update(tagData)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Delete tag
  async deleteTag(id) {
    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', id);

    return { error };
  },

  // Set post categories
  async setPostCategories(postId, categoryIds) {
    // Delete existing
    await supabase
      .from('post_categories')
      .delete()
      .eq('post_id', postId);

    // Insert new ones
    if (categoryIds && categoryIds.length > 0) {
      const { error } = await supabase
        .from('post_categories')
        .insert(categoryIds.map(catId => ({ post_id: postId, category_id: catId })));

      return { error };
    }

    return { error: null };
  },

  // Set post tags
  async setPostTags(postId, tagIds) {
    // Delete existing
    await supabase
      .from('post_tags')
      .delete()
      .eq('post_id', postId);

    // Insert new ones
    if (tagIds && tagIds.length > 0) {
      const { error } = await supabase
        .from('post_tags')
        .insert(tagIds.map(tagId => ({ post_id: postId, tag_id: tagId })));

      return { error };
    }

    return { error: null };
  },

  // Upload image to storage
  async uploadImage(file, fileName) {
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) return { data: null, error };

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    return { data: publicUrl, error: null };
  },

  // Delete image from storage
  async deleteImage(fileName) {
    const { error } = await supabase.storage
      .from('blog-images')
      .remove([fileName]);

    return { error };
  }
};

