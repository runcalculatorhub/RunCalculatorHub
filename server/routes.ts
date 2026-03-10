import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const DOMAIN = "https://runcalculatorhub.com";

const pages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/tools", priority: "0.9", changefreq: "weekly" },
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

function buildSitemap(): string {
  const today = new Date().toISOString().split("T")[0];
  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${DOMAIN}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/sitemap.xml", (_req, res) => {
    res.header("Content-Type", "application/xml");
    res.send(buildSitemap());
  });

  app.get("/robots.txt", (_req, res) => {
    res.header("Content-Type", "text/plain");
    res.send(robotsTxt);
  });

  return httpServer;
}
