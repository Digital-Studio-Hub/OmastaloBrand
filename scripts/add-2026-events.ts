import { db } from "../server/db";
import { events } from "../shared/schema";

async function add2026Events() {
  const eventsData = [
    {
      title: "Annual Research Symposium",
      slug: "annual-research-symposium-2026",
      description: "Join us for our annual research symposium featuring groundbreaking studies and collaborative discussions among leading researchers.",
      category: "Symposium",
      eventDate: new Date("2026-02-10T09:00:00"),
      location: "Tshwane, South Africa",
      capacity: 150,
      coverImage: null,
    },
    {
      title: "Graduate Mentorship Workshop",
      slug: "graduate-mentorship-workshop-2026",
      description: "A comprehensive workshop focused on mentoring graduate students and providing guidance for academic excellence.",
      category: "Workshop",
      eventDate: new Date("2026-03-05T10:00:00"),
      location: "Tshwane, South Africa",
      capacity: 80,
      coverImage: null,
    },
    {
      title: "Innovation and Technology Summit",
      slug: "innovation-technology-summit-2026",
      description: "Explore cutting-edge innovations and technological advancements in academic research and education.",
      category: "Summit",
      eventDate: new Date("2026-04-20T09:00:00"),
      location: "Tshwane, South Africa",
      capacity: 200,
      coverImage: null,
    },
    {
      title: "Young Scholars Conference",
      slug: "young-scholars-conference-2026",
      description: "A platform for emerging scholars to present their research and connect with experienced academics.",
      category: "Conference",
      eventDate: new Date("2026-05-15T09:00:00"),
      location: "Tshwane, South Africa",
      capacity: 120,
      coverImage: null,
    },
    {
      title: "Data Science and Analytics Forum",
      slug: "data-science-analytics-forum-2026",
      description: "Dive deep into data science methodologies, statistical analysis, and practical applications in research.",
      category: "Forum",
      eventDate: new Date("2026-06-10T10:00:00"),
      location: "Tshwane, South Africa",
      capacity: 100,
      coverImage: null,
    },
    {
      title: "Academic Writing Bootcamp",
      slug: "academic-writing-bootcamp-2026",
      description: "Intensive training program focused on developing strong academic writing skills and publication strategies.",
      category: "Bootcamp",
      eventDate: new Date("2026-07-25T09:00:00"),
      location: "Tshwane, South Africa",
      capacity: 60,
      coverImage: null,
    },
    {
      title: "African Economic Research Dialogue",
      slug: "african-economic-research-dialogue-2026",
      description: "A dialogue on economic research frameworks and their impact on African development and growth.",
      category: "Dialogue",
      eventDate: new Date("2026-08-16T10:00:00"),
      location: "Tshwane, South Africa",
      capacity: 90,
      coverImage: null,
    },
    {
      title: "Health and Social Sciences Seminar",
      slug: "health-social-sciences-seminar-2026",
      description: "Examining the intersection of health sciences and social research for community impact.",
      category: "Seminar",
      eventDate: new Date("2026-09-12T09:00:00"),
      location: "Tshwane, South Africa",
      capacity: 100,
      coverImage: null,
    },
    {
      title: "1st Anniversary of Doctorate Celebration",
      slug: "doctorate-anniversary-celebration-2026",
      description: "Celebrating one year since Dr. Kgarimetsa's doctorate achievement with reflections on academic milestones and future vision.",
      category: "Celebration",
      eventDate: new Date("2026-10-18T14:00:00"),
      location: "Tshwane, South Africa",
      capacity: 200,
      coverImage: null,
    },
    {
      title: "Closing Gala and Awards Ceremony",
      slug: "closing-gala-awards-2026",
      description: "An elegant evening celebrating academic achievements, recognizing outstanding scholars, and looking ahead to 2027.",
      category: "Gala",
      eventDate: new Date("2026-11-09T18:00:00"),
      location: "Tshwane, South Africa",
      capacity: 250,
      coverImage: null,
    },
  ];

  try {
    console.log("Adding 2026 events to database...");
    
    for (const event of eventsData) {
      await db.insert(events).values(event);
      console.log(`✓ Added: ${event.title}`);
    }
    
    console.log("\nSuccessfully added all 2026 events!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding events:", error);
    process.exit(1);
  }
}

add2026Events();
