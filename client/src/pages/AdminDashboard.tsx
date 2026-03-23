import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSEO } from "@/hooks/use-seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { type BlogPost } from "@shared/schema";
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "wouter";

interface AdminDashboardProps {
  onLogout: () => void;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Admin Dashboard",
    description: "Manage blog posts for Run Calculator Hub.",
  });

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/posts"],
  });

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    onLogout();
  };

  if (creating || editing) {
    return (
      <PostEditor
        post={editing}
        onSave={() => {
          setEditing(null);
          setCreating(false);
          queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
        }}
        onCancel={() => {
          setEditing(null);
          setCreating(false);
        }}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="admin-dashboard-title">
            Blog Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {posts.length} post{posts.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setCreating(true)}
            className="rounded-full"
            data-testid="button-new-post"
          >
            <Plus className="w-4 h-4 mr-1" />
            New Post
          </Button>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="rounded-full"
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-card-border p-5 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-card-border p-10 text-center">
          <p className="text-muted-foreground mb-4">No blog posts yet.</p>
          <Button onClick={() => setCreating(true)} className="rounded-full" data-testid="button-create-first-post">
            <Plus className="w-4 h-4 mr-1" />
            Create Your First Post
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <PostRow
              key={post.id}
              post={post}
              onEdit={() => setEditing(post)}
              onTogglePublish={async () => {
                const newPublished = !post.published;
                await apiRequest("PATCH", `/api/admin/posts/${post.id}`, {
                  published: newPublished,
                  publishedAt: newPublished ? new Date().toISOString() : null,
                });
                queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
                toast({
                  title: newPublished ? "Post published" : "Post unpublished",
                });
              }}
              onDelete={async () => {
                if (!confirm("Delete this post? This cannot be undone.")) return;
                await apiRequest("DELETE", `/api/admin/posts/${post.id}`);
                queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
                toast({ title: "Post deleted" });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PostRow({
  post,
  onEdit,
  onTogglePublish,
  onDelete,
}: {
  post: BlogPost;
  onEdit: () => void;
  onTogglePublish: () => void;
  onDelete: () => void;
}) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString()
    : new Date(post.createdAt).toLocaleDateString();

  return (
    <div
      className="bg-white rounded-xl border border-card-border p-5 flex items-start justify-between gap-4"
      data-testid={`post-row-${post.id}`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-foreground truncate" data-testid={`post-title-${post.id}`}>
            {post.title}
          </h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              post.published
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
            data-testid={`post-status-${post.id}`}
          >
            {post.published ? "Published" : "Draft"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{post.metaDescription}</p>
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span>{date}</span>
          <span>/blog/{post.slug}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {post.published && (
          <Link href={`/blog/${post.slug}`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" data-testid={`button-view-${post.id}`}>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
        )}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onEdit} data-testid={`button-edit-${post.id}`}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onTogglePublish} data-testid={`button-toggle-${post.id}`}>
          {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive" onClick={onDelete} data-testid={`button-delete-${post.id}`}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function PostEditor({
  post,
  onSave,
  onCancel,
}: {
  post: BlogPost | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [content, setContent] = useState(post?.content || "");
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription || "");
  const [published, setPublished] = useState(post?.published || false);
  const [autoSlug, setAutoSlug] = useState(!post);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
      const data = {
        title,
        slug,
        content,
        metaDescription,
        published,
        publishedAt: published ? (post?.publishedAt || new Date().toISOString()) : null,
      };
      if (post) {
        await apiRequest("PATCH", `/api/admin/posts/${post.id}`, data);
      } else {
        await apiRequest("POST", "/api/admin/posts", data);
      }
    },
    onSuccess: () => {
      toast({ title: post ? "Post updated" : "Post created" });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      onSave();
    },
    onError: (err: Error) => {
      toast({ title: "Error saving post", description: err.message, variant: "destructive" });
    },
  });

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <button
        onClick={onCancel}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        data-testid="button-back-to-posts"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to posts
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-6" data-testid="editor-title">
        {post ? "Edit Post" : "New Post"}
      </h1>

      <div className="space-y-5">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title"
            data-testid="input-post-title"
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">/blog/</span>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setAutoSlug(false);
              }}
              placeholder="post-url-slug"
              data-testid="input-post-slug"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="metaDescription">Meta Description (for SEO)</Label>
          <Input
            id="metaDescription"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="Brief description for search engines"
            data-testid="input-post-meta"
          />
          <p className="text-xs text-muted-foreground mt-1">{metaDescription.length}/160 characters</p>
        </div>

        <div>
          <Label htmlFor="content">Content (Markdown)</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content in Markdown..."
            rows={20}
            className="font-mono text-sm"
            data-testid="input-post-content"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="rounded border-gray-300"
            data-testid="input-post-published"
          />
          <Label htmlFor="published" className="cursor-pointer">Publish immediately</Label>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending || !title || !slug || !content || !metaDescription}
            className="rounded-full px-6"
            data-testid="button-save-post"
          >
            {mutation.isPending ? "Saving..." : post ? "Update Post" : "Create Post"}
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            className="rounded-full"
            data-testid="button-cancel-edit"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
