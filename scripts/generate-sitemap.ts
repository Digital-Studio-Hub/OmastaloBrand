import SitemapGenerator from 'sitemap-generator';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.omastalo.co.za';
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'sitemap.xml');

console.log('🕷️  Starting sitemap generation for:', SITE_URL);
console.log('📁 Output file:', OUTPUT_FILE);

// Ensure public directory exists
const publicDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create sitemap generator
const generator = SitemapGenerator(SITE_URL, {
  stripQuerystring: true,        // Remove query strings
  maxDepth: 0,                   // No depth limit (crawl all pages)
  filepath: OUTPUT_FILE,
  maxEntriesPerFile: 50000,      // Max 50k URLs per sitemap file
  priorityMap: [1.0, 0.8, 0.6],  // Priority by depth: homepage=1.0, level1=0.8, level2+=0.6
  changeFreq: 'weekly',          // Default change frequency
  lastMod: true,                 // Include last modified dates
  respectRobotsTxt: true,        // Respect robots.txt
});

// Event: When crawler fetches a URL
generator.on('fetch', ({ url, status }) => {
  console.log(`✓ Fetched [${status}]: ${url}`);
});

// Event: When crawler ignores a URL
generator.on('ignore', ({ url, reason }) => {
  console.log(`⊘ Ignored [${reason}]: ${url}`);
});

// Event: When an error occurs
generator.on('error', (error) => {
  console.error('❌ Error:', error);
});

// Event: When sitemap generation is complete
generator.on('done', () => {
  console.log('\n✅ Sitemap generation complete!');
  console.log(`📄 Sitemap saved to: ${OUTPUT_FILE}`);
  
  // Read and display statistics
  const sitemap = fs.readFileSync(OUTPUT_FILE, 'utf8');
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  const fileSize = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2);
  
  console.log(`\n📊 Statistics:`);
  console.log(`   Total URLs: ${urlCount}`);
  console.log(`   File size: ${fileSize} KB`);
  console.log(`\n🌐 Sitemap URL: ${SITE_URL}/sitemap.xml`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Upload sitemap.xml to your server at: ${SITE_URL}/sitemap.xml`);
  console.log(`   2. Verify at: https://search.google.com/search-console`);
  console.log(`   3. Submit sitemap URL to Google Search Console`);
});

// Start crawling
console.log('\n🚀 Starting crawler...\n');
generator.start();
