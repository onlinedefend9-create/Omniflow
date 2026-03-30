import Navbar from "@/components/Navbar";
import { ArrowLeft, Calendar, User, Share2, Zap } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

// Simulated getPostBySlug() function
const getPostBySlug = (slug: string) => {
  const posts = [
    {
      title: "How to Boost Your TikTok Reach in 2026",
      slug: "boost-reach-tiktok-2026",
      content: `
        <p>TikTok has become the essential platform for content creators. In 2026, the algorithm has evolved to prioritize quality and authentic engagement.</p>
        <h2>1. Use Trends Sparingly</h2>
        <p>Don't just copy what others are doing. Bring your own creative touch to stand out.</p>
        <h2>2. Multi-Publishing with OneFlow</h2>
        <p>By broadcasting your TikTok content to YouTube Shorts and Instagram Reels, you multiply your chances of going viral.</p>
        <h2>3. The Importance of the First Few Seconds</h2>
        <p>The "hook" is crucial. You have less than 2 seconds to capture the user's attention.</p>
      `,
      date: "March 28, 2026",
      author: "Alex OneFlow",
      image: "https://picsum.photos/seed/tiktok/1200/600",
      category: "Strategy"
    },
    {
      title: "The Importance of Multi-Publishing for Creators",
      slug: "importance-multi-publication",
      content: `
        <p>Distributing your content across multiple platforms has become essential for survival as a creator.</p>
        <h2>1. Diversify Your Audience</h2>
        <p>Each platform has its own unique audience. By being present everywhere, you reach a wider demographic.</p>
        <h2>2. Risk Mitigation</h2>
        <p>Don't put all your eggs in one basket. If one platform changes its algorithm, you still have others.</p>
        <h2>3. Brand Consistency</h2>
        <p>Maintain a consistent brand image across all platforms with OneFlow's unified publishing engine.</p>
      `,
      date: "March 25, 2026",
      author: "Sarah Digital",
      image: "https://picsum.photos/seed/social/1200/600",
      category: "Growth"
    },
    {
      title: "YouTube Shorts vs Instagram Reels: Which to Choose?",
      slug: "shorts-vs-reels-2026",
      content: `
        <p>A comparative analysis of the two leading short-form video formats and how OneFlow helps you dominate both.</p>
        <h2>1. Monetization Potential</h2>
        <p>YouTube Shorts offers a direct revenue share, while Instagram Reels focuses more on brand partnerships.</p>
        <h2>2. Content Discovery</h2>
        <p>YouTube's search engine is powerful for long-term discovery, whereas Reels relies heavily on the Explore feed.</p>
        <h2>3. The OneFlow Advantage</h2>
        <p>Why choose? Use OneFlow to publish to both and maximize your global impact.</p>
      `,
      date: "March 22, 2026",
      author: "Marc Tech",
      image: "https://picsum.photos/seed/video/1200/600",
      category: "Analysis"
    }
  ];
  return posts.find(p => p.slug === slug) || posts[0];
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: `${post.title} | OneFlow Blog`,
    description: post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
      url: `https://oneflow.site/blog/${post.slug}`,
      type: "article",
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "OneFlow",
      "logo": {
        "@type": "ImageObject",
        "url": "https://oneflow.site/logo.png"
      }
    },
    "description": post.content.substring(0, 160).replace(/<[^>]*>/g, '')
  };

  return (
    <div className="min-h-screen text-slate-200 font-sans relative">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="max-w-4xl mx-auto pt-48 pb-32 px-6 space-y-16 relative z-10">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-accent transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
          Back to Stream
        </Link>

        <article className="space-y-16">
          <header className="space-y-10">
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                {post.author}
              </div>
              <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white">
                {post.category}
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-[0.9]">
              <span className="shiny-text">{post.title}</span>
            </h1>
            <div className="aspect-video w-full rounded-[60px] overflow-hidden border border-white/5 relative shadow-2xl shadow-accent/10">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/60 to-transparent" />
            </div>
          </header>

          <div 
            className="prose prose-invert prose-sky max-w-none text-slate-300 text-xl leading-relaxed space-y-10 font-medium"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Share Impact:</span>
              <div className="flex gap-4">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://oneflow.site/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass-card rounded-2xl hover:text-accent transition-all border border-white/5 flex items-center justify-center"
                >
                  <Share2 className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 glass-card rounded-3xl border border-white/5">
              <Zap className="w-6 h-6 text-accent fill-accent" />
              <p className="text-sm font-bold text-white uppercase tracking-widest">Powered by OneFlow Engine</p>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}
