import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.omastalo.co.za';
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'sitemap.xml');

// Based on typical academic website structure and observed navigation
const pages = [
  // Homepage
  { url: '/', changefreq: 'weekly' as const, priority: 1.0 },
  
  // Main navigation pages
  { url: '/about', changefreq: 'monthly' as const, priority: 0.9 },
  { url: '/services', changefreq: 'monthly' as const, priority: 0.9 },
  { url: '/events', changefreq: 'weekly' as const, priority: 0.9 },
  { url: '/blog', changefreq: 'weekly' as const, priority: 0.9 },
  { url: '/resources', changefreq: 'monthly' as const, priority: 0.9 },
  { url: '/contact', changefreq: 'monthly' as const, priority: 0.9 },
  
  // Secondary pages
  { url: '/testimonials', changefreq: 'monthly' as const, priority: 0.8 },
  { url: '/gallery', changefreq: 'monthly' as const, priority: 0.8 },
  { url: '/faq', changefreq: 'monthly' as const, priority: 0.7 },
  
  // Legal pages
  { url: '/terms', changefreq: 'yearly' as const, priority: 0.5 },
  { url: '/privacy', changefreq: 'yearly' as const, priority: 0.5 },
].map(page => ({
  ...page,
  url: `${SITE_URL}${page.url}`,
  lastMod: new Date().toISOString().split('T')[0]
}));

async function generateSitemap() {
  console.log('📄 Generating XML sitemap for OMASTALO');
  console.log('🌐 Site URL:', SITE_URL);
  console.log('📁 Output file:', OUTPUT_FILE);
  console.log(`\n📋 Including ${pages.length} pages:\n`);
  
  // Display pages being included
  pages.forEach((page, index) => {
    const url = page.url.replace(SITE_URL, '');
    console.log(`   ${index + 1}. [${page.priority.toFixed(1)}] ${url || '/'} (${page.changefreq})`);
  });
  
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
  
  console.log(`\n✅ Sitemap generated successfully!`);
  console.log(`\n📊 Statistics:`);
  console.log(`   Total URLs: ${pages.length}`);
  console.log(`   File size: ${fileSize} KB`);
  console.log(`   Last modified: ${pages[0].lastMod}`);
  
  console.log(`\n📄 Sitemap location: ${OUTPUT_FILE}`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Review the sitemap content below or at: ${OUTPUT_FILE}`);
  console.log(`   2. Upload sitemap.xml to your server at: ${SITE_URL}/sitemap.xml`);
  console.log(`   3. Update robots.txt to reference: ${SITE_URL}/sitemap.xml`);
  console.log(`   4. Submit to Google Search Console:`);
  console.log(`      - Visit: https://search.google.com/search-console`);
  console.log(`      - Select your property: omastalo.co.za`);
  console.log(`      - Go to: Sitemaps > Add a new sitemap`);
  console.log(`      - Enter: sitemap.xml`);
  console.log(`   5. Verify sitemap format: https://www.xml-sitemaps.com/validate-xml-sitemap.html`);
  console.log(`\n🔍 Sitemap Preview:`);
  console.log('─'.repeat(80));
  console.log(xml.toString());
  console.log('─'.repeat(80));
}

// Run the generator
generateSitemap().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
