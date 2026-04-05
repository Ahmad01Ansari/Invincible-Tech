import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { getBlogBySlug, incrementView } from "../../actions/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import TipTapRenderer from "@/components/blog/TipTapRenderer";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2,
  Bookmark,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: blog } = await getBlogBySlug(slug);

  if (!blog) return { title: "Asset Not Found" };

  return {
    title: `${blog.seoTitle || blog.title} | Invinsible Tech Blog`,
    description: blog.seoDescription || blog.shortDescription,
    openGraph: {
      images: [blog.ogImage || blog.coverImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: blog } = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Increment view
  await incrementView(slug);

  return (
    <main className="bg-obsidian min-h-screen pt-32 pb-40">
      <ReadingProgressBar />
      <Container>
        {/* Breadcrumbs & Navigation */}
        <div className="flex items-center gap-4 mb-12">
           <Link href="/blog" className="flex items-center gap-2 text-xs font-mono text-text-low hover:text-accent-orange transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              BACK_TO_INDEX
           </Link>
           <ChevronRight size={12} className="text-text-low opacity-30" />
           <span className="text-[10px] font-mono text-text-low truncate max-w-[200px]">
              {blog.title.toUpperCase()}
           </span>
        </div>

        {/* Heading Section */}
        <div className="max-w-4xl mb-16">
           <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-mono text-accent-orange uppercase tracking-widest border-l-2 border-accent-orange pl-4">
                 {blog.category}
              </span>
              <span className="text-[10px] font-mono text-text-low uppercase tracking-[0.2em]">
                 PROTOCOL_V1.1
              </span>
           </div>
           
           <h1 className="text-4xl md:text-6xl font-display font-medium text-text-high leading-tight tracking-tighter mb-8">
              {blog.title}
           </h1>
           
           <p className="text-xl text-text-low leading-relaxed font-mono opacity-80 mb-12">
              {blog.shortDescription}
           </p>

           {/* Post Meta */}
           <div className="flex flex-wrap items-center gap-x-10 gap-y-6 pt-10 border-t border-border-dim/20">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-surface-200 border border-border-dim flex items-center justify-center text-accent-orange">
                    <User size={18} />
                 </div>
                 <div>
                    <div className="text-[10px] font-mono text-text-low uppercase tracking-[0.2em] mb-1">Lead Author</div>
                    <div className="text-sm font-display font-medium text-text-high">{blog.author}</div>
                 </div>
              </div>

              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-surface-200 border border-border-dim flex items-center justify-center text-accent-orange">
                    <Calendar size={18} />
                 </div>
                 <div>
                    <div className="text-[10px] font-mono text-text-low uppercase tracking-[0.2em] mb-1">Timestamp</div>
                    <div className="text-sm font-display font-medium text-text-high">
                       {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-surface-200 border border-border-dim flex items-center justify-center text-accent-orange">
                    <Clock size={18} />
                 </div>
                 <div>
                    <div className="text-[10px] font-mono text-text-low uppercase tracking-[0.2em] mb-1">Execution Time</div>
                    <div className="text-sm font-display font-medium text-text-high">{blog.readTime || 5} Min Read</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Cover Image Feature */}
        <div className="relative aspect-[21/9] w-full border border-border-dim/20 mb-24 overflow-hidden shadow-2xl">
           <Image 
             src={blog.coverImage} 
             alt={blog.title}
             fill
             priority
             className="object-cover opacity-80 hover:scale-105 transition-transform duration-[3s] grayscale-[0.5] hover:grayscale-0"
           />
           <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent opacity-60" />
        </div>

        {/* Main Content & Sticky Sidebar */}
        <div className="grid lg:grid-cols-12 gap-16 relative">
           {/* Sidebar: Interactions */}
           <div className="lg:col-span-1 hidden lg:block sticky top-32 h-fit space-y-8">
              <button className="w-12 h-12 border border-border-dim/30 flex items-center justify-center text-text-low hover:text-accent-orange hover:border-accent-orange transition-all">
                 <Share2 size={18} />
              </button>
              <button className="w-12 h-12 border border-border-dim/30 flex items-center justify-center text-text-low hover:text-accent-neon hover:border-accent-neon transition-all">
                 <Bookmark size={18} />
              </button>
           </div>

           {/* Core Article Body */}
           <div className="lg:col-span-8">
              <TipTapRenderer content={blog.content} />
              
              {/* Post Footer/CTA */}
              <div className="mt-24 pt-20 border-t border-border-dim/20 flex flex-col items-center text-center">
                 <Badge variant="dim" className="mb-6 font-mono tracking-widest text-[10px]">RESOURCES_LOCKED</Badge>
                 <h3 className="text-3xl font-display font-medium text-text-high mb-8">Ready to engineer your next <span className="text-accent-orange">technical breakthrough?</span></h3>
                 <Link href="/contact" className="h-16 px-12 bg-accent-orange text-obsidian font-mono font-bold text-xs uppercase tracking-widest flex items-center hover:bg-white transition-colors">
                    Initiate Consultation Protocols
                 </Link>
              </div>
           </div>

           {/* Sticky TOC or Context Sidebar */}
           <div className="lg:col-span-3 hidden xl:block sticky top-32 h-fit">
              <div className="bg-surface-100 border border-border-dim/10 p-8 rounded-sm">
                 <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-low mb-8 border-b border-border-dim/10 pb-4">
                    Table of Context
                 </h4>
                 <div className="space-y-4 opacity-70 italic text-xs font-mono text-text-low leading-relaxed">
                    Scroll through the system blueprints to explore individual technical modules of this asset.
                 </div>
              </div>
           </div>
        </div>
      </Container>
    </main>
  );
}
