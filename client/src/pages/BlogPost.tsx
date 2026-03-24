import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { type BlogPost as BlogPostType } from "@shared/schema";
import ReactMarkdown from "react-markdown";
import { Calendar, ArrowLeft, Calculator } from "lucide-react";
import { Link } from "wouter";
import NotFound from "./not-found";

const featuredTools = [
  { title: "Running Pace Calculator", path: "/running-pace-calculator", description: "Calculate pace, speed, distance, or time for any run." },
  { title: "Half Marathon Pace Calculator", path: "/half-marathon-pace-calculator", description: "Find your ideal half marathon pace and splits." },
  { title: "Training Pace Calculator", path: "/training-pace-calculator", description: "Get your easy, tempo, interval, and long run training paces." },
  { title: "Race Time Predictor", path: "/race-time-predictor", description: "Predict your finish time for any race distance." },
];

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";

  const { data: post, isLoading, error } = useQuery<BlogPostType>({
    queryKey: ["/api/posts", slug],
    enabled: !!slug,
  });

  useSEO({
    title: post?.title || "Blog Post",
    description: post?.metaDescription || "Read this article on Run Calculator Hub.",
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="space-y-2 mt-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-100 rounded w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return <NotFound />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Breadcrumbs
        crumbs={[
          { label: "Blog", path: "/blog" },
          { label: post.title },
        ]}
      />

      <article data-testid="blog-post-article">
        <header className="mb-8">
          <h1
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight"
            data-testid="blog-post-heading"
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.publishedAt ? new Date(post.publishedAt).toISOString() : ""}>
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </time>
          </div>
        </header>

        <div className="bg-white rounded-2xl border border-card-border p-6 sm:p-8" data-testid="blog-post-content">
          <div className="prose prose-sm sm:prose max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground prose-blockquote:border-primary/30 prose-blockquote:text-muted-foreground">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/blog">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline cursor-pointer" data-testid="link-back-to-blog">
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </span>
          </Link>
        </div>

        {/* Related Tools CTA */}
        <div className="mt-10 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Free Running Calculators</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-5">Put your training knowledge to work with our free pace tools — no signup required.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featuredTools.map((tool) => (
              <Link key={tool.path} href={tool.path}>
                <div className="bg-white rounded-xl border border-card-border p-4 hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer">
                  <div className="font-medium text-sm text-foreground mb-1">{tool.title}</div>
                  <div className="text-xs text-muted-foreground">{tool.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
