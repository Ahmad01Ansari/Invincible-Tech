import { Container } from "@/components/ui/Container";
import { getBlogs } from "../actions/blog";
import { InsightsHero } from "@/components/blog/InsightsHero";
import { FeaturedSpotlight } from "@/components/blog/FeaturedSpotlight";
import { InsightCard } from "@/components/blog/InsightCard";
import { CategoryNavigation } from "@/components/blog/CategoryNavigation";
import { InsightsSidebar } from "@/components/blog/InsightsSidebar";
import { ReadingStats } from "@/components/blog/ReadingStats";
import { NewsletterSection } from "@/components/blog/NewsletterSection";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Flame, TrendingUp, Award, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Engineering Insights | Invinsible Tech Blog",
  description: "Advanced architectural blueprints, AI system deployment strategies, and modernization protocols.",
};

export default async function BlogPage(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;
  const category = searchParams.category || "all";
  const query = searchParams.q || "";

  const { data: allBlogs = [] } = await getBlogs({ filter: { status: "published" } });

  // 1. Featured Blog
  const featuredBlog = allBlogs.find((b: any) => b.isFeatured) || allBlogs[0];

  // 2. Trending Blogs (Most Viewed)
  const trendingBlogs = [...allBlogs]
    .sort((a: any, b: any) => (b.views || 0) - (a.views || 0))
    .slice(0, 3);

  // 3. Filtered Latest Blogs
  const filteredBlogs = allBlogs.filter((blog: any) => {
    const matchesCategory = category === "all" || blog.category.toLowerCase().includes(category.toLowerCase());
    const matchesQuery = !query || 
      blog.title.toLowerCase().includes(query.toLowerCase()) || 
      blog.shortDescription.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery && blog._id !== featuredBlog?._id;
  });

  return (
    <main className="bg-obsidian min-h-screen">
      <ReadingProgressBar />
      
      {/* 1. Hero Section */}
      <InsightsHero />

      {/* 2. Featured Article Section */}
      <ScrollReveal>
        {featuredBlog && <FeaturedSpotlight blog={featuredBlog} />}
      </ScrollReveal>

      <Container>
        {/* 3. Category Tabs */}
        <ScrollReveal>
          <CategoryNavigation activeCategory={category} />
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-16 pb-32">
          
          {/* Main Content: Latest Posts */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Trending Quick View (Optional inline section) */}
            <div className="bg-surface-100/50 border border-white/5 p-8 rounded-3xl mb-20 relative overflow-hidden group">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-sm font-mono text-accent-orange uppercase tracking-[0.4em] flex items-center gap-3">
                     <Flame size={16} /> TRENDING_OPERATIONS
                  </h3>
                  <Link href="#trending" className="text-[10px] font-mono text-text-low hover:text-white transition-colors">
                     VIEW_ALL_METRICS
                  </Link>
               </div>
               <div className="space-y-6">
                  {trendingBlogs.map((blog: any, i: number) => (
                    <Link key={blog._id} href={`/blog/${blog.slug}`} className="flex items-center gap-6 group/item py-4 border-b border-white/5 last:border-0">
                       <span className="text-2xl font-display font-bold text-white/10 group-hover/item:text-accent-orange transition-colors">
                          0{i + 1}
                       </span>
                       <div className="flex-grow">
                          <h4 className="text-sm font-bold text-white group-hover/item:text-accent-orange transition-colors line-clamp-1">
                             {blog.title}
                          </h4>
                          <span className="text-[9px] font-mono text-text-low uppercase tracking-widest mt-1 block">
                             {blog.category} • {blog.views || 0}_VIEWS
                          </span>
                       </div>
                       <TrendingUp size={16} className="text-accent-orange opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </Link>
                  ))}
               </div>
            </div>

            {/* Latest Grid */}
            <div className="flex items-center gap-4 mb-12">
               <div className="h-[1px] flex-grow bg-white/5" />
               <h2 className="text-[10px] font-mono text-text-low uppercase tracking-[0.5em] whitespace-nowrap">
                  LATEST_TRANSMISSIONS
               </h2>
               <div className="h-[1px] flex-grow bg-white/5" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {filteredBlogs.map((blog: any, i: number) => (
                <InsightCard key={blog._id} blog={blog} index={i} />
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div className="py-40 text-center border border-white/5 bg-surface-100/50 rounded-3xl">
                <p className="text-text-low font-mono text-xs uppercase tracking-[0.4em] opacity-40">
                   NO_COINCIDENT_DATA_FOUND_IN_CLUSTER.
                </p>
              </div>
            )}

            {/* Pagination / Load More Button */}
            {filteredBlogs.length > 0 && (
               <div className="flex justify-center pt-12">
                  <button className="px-10 py-5 bg-white/5 border border-white/10 text-[10px] font-bold text-white uppercase tracking-[0.4em] hover:bg-accent-orange hover:text-obsidian hover:border-accent-orange transition-all duration-300 rounded-full">
                     LOAD_MORE_ASSETS
                  </button>
               </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <InsightsSidebar />
          </div>
        </div>
      </Container>

      {/* 4. Reading Stats Counter Section */}
      <ScrollReveal>
        <ReadingStats />
      </ScrollReveal>

      {/* 5. Editor's Picks (Special Layout) */}
      <section className="py-32 bg-surface-100/20 border-t border-white/5">
         <Container>
            <ScrollReveal>
               <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16 px-6">
                  <div className="max-w-xl">
                     <span className="text-[10px] font-mono text-accent-orange uppercase tracking-[0.4em] mb-4 block">Selected_By_Architects</span>
                     <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tighter leading-none">
                        Editor&apos;s <br/> 
                        <span className="text-accent-orange italic">Masterworks.</span>
                     </h2>
                  </div>
                  <p className="text-text-low font-mono text-xs max-w-sm mb-2 opacity-60">
                     Manual selection of high-priority research and architectural blueprints that define our current engineering epoch.
                  </p>
               </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
               {allBlogs.slice(0, 3).map((blog: any, i: number) => (
                 <ScrollReveal key={blog._id}>
                   <Link href={`/blog/${blog.slug}`} className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 shadow-2xl block">
                      <Image 
                        src={blog.coverImage} 
                        alt={blog.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-40 group-hover:opacity-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                      
                      <div className="absolute bottom-8 left-8 right-8">
                         <div className="w-12 h-1 bg-accent-orange mb-6 group-hover:w-full transition-all duration-700" />
                         <span className="text-[9px] font-mono text-accent-orange uppercase tracking-widest mb-4 block">#PROTO_{i+1}</span>
                         <h3 className="text-xl font-display font-medium text-white group-hover:text-accent-orange transition-colors leading-tight mb-4">
                            {blog.title}
                         </h3>
                         <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="text-[10px] font-mono text-text-low uppercase">{blog.author}</span>
                            <Award size={14} className="text-accent-orange" />
                         </div>
                      </div>
                   </Link>
                 </ScrollReveal>
               ))}
            </div>
         </Container>
      </section>

      {/* 6. Newsletter Section */}
      <ScrollReveal>
        <NewsletterSection />
      </ScrollReveal>
      
    </main>
  );
}
