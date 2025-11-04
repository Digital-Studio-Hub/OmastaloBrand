import axios from 'axios';
import { load } from 'cheerio';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.omastalo.co.za';
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'sitemap.xml');
const MAX_DEPTH = 3;
const MAX_PAGES = 100;

interface CrawledPage {
  url: string;
  lastMod?: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const visitedUrls = new Set<string>();
const pages: CrawledPage[] = [];
const urlQueue: Array<{ url: string; depth: number }> = [];

function normalizeUrl(url: string, baseUrl: string): string {
  try {
    const urlObj = new URL(url, baseUrl);
    // Remove query strings, hash, and trailing slash
    urlObj.search = '';
    urlObj.hash = '';
    let path = urlObj.pathname;
    if (path.endsWith('/') && path.length > 1) {
      path = path.slice(0, -1);
    }
    urlObj.pathname = path;
    return urlObj.href;
  } catch {
    return '';
  }
}

function isInternalUrl(url: string, baseUrl: string): boolean {
  try {
    const urlObj = new URL(url, baseUrl);
    const baseUrlObj = new URL(baseUrl);
    return urlObj.hostname === baseUrlObj.hostname;
  } catch {
    return false;
  }
}

function calculatePriority(url: string): number {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  
  // Homepage
  if (pathname === '/' || pathname === '') return 1.0;
  
  // Main navigation pages
  const mainPages = ['/about', '/services', '/events', '/blog', '/contact', '/resources', '/testimonials', '/gallery'];
  if (mainPages.some(page => pathname === page || pathname === `${page}/`)) return 0.9;
  
  // Secondary pages
  const depth = pathname.split('/').filter(p => p).length;
  if (depth === 1) return 0.8;
  if (depth === 2) return 0.6;
  
  return 0.5;
}

function getChangeFreq(url: string): CrawledPage['changefreq'] {
  const pathname = new URL(url).pathname;
  
  if (pathname === '/' || pathname === '') return 'weekly';
  if (pathname.includes('/blog')) return 'weekly';
  if (pathname.includes('/events')) return 'weekly';
  if (pathname.includes('/about') || pathname.includes('/services')) return 'monthly';
  
  return 'weekly';
}

async function fetchPage(url: string): Promise<string | null> {
  try {
    const response = await axios.get(url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      maxRedirects: 5,
      validateStatus: (status) => status === 200
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(`⚠️  Failed to fetch [${error.response?.status || 'N/A'}]: ${url}`);
    } else {
      console.log(`⚠️  Error fetching: ${url}`);
    }
    return null;
  }
}

function extractLinks(html: string, baseUrl: string): string[] {
  const $ = load(html);
  const links: string[] = [];
  
  $('a[href]').each((_, element) => {
    const href = $(element).attr('href');
    if (href) {
      const normalizedUrl = normalizeUrl(href, baseUrl);
      if (normalizedUrl && isInternalUrl(normalizedUrl, baseUrl)) {
        links.push(normalizedUrl);
      }
    }
  });
  
  return [...new Set(links)]; // Remove duplicates
}

async function crawlSite() {
  console.log('🕷️  Starting sitemap generation with Axios + Cheerio');
  console.log('🌐 Target URL:', SITE_URL);
  console.log('📁 Output file:', OUTPUT_FILE);
  console.log(`⚙️  Settings: Max depth = ${MAX_DEPTH}, Max pages = ${MAX_PAGES}\n`);
  
  // Start with homepage
  urlQueue.push({ url: SITE_URL, depth: 0 });
  
  while (urlQueue.length > 0 && pages.length < MAX_PAGES) {
    const { url, depth } = urlQueue.shift()!;
    
    if (visitedUrls.has(url) || depth > MAX_DEPTH) {
      continue;
    }
    
    console.log(`🔍 Crawling [depth: ${depth}, queued: ${urlQueue.length}]: ${url}`);
    visitedUrls.add(url);
    
    const html = await fetchPage(url);
    if (!html) {
      continue;
    }
    
    // Add page to sitemap
    pages.push({
      url: url,
      lastMod: new Date().toISOString().split('T')[0],
      changefreq: getChangeFreq(url),
      priority: calculatePriority(url)
    });
    
    console.log(`✓ Added to sitemap [priority: ${calculatePriority(url)}]`);
    
    // Extract and queue links for next depth level
    if (depth < MAX_DEPTH) {
      const links = extractLinks(html, SITE_URL);
      const newLinks = links.filter(link => !visitedUrls.has(link));
      
      console.log(`   Found ${newLinks.length} new internal links`);
      
      // Add to queue for crawling
      newLinks.forEach(link => {
        urlQueue.push({ url: link, depth: depth + 1 });
      });
    }
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n✅ Crawling complete! Found ${pages.length} pages.\n`);
  
  // Sort pages by priority (descending)
  pages.sort((a, b) => b.priority - a.priority);
  
  // Generate sitemap XML
  const stream = new SitemapStream({ hostname: SITE_URL });
  const xml = await streamToPromise(Readable.from(pages).pipe(stream));
  
  // Ensure public directory exists
  const publicDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write sitemap to file
  fs.writeFileSync(OUTPUT_FILE, xml.toString());
  
  const fileSize = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2);
  
  console.log('📄 Sitemap generated successfully!');
  console.log(`\n📊 Statistics:`);
  console.log(`   Total URLs: ${pages.length}`);
  console.log(`   File size: ${fileSize} KB`);
  console.log(`\n📋 URLs included (sorted by priority):`);
  
  pages.forEach((page, index) => {
    console.log(`   ${index + 1}. [${page.priority.toFixed(1)}] ${page.url}`);
  });
  
  console.log(`\n✅ Sitemap saved to: ${OUTPUT_FILE}`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Review the sitemap at: ${OUTPUT_FILE}`);
  console.log(`   2. Upload sitemap.xml to ${SITE_URL}/sitemap.xml`);
  console.log(`   3. Submit to Google Search Console: https://search.google.com/search-console`);
  console.log(`   4. Verify sitemap: https://www.xml-sitemaps.com/validate-xml-sitemap.html`);
}

// Run the crawler
crawlSite().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
