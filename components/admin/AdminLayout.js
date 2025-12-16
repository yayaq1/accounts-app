import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { auth } from '../../lib/auth';
import { LogOut, FileText, Folder, Tag, Home } from 'lucide-react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth.isAuthenticated()) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && router.pathname.startsWith('/admin') && router.pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    auth.logout();
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-[#3b445f] text-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">Blog Admin</h1>
          <nav className="space-y-2">
            <Link href="/admin">
              <a className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#4a5575] transition-colors">
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
            </Link>
            <Link href="/admin/posts">
              <a className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#4a5575] transition-colors">
                <FileText className="w-5 h-5" />
                <span>Posts</span>
              </a>
            </Link>
            <Link href="/admin/categories">
              <a className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#4a5575] transition-colors">
                <Folder className="w-5 h-5" />
                <span>Categories</span>
              </a>
            </Link>
            <Link href="/admin/tags">
              <a className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#4a5575] transition-colors">
                <Tag className="w-5 h-5" />
                <span>Tags</span>
              </a>
            </Link>
          </nav>
        </div>
        <div className="absolute bottom-0 w-full p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}

