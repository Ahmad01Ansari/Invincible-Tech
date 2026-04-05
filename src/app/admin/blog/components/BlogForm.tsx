"use client";

import { Badge } from "@/components/ui/Badge";
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon,
  Rocket,
  AlertCircle,
  XCircle,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import TipTapEditor from "@/components/editor/TipTapEditor";
import { createBlog, updateBlog } from "@/app/actions/blog";
import { useRouter } from "next/navigation";

interface BlogFormProps {
  initialData?: any;
  isEdit?: boolean;
  blogId?: string;
}

export default function BlogForm({ initialData, isEdit, blogId }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    shortDescription: initialData?.shortDescription || "",
    content: initialData?.content || null,
    coverImage: initialData?.coverImage || "",
    category: initialData?.category || "Architecture",
    tags: initialData?.tags || [] as string[],
    author: initialData?.author || "Invinsible Engineering",
    status: initialData?.status || "draft" as "draft" | "published",
    isFeatured: initialData?.isFeatured || false,
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
  });
  const [error, setError] = useState<string | null>(null);
  
  // Use a Ref to always have the absolute latest content during submission
  const contentRef = useRef<any>(initialData?.content || null);

  // Auto-generate slug from title (only in Create mode)
  useEffect(() => {
    if (!isEdit && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, isEdit]);

  const handleSubmit = async (status: "draft" | "published") => {
    setIsSubmitting(true);
    setError(null);
    try {
      let result;
      // CRITICAL: Use the REF content to ensure newly pasted images are included!
      const dataToSubmit = { 
        ...formData, 
        status,
        content: contentRef.current 
      };
      
      if (isEdit && blogId) {
        result = await updateBlog(blogId, dataToSubmit);
      } else {
        result = await createBlog(dataToSubmit);
      }

      if (result.success) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        setError(result.error);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err: any) {
      setError(err.message || "A critical deployment error occurred.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-12">
      {error && (
        <div className="lg:col-span-12 animate-in fade-in slide-in-from-top-4 duration-300">
           <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-sm flex items-start gap-4">
              <XCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <div className="flex-grow">
                 <h4 className="text-red-500 font-mono text-[10px] uppercase tracking-widest mb-1">DATA_INTEGRITY_VIOLATION</h4>
                 <p className="text-text-high text-xs leading-relaxed">{error}</p>
              </div>
              <button onClick={() => setError(null)} className="text-text-low hover:text-white transition-colors">
                 <AlertCircle size={16} />
              </button>
           </div>
        </div>
      )}

      <div className="lg:col-span-12 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-border-dim/10 pb-12">
          <div className="flex items-center gap-4">
            <Link href="/admin/blog" className="w-10 h-10 border border-border-dim/30 flex items-center justify-center hover:border-accent-orange transition-colors text-text-low">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <Badge variant="dim" className="mb-2 font-mono tracking-widest uppercase text-[10px]">
                {isEdit ? "ASSET_MODIFICATION_PROTOCOL" : "NEW_ASSET_LIFECYCLE"}
              </Badge>
              <h1 className="text-3xl font-display font-medium text-text-high tracking-tight">
                {isEdit ? "Edit Technical Asset." : "Write Technical Insight."}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleSubmit("draft")}
              disabled={isSubmitting}
              className="px-6 h-12 border border-border-dim text-text-low font-mono text-[10px] uppercase tracking-widest hover:border-white transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save Draft
            </button>
            <button 
              onClick={() => handleSubmit("published")}
              disabled={isSubmitting}
              className="px-6 h-12 bg-accent-orange text-obsidian font-mono font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Rocket size={14} />}
              Execute Deploy
            </button>
          </div>
      </div>

      {/* Main Editor Section */}
      <div className="lg:col-span-8 space-y-8">
        <div className="space-y-4">
           <label className="text-[10px] font-mono text-text-low uppercase tracking-widest">Asset Header</label>
           <input 
             type="text" 
             value={formData.title}
             onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
             placeholder="Enter Insight Title..."
             className="w-full bg-transparent border-b border-border-dim/30 text-4xl font-display font-medium text-text-high pb-4 focus:outline-none focus:border-accent-orange transition-all placeholder:text-text-low/20"
           />
        </div>

        <div className="space-y-4">
           <label className="text-[10px] font-mono text-text-low uppercase tracking-widest">Resource URI (Slug)</label>
           <input 
             type="text" 
             value={formData.slug}
             onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
             className="w-full bg-surface-200 border border-border-dim/20 px-4 py-3 text-sm font-mono text-text-low focus:outline-none focus:border-accent-orange transition-all"
             readOnly={isEdit}
           />
           {isEdit && <p className="text-[10px] font-mono text-text-low/50 uppercase">Slug modification is locked for data stability.</p>}
        </div>

        <div className="space-y-4">
           <label className="text-[10px] font-mono text-text-low uppercase tracking-widest">System Overview (Description)</label>
           <textarea 
             rows={3}
             value={formData.shortDescription}
             onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
             placeholder="Summarize the technical objectives of this asset..."
             className="w-full bg-surface-200 border border-border-dim/10 p-4 text-sm leading-relaxed text-text-high focus:outline-none focus:border-accent-orange transition-all placeholder:text-text-low/20 resize-none"
           />
        </div>

        <div className="pt-8 min-h-[700px]">
           <TipTapEditor 
             content={formData.content} 
             onChange={(json: any) => {
               // Update both state (for UI) and Ref (for persistent save)
               contentRef.current = json;
               setFormData(prev => ({ ...prev, content: json }));
             }} 
           />
        </div>
      </div>

      {/* Right Sidebar: Meta & Configuration */}
      <div className="lg:col-span-4 space-y-8">
        <div className="bg-surface-100 border border-border-dim/20 p-8 rounded-sm text-text-high sticky top-32">
           <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-text-low mb-8 border-b border-border-dim/10 pb-4">
             Asset Metadata
           </h4>
           
           <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-mono text-text-low uppercase tracking-widest mb-2">Category Pillar</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-obsidian border border-border-dim/30 p-3 text-xs font-mono text-text-high focus:outline-none focus:border-accent-orange"
                >
                  <option>Architecture</option>
                  <option>AI & Intelligent Systems</option>
                  <option>Cloud Infrastructure</option>
                  <option>Digital Strategy</option>
                  <option>Enterprise Mobility</option>
                </select>
             </div>

             <div>
                <label className="block text-[10px] font-mono text-text-low uppercase tracking-widest mb-2">Cover Asset (URL)</label>
                <div className="flex gap-2">
                   <input 
                     type="text" 
                     value={formData.coverImage}
                     onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                     placeholder="https://images.unsplash.com/..."
                     className="flex-grow bg-obsidian border border-border-dim/30 p-3 text-xs font-mono text-text-high focus:outline-none focus:border-accent-orange"
                   />
                   <div className="w-10 h-10 bg-surface-200 border border-border-dim/30 flex items-center justify-center text-text-low">
                      <ImageIcon size={16} />
                   </div>
                </div>
             </div>

             <div>
                <label className="block text-[10px] font-mono text-text-low uppercase tracking-widest mb-2">Featured Engine</label>
                <label className="flex items-center gap-3 cursor-pointer group">
                   <div 
                     onClick={() => setFormData(prev => ({ ...prev, isFeatured: !prev.isFeatured }))}
                     className={`w-10 h-5 rounded-full relative transition-colors ${formData.isFeatured ? 'bg-accent-orange' : 'bg-border-dim/40'}`}
                   >
                     <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${formData.isFeatured ? 'translate-x-5' : 'translate-x-0'}`} />
                   </div>
                   <span className="text-[10px] font-mono uppercase text-text-low group-hover:text-white transition-colors">Mark as spotlight</span>
                </label>
             </div>
           </div>
        </div>

        <div className="bg-surface-100 border border-border-dim/20 p-8 rounded-sm text-text-high">
           <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-text-low mb-8 border-b border-border-dim/10 pb-4">
             SEO Protocols
           </h4>
           
           <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-mono text-text-low uppercase tracking-widest mb-2">Meta Title</label>
                <input 
                  type="text" 
                  value={formData.seoTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                  className="w-full bg-obsidian border border-border-dim/30 p-3 text-xs font-mono text-text-high focus:outline-none focus:border-accent-orange"
                />
             </div>
             <div>
                <label className="block text-[10px] font-mono text-text-low uppercase tracking-widest mb-2">Meta Description</label>
                <textarea 
                  rows={4}
                  value={formData.seoDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                  className="w-full bg-obsidian border border-border-dim/30 p-3 text-xs font-mono text-text-high focus:outline-none focus:border-accent-orange resize-none"
                />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
