"use client";

import { 
  Plus, 
  Search, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  Eye, 
  Trash2,
  Filter,
  Loader2,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { deleteBlog } from "@/app/actions/blog";
import { useRouter } from "next/navigation";

interface AdminBlogListClientProps {
  blogs: any[];
}

export default function AdminBlogListClient({ blogs: initialBlogs }: AdminBlogListClientProps) {
  const router = useRouter();
  const [blogs, setBlogs] = useState(initialBlogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action is IRREVERSIBLE.`)) {
      return;
    }

    setIsDeleting(id);
    try {
      const result = await deleteBlog(id);
      if (result.success) {
        setBlogs(prev => prev.filter(b => b._id !== id));
        router.refresh();
      } else {
        alert(`Delete failed: ${result.error}`);
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <>
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-surface-100 p-4 border border-border-dim/10 rounded-sm">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-low" size={18} />
          <input 
            type="text" 
            placeholder="Search assets by title, slug, or content..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-obsidian border border-border-dim/20 rounded-sm pl-12 pr-4 py-4 text-sm font-mono text-text-high focus:outline-none focus:border-accent-orange transition-all placeholder:text-text-low/30"
          />
        </div>
      </div>

      {/* Blog Table Listing */}
      <div className="overflow-x-auto border border-border-dim/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-200 border-b border-border-dim/20">
              <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-text-low">Asset Name</th>
              <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-text-low">Category</th>
              <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-text-low">Status</th>
              <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-text-low">Timestamp</th>
              <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-text-low text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog: any) => (
              <tr key={blog._id} className="border-b border-border-dim/10 hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-6 font-display font-medium text-text-high">
                  {blog.title}
                  <div className="text-[10px] font-mono text-text-low mt-1 uppercase tracking-tight opacity-50">
                    /{blog.slug}
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="text-[10px] font-mono uppercase text-text-low border border-border-dim/30 px-2 py-1">
                    {blog.category}
                  </span>
                </td>
                <td className="px-6 py-6">
                  <span className={`text-[10px] font-mono uppercase flex items-center gap-1.5 ${
                    blog.status === "published" ? "text-accent-neon" : "text-accent-orange"
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${
                      blog.status === "published" ? "bg-accent-neon" : "bg-accent-orange animate-pulse"
                    }`} />
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-6 text-xs font-mono text-text-low">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-6 text-right space-x-3 whitespace-nowrap">
                  <Link 
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    className="inline-flex w-8 h-8 items-center justify-center text-text-low hover:text-white transition-colors" 
                    title="Live Preview"
                  >
                    <Eye size={18} />
                  </Link>
                  <Link 
                    href={`/admin/blog/edit/${blog._id}`} 
                    className="inline-flex w-8 h-8 items-center justify-center text-text-low hover:text-accent-orange transition-colors"
                    title="Edit"
                  >
                    <Edit3 size={18} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(blog._id, blog.title)}
                    disabled={isDeleting === blog._id}
                    className="w-8 h-8 inline-flex items-center justify-center text-text-low hover:text-red-500 transition-colors disabled:opacity-50" 
                    title="Delete"
                  >
                    {isDeleting === blog._id ? <Loader2 size={18} className="animate-spin text-red-500" /> : <Trash2 size={18} />}
                  </button>
                </td>
              </tr>
            ))}
            {filteredBlogs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-text-low font-mono text-xs uppercase tracking-[0.2em] opacity-50">
                  <div className="flex flex-col items-center gap-4">
                     <AlertTriangle size={32} className="text-border-dim" />
                     <span>No technical assets found in current query.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
