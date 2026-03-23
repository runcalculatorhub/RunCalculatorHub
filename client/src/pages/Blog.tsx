import { useQuery } from "@tanstack/react-query";
import { useSEO } from "@/hooks/use-seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { type BlogPost } from "@shared/schema";
import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";

export default function Blog() {
  useSEO({
    title: "Running Blog - Tips, Training & Race Strategy",
    description: "Expert running tips, training advice, race strategy guides, and more from Run Calculator Hub.",
  });

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts"],
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Breadcrumbs crumbs={[{ label: "Blog" }]} />

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" data-testid="blog-title">
          Running Blog
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Tips, training advice, and race strategy guides to help you run your best.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-card-border p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-2/3 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-card-border p-10 text-center">
          <p className="text-muted-foreground" data-testid="blog-empty">
            No blog posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article
                className="group bg-white rounded-2xl border border-card-border p-6 cursor-pointer hover:border-primary/20 hover:shadow-sm transition-all"
                data-testid={`blog-card-${post.id}`}
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar className="w-3.5 h-3.5" />
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
                <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors" data-testid={`blog-post-title-${post.id}`}>
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {post.metaDescription}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read more
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
