import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import { storage } from "./storage";
import { insertBlogPostSchema } from "@shared/schema";

const DOMAIN = "https://runcalculatorhub.com";

if (!process.env.ADMIN_PASSWORD) {
  throw new Error("ADMIN_PASSWORD environment variable must be set");
}
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const pages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/tools", priority: "0.9", changefreq: "weekly" },
  { path: "/blog", priority: "0.9", changefreq: "daily" },
  { path: "/marathon-pace-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/half-marathon-pace-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/5k-pace-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/10k-pace-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/running-pace-calculator", priority: "0.9", changefreq: "monthly" },
  { path: "/race-time-predictor", priority: "0.8", changefreq: "monthly" },
  { path: "/training-pace-calculator", priority: "0.8", changefreq: "monthly" },
  { path: "/running-pace-converter", priority: "0.8", changefreq: "monthly" },
  { path: "/split-calculator", priority: "0.8", changefreq: "monthly" },
  { path: "/pace-charts", priority: "0.8", changefreq: "monthly" },
  { path: "/pace-charts/5k-pace-chart", priority: "0.8", changefreq: "monthly" },
  { path: "/pace-charts/10k-pace-chart", priority: "0.8", changefreq: "monthly" },
  { path: "/pace-charts/half-marathon-pace-chart", priority: "0.8", changefreq: "monthly" },
  { path: "/pace-charts/marathon-pace-chart", priority: "0.8", changefreq: "monthly" },
  { path: "/about", priority: "0.5", changefreq: "monthly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
];

async function buildSitemap(): Promise<string> {
  const today = new Date().toISOString().split("T")[0];
  const staticUrls = pages
    .map(
      (p) => `  <url>
    <loc>${DOMAIN}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join("\n");

  const posts = await storage.getAllPosts(true);
  const blogUrls = posts
    .map(
      (post) => `  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${(post.updatedAt || post.publishedAt || post.createdAt).toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${blogUrls}
</urlset>`;
}

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session && (req.session as any).isAdmin) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const PgStore = ConnectPgSimple(session);

  app.use(
    session({
      store: new PgStore({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: false,
      }),
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    })
  );

  app.get("/sitemap.xml", async (_req, res) => {
    res.header("Content-Type", "application/xml");
    res.send(await buildSitemap());
  });

  app.get("/robots.txt", (_req, res) => {
    res.header("Content-Type", "text/plain");
    res.send(robotsTxt);
  });

  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      (req.session as any).isAdmin = true;
      return res.json({ success: true });
    }
    return res.status(401).json({ message: "Invalid password" });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/check", (req, res) => {
    if (req.session && (req.session as any).isAdmin) {
      return res.json({ authenticated: true });
    }
    return res.json({ authenticated: false });
  });

  app.get("/api/admin/posts", requireAdmin, async (_req, res) => {
    try {
      const posts = await storage.getAllPosts(false);
      res.json(posts);
    } catch (e: any) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/admin/posts/:id", requireAdmin, async (req, res) => {
    try {
      const post = await storage.getPostById(Number(req.params.id));
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (e: any) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  app.post("/api/admin/posts", requireAdmin, async (req, res) => {
    try {
      const data = insertBlogPostSchema.parse(req.body);
      const post = await storage.createPost(data);
      res.status(201).json(post);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  });

  app.patch("/api/admin/posts/:id", requireAdmin, async (req, res) => {
    try {
      const body = { ...req.body };
      if (body.publishedAt && typeof body.publishedAt === "string") {
        body.publishedAt = new Date(body.publishedAt);
      }
      if (body.publishedAt === null) {
        body.publishedAt = null;
      }
      const updateSchema = insertBlogPostSchema.partial();
      const data = updateSchema.parse(body);
      const post = await storage.updatePost(Number(req.params.id), data);
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  });

  app.delete("/api/admin/posts/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deletePost(Number(req.params.id));
      if (!deleted) return res.status(404).json({ message: "Post not found" });
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  app.get("/api/posts", async (_req, res) => {
    try {
      const posts = await storage.getAllPosts(true);
      res.json(posts);
    } catch (e: any) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getPostBySlug(req.params.slug);
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (e: any) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  return httpServer;
}
