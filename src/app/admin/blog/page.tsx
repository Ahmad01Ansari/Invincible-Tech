import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { FileText, CheckCircle2, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { getBlogs } from "../../actions/blog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminBlogListClient from "./components/AdminBlogListClient";

export const metadata = {
  title: "Admin Dashboard | Blog Management",
};

export default async function AdminBlogPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  const { data: blogs = [] } = await getBlogs();

  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter((b: any) => b.status === "published").length;
  const draftBlogs = blogs.filter((b: any) => b.status === "draft").length;

  return (
    <main className="min-h-screen bg-obsidian pt-12 pb-24">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <Badge variant="dim" className="mb-4 font-mono tracking-widest uppercase text-[10px]">
              ADMIN_BLOG_PROTOCOL
            </Badge>
            <h1 className="text-4xl font-display font-medium text-text-high tracking-tight">
              Blog <span className="text-accent-orange">Operations.</span>
            </h1>
          </div>
          
          <Link 
            href="/admin/blog/create" 
            className="h-14 px-8 bg-accent-orange text-obsidian font-mono font-bold text-xs uppercase tracking-widest flex items-center hover:bg-white transition-colors gap-2"
          >
            <Plus size={16} />
            Write New Blog
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-surface-100 border border-border-dim/20 p-8 rounded-sm group hover:border-accent-orange transition-colors">
            <div className="flex items-center justify-between mb-4">
              <FileText className="text-text-low group-hover:text-accent-orange transition-colors" size={20} />
              <span className="text-4xl font-display font-bold text-text-high">{totalBlogs}</span>
            </div>
            <p className="text-xs font-mono text-text-low uppercase tracking-widest">Total Assets</p>
          </div>
          
          <div className="bg-surface-100 border border-border-dim/20 p-8 rounded-sm group hover:border-accent-neon transition-colors">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle2 className="text-text-low group-hover:text-accent-neon transition-colors" size={20} />
              <span className="text-4xl font-display font-bold text-text-high">{publishedBlogs}</span>
            </div>
            <p className="text-xs font-mono text-text-low uppercase tracking-widest">Active Transmissions</p>
          </div>

          <div className="bg-surface-100 border border-border-dim/20 p-8 rounded-sm group hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <Clock className="text-text-low group-hover:text-white transition-colors" size={20} />
              <span className="text-4xl font-display font-bold text-text-high">{draftBlogs}</span>
            </div>
            <p className="text-xs font-mono text-text-low uppercase tracking-widest">Cached Drafts</p>
          </div>
        </div>

        {/* Blog Table Listing & Actions */}
        <AdminBlogListClient blogs={blogs} />
      </Container>
    </main>
  );
}
