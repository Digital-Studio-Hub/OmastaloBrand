import { chromium } from 'playwright';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.omastalo.co.za';
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'sitemap.xml');

interface CrawledPage {
  url: string;
  lastMod?: Date;
  changefreq?: string;
  priority: number;
}

const visitedUrls = new Set<string>();
const pages: CrawledPage[] = [];

function normalizeUrl(url: string, baseUrl: string): string {
  try {
    const urlObj = new URL(url, baseUrl);
    // Remove query strings and hash
    urlObj.search = '';
    urlObj.hash = '';
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

function calculatePriority(url: string, baseUrl: string): number {
  const urlObj = new URL(url);
  const path = urlObj.pathname;
  
  // Homepage
  if (path === '/' || path === '') return 1.0;
  
  // Main pages
  const mainPages = ['/about', '/services', '/events', '/blog', '/contact', '/resources'];
  if (mainPages.includes(path)) return 0.9;
  
  // Secondary pages
  const depth = path.split('/').filter(p => p).length;
  if (depth === 1) return 0.8;
  if (depth === 2) return 0.6;
  
  return 0.5;
}

async function crawlPage(browser: any, url: string, baseUrl: string, maxDepth: number, currentDepth: number = 0) {
  if (currentDepth > maxDepth || visitedUrls.has(url)) {
    return;
  }

  console.log(`🔍 Crawling [depth: ${currentDepth}]: ${url}`);
  visitedUrls.add(url);

  try {
    const page = await browser.newPage();
    
    // Set user agent to avoid being blocked
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    const response = await page.goto(url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });

    if (!response || response.status() !== 200) {
      console.log(`⚠️  Skipped [status: ${response?.status() || 'N/A'}]: ${url}`);
      await page.close();
      return;
    }

    // Add page to sitemap
    pages.push({
      url: url,
      lastMod: new Date(),
      changefreq: 'weekly',
      priority: calculatePriority(url, baseUrl)
    });

    console.log(`✓ Added to sitemap: ${url}`);

    // Extract links if within max depth
    if (currentDepth < maxDepth) {
      const links = await page.$$eval('a[href]', (anchors: HTMLAnchorElement[]) => 
        anchors.map(a => a.href)
      );

      const internalLinks = links
        .map(link => normalizeUrl(link, baseUrl))
        .filter(link => link && isInternalUrl(link, baseUrl) && !visitedUrls.has(link));

      // Remove duplicates
      const uniqueLinks = [...new Set(internalLinks)];

      console.log(`   Found ${uniqueLinks.length} new internal links`);

      // Crawl linked pages (sequential to avoid overwhelming the server)
      for (const link of uniqueLinks.slice(0, 50)) { // Limit to 50 links per page
        await crawlPage(browser, link, baseUrl, maxDepth, currentDepth + 1);
      }
    }

    await page.close();
  } catch (error) {
    console.error(`❌ Error crawling ${url}:`, error.message);
  }
}

async function generateSitemap() {
  console.log('🕷️  Starting advanced sitemap generation with Playwright');
  console.log('🌐 Target URL:', SITE_URL);
  console.log('📁 Output file:', OUTPUT_FILE);
  console.log('\n🚀 Launching browser...\n');

  const browser = await chromium.launch({ headless: true });

  try {
    // Start crawling from the homepage
    await crawlPage(browser, SITE_URL, SITE_URL, 3); // Max depth of 3

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
    console.log(`\n📋 URLs included:`);
    
    pages.forEach((page, index) => {
      if (index < 20) { // Show first 20 URLs
        console.log(`   ${index + 1}. ${page.url} (priority: ${page.priority})`);
      }
    });
    
    if (pages.length > 20) {
      console.log(`   ... and ${pages.length - 20} more`);
    }

    console.log(`\n✅ Sitemap saved to: ${OUTPUT_FILE}`);
    console.log(`\n📋 Next steps:`);
    console.log(`   1. Review the sitemap at: ${OUTPUT_FILE}`);
    console.log(`   2. Upload sitemap.xml to ${SITE_URL}/sitemap.xml`);
    console.log(`   3. Submit to Google Search Console: https://search.google.com/search-console`);
    console.log(`   4. Verify sitemap: https://www.xml-sitemaps.com/validate-xml-sitemap.html`);

  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    await browser.close();
  }
}

// Run the crawler
generateSitemap().catch(console.error);
