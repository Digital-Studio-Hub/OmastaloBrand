import { db } from "../server/db";
import { blogPosts, users } from "../shared/schema";
import { eq } from "drizzle-orm";

async function seedBlogPosts() {
  console.log("Checking for admin user...");
  
  const adminUsers = await db.select().from(users).where(eq(users.isAdmin, true)).limit(1);
  
  if (adminUsers.length === 0) {
    console.error("No admin user found. Please create an admin user first using /api/auth/init-admin");
    process.exit(1);
  }
  
  const adminId = adminUsers[0].id;
  console.log(`Found admin user with ID: ${adminId}`);
  
  const existingPosts = await db.select().from(blogPosts).limit(1);
  if (existingPosts.length > 0) {
    console.log("Blog posts already exist in database. Skipping seed.");
    return;
  }
  
  console.log("Seeding blog posts...");
  
  const posts = [
    {
      title: "The Future of Mathematics Education in South Africa",
      slug: "future-of-mathematics-education",
      category: "mathematics",
      coverImage: "",
      excerpt: "Exploring innovative teaching methodologies and their profound impact on student success across diverse learning environments.",
      content: `<p>Mathematics education in South Africa stands at a critical juncture. As we navigate the complexities of modern educational challenges, innovative teaching methodologies are emerging as powerful tools to transform student success.</p>
      
<h2>The Current Landscape</h2>
<p>South African mathematics education faces unique challenges, from resource constraints to varying levels of preparedness among students. However, these challenges also present opportunities for innovation and growth.</p>

<h2>Innovative Approaches</h2>
<p>Modern teaching methodologies emphasize student-centered learning, practical application, and the integration of technology. These approaches have shown remarkable success in engaging students and improving outcomes across diverse learning environments.</p>

<h2>The Path Forward</h2>
<p>By embracing innovative teaching methods, providing adequate support for educators, and fostering a culture of continuous improvement, we can transform mathematics education and empower the next generation of South African students.</p>`,
      authorId: adminId,
      readTime: 5,
      status: "published",
      publishedAt: new Date("2025-02-10"),
    },
    {
      title: "Understanding Statistical Significance in Research",
      slug: "understanding-statistical-significance",
      category: "statistics",
      coverImage: "",
      excerpt: "A comprehensive guide to interpreting statistical results, avoiding common pitfalls, and applying best practices in research methodology.",
      content: `<p>Statistical significance is a cornerstone of research methodology, yet it remains one of the most misunderstood concepts in academic research. This guide aims to clarify this essential concept and help researchers apply it correctly.</p>

<h2>What is Statistical Significance?</h2>
<p>Statistical significance helps us determine whether observed differences or relationships in our data are likely due to chance or represent genuine patterns. Understanding this concept is crucial for drawing valid conclusions from research.</p>

<h2>Common Pitfalls</h2>
<p>Many researchers fall into common traps: confusing statistical significance with practical importance, p-hacking, and misinterpreting confidence intervals. Awareness of these pitfalls is the first step toward avoiding them.</p>

<h2>Best Practices</h2>
<p>Proper research design, transparent reporting, and considering effect sizes alongside p-values are essential practices for maintaining research integrity and producing reliable results.</p>`,
      authorId: adminId,
      readTime: 8,
      status: "published",
      publishedAt: new Date("2025-01-28"),
    },
    {
      title: "Building Resilience Through Life Orientation Programs",
      slug: "building-resilience-life-orientation",
      category: "life-orientation",
      coverImage: "",
      excerpt: "How structured life orientation programs help students develop emotional intelligence, resilience, and essential life skills for success.",
      content: `<p>In today's rapidly changing world, academic knowledge alone is insufficient for success. Students need well-developed life skills, emotional intelligence, and resilience to thrive both in their studies and beyond.</p>

<h2>The Role of Life Orientation</h2>
<p>Life Orientation programs provide structured opportunities for students to develop these critical skills. Through carefully designed activities and reflective practices, students learn to navigate challenges, manage stress, and build healthy relationships.</p>

<h2>Developing Emotional Intelligence</h2>
<p>Emotional intelligence—the ability to understand and manage one's emotions and empathize with others—is a key component of life orientation. Programs that focus on this area help students become more self-aware and socially competent.</p>

<h2>Building Resilience</h2>
<p>Resilience, the ability to bounce back from setbacks, is perhaps the most important life skill. Through structured programs, students learn coping strategies, develop problem-solving skills, and build the confidence to face challenges head-on.</p>`,
      authorId: adminId,
      readTime: 6,
      status: "published",
      publishedAt: new Date("2025-01-15"),
    },
    {
      title: "Effective Problem-Solving Strategies in Mathematics",
      slug: "effective-problem-solving-strategies",
      category: "mathematics",
      coverImage: "",
      excerpt: "Practical techniques and mental frameworks that help students approach mathematical problems with confidence and systematic thinking.",
      content: `<p>Problem-solving is at the heart of mathematics. Yet many students struggle not because they lack mathematical knowledge, but because they haven't developed effective problem-solving strategies.</p>

<h2>Understanding the Problem</h2>
<p>The first step in solving any mathematical problem is truly understanding what is being asked. This involves identifying given information, determining what needs to be found, and recognizing the type of problem at hand.</p>

<h2>Systematic Approaches</h2>
<p>Successful problem-solvers use systematic approaches: breaking complex problems into manageable parts, looking for patterns, working backwards from the desired result, and checking their work at each step.</p>

<h2>Building Confidence</h2>
<p>As students practice these strategies and experience success, their confidence grows. This positive cycle leads to improved performance and a more positive attitude toward mathematics.</p>`,
      authorId: adminId,
      readTime: 7,
      status: "published",
      publishedAt: new Date("2024-12-20"),
    },
    {
      title: "Data Visualization Best Practices for Academic Research",
      slug: "data-visualization-best-practices",
      category: "statistics",
      coverImage: "",
      excerpt: "Learn how to create compelling and accurate data visualizations that effectively communicate research findings to diverse audiences.",
      content: `<p>In the age of big data, the ability to visualize complex information clearly and accurately has become essential. Good data visualization transforms raw numbers into insights that can inform decisions and drive action.</p>

<h2>Principles of Effective Visualization</h2>
<p>Effective visualizations are clear, accurate, and appropriate for the data being presented. They help viewers understand patterns, trends, and relationships without distortion or unnecessary complexity.</p>

<h2>Choosing the Right Chart Type</h2>
<p>Different types of data call for different visualization approaches. Bar charts, line graphs, scatter plots, and heat maps each have their strengths. Understanding when to use each type is crucial for effective communication.</p>

<h2>Common Mistakes to Avoid</h2>
<p>Poor color choices, misleading scales, and chart junk can all undermine the effectiveness of visualizations. Being aware of these pitfalls helps researchers create more impactful graphics.</p>`,
      authorId: adminId,
      readTime: 6,
      status: "published",
      publishedAt: new Date("2024-12-05"),
    },
    {
      title: "Goal Setting and Achievement for Academic Success",
      slug: "goal-setting-academic-success",
      category: "life-orientation",
      coverImage: "",
      excerpt: "Evidence-based strategies for setting meaningful academic goals and developing the habits necessary to achieve them consistently.",
      content: `<p>Goal setting is a powerful tool for academic success, yet many students struggle to set effective goals or maintain the momentum needed to achieve them. Understanding the science of goal setting can transform academic performance.</p>

<h2>SMART Goals</h2>
<p>Effective goals are Specific, Measurable, Achievable, Relevant, and Time-bound. This framework helps students create goals that are clear enough to guide action and realistic enough to maintain motivation.</p>

<h2>Breaking Down Big Goals</h2>
<p>Large goals can feel overwhelming. Breaking them into smaller, manageable milestones creates a clear path forward and provides regular opportunities for success and positive reinforcement.</p>

<h2>Building Supportive Habits</h2>
<p>Goals without supporting habits are difficult to achieve. Successful students develop daily routines and practices that align with their goals, making progress feel natural and sustainable.</p>

<h2>Monitoring and Adjustment</h2>
<p>Regular reflection on progress allows students to celebrate achievements, identify obstacles, and adjust their approach as needed. This iterative process is key to long-term success.</p>`,
      authorId: adminId,
      readTime: 5,
      status: "published",
      publishedAt: new Date("2024-11-18"),
    },
  ];
  
  await db.insert(blogPosts).values(posts);
  
  console.log(`Successfully seeded ${posts.length} blog posts!`);
}

seedBlogPosts()
  .then(() => {
    console.log("Seed completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
