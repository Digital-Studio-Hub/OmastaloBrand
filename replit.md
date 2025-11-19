# OMASTALO - Academic Personal Brand Website

## Overview

OMASTALO (Organization for Mathematics, Statistics and Life Orientation) is a professional academic website for Dr. Michael Kgarimetsa. The platform showcases academic services, educational events, mentorship programs, and personal brand content. Built as a modern, mobile-first web application with a focus on credibility, accessibility, and performance.

**Core Purpose:**
- Showcase Dr. Kgarimetsa's academic background and expertise
- Promote educational events and workshops
- Provide mentoring and educational consultation services
- Gallery showcasing academic events, workshops, and mentorship sessions
- Future expansion for marriage officiation services

**Technology Stack:**
- Frontend: React with TypeScript, Vite build tool
- Backend: Express.js server
- UI Framework: shadcn/ui components with Radix UI primitives
- Styling: Tailwind CSS with custom Material Design-inspired theme
- Database ORM: Drizzle ORM (configured for PostgreSQL)
- Forms: React Hook Form with Zod validation
- Email: ZeptoMail API integration for contact form submissions

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Component Structure:**
- Page-based routing using Wouter (lightweight client-side router)
- Comprehensive page set: Home, About, Services, Events, Blog, Resources, Contact, Testimonials, Gallery, FAQ, Terms, Privacy
- Reusable UI components from shadcn/ui library (buttons, cards, forms, dialogs, etc.)
- Shared Header and Footer components across all pages
- SEO component for dynamic meta tag management

**Gallery Page (November 2025 - Updated):**
- Displays 20 authentic graduation photos from Dr. Kgarimetsa's DBA ceremony (October 18, 2025)
- Responsive 3-column grid (1 column mobile, 2 tablet, 3 desktop)
- Each gallery card includes: high-quality image, category badge, download button, title, description
- **Download Functionality (New):** 
  - Download button in top-right corner of each image using shadcn Button component
  - Semi-transparent background (bg-black/40) with backdrop blur
  - Native browser download via programmatically created anchor element
  - Keyboard accessible (Tab navigation, Enter/Space to download)
  - Proper ARIA labels for screen readers
  - Built-in Button hover elevation (subtle visual feedback following design guidelines)
- Hover effects: image scale animation, gradient overlay, card elevation
- Lazy-loaded images for performance optimization
- CTA section with links to Events and Contact pages
- Follows Material Design principles with proper spacing and typography
- Gallery images stored in attached_assets/gallery-*.jpg

**Design System:**
- Material Design principles adapted for academic credibility
- Typography: Poppins (headings) and Inter (body text) from Google Fonts
- Custom color scheme: Primary brand color (#C9A227 gold), dark navy (#0D1B2A)
- Responsive breakpoint strategy: mobile-first approach
- Spacing system based on Tailwind's spacing scale (4, 8, 16, 24)
- Custom CSS variables for theming support (light/dark mode ready)

**State Management:**
- TanStack Query (React Query) for server state management
- Form state managed by React Hook Form
- Toast notifications for user feedback

**Asset Management:**
- Stock images stored in `/attached_assets/stock_images/`
- Brand logos (main and white variants) in attached_assets
- Optimized .webp format for performance

### Backend Architecture

**Server Structure:**
- Express.js application with TypeScript
- Modular route registration system (`registerRoutes`)
- Vite integration for development with HMR (Hot Module Replacement)
- Production-ready build configuration with esbuild

**API Endpoints:**
- **Authentication:**
  - `POST /api/auth/init-admin`: Initialize admin account (requires ADMIN_INIT_TOKEN header)
  - `POST /api/auth/login`: Admin login with email/password
  - `POST /api/auth/logout`: Destroy session
  - `GET /api/auth/user`: Get current authenticated user
- **Contact Form:**
  - `POST /api/send-mail`: Contact form submission handler (validates via Zod, sends via ZeptoMail)
- **Events:**
  - `GET /api/events`: Fetch all events (public)
  - `POST /api/events`: Create new event (admin only)
  - `PATCH /api/events/:id`: Update event (admin only)
  - `DELETE /api/events/:id`: Delete event (admin only)
- **RSVPs:**
  - `POST /api/rsvps`: Submit event registration (public, sends ZeptoMail confirmation)
- **Blog:**
  - `GET /api/blog`: Fetch all published blog posts (public)
  - `POST /api/blog`: Create blog post (admin only)
  - `PATCH /api/blog/:id`: Update blog post (admin only)
  - `DELETE /api/blog/:id`: Delete blog post (admin only)

**Middleware:**
- Express session middleware with connect-pg-simple store (7-day TTL)
- Passport.js authentication with bcryptjs password hashing
- JSON body parsing with raw body preservation
- Request/response logging for API routes
- CSRF protection via session-based tokens (implicit)

**Storage Layer:**
- PostgreSQL database with Drizzle ORM
- `IStorage` interface in `server/storage.ts` defines CRUD operations
- `PostgresStorage` class implements interface using Drizzle queries
- Type-safe database operations with Zod schema validation

### Database Design

**PostgreSQL Database Schema (November 2025):**
- **users**: Admin authentication with bcrypt-hashed passwords (id, email, username, password, isAdmin)
- **blog_posts**: CMS blog content with categories, tags, and publish workflow (id, title, slug, content, excerpt, author, category, tags, status, publishedAt)
- **events**: Educational workshops with dates, locations, capacity (id, title, description, startTime, endTime, location, capacity, imageUrl)
- **rsvps**: Event registration tracking linked to events (id, eventId, name, email, phone, attendees, message)
- **resources**: Downloadable files with metadata (id, title, description, category, fileUrl, fileName, fileSize)
- **downloads**: Download tracking analytics (id, resourceId, downloadedAt, ipAddress)
- **testimonials**: Client testimonials (id, name, role, organization, content, rating, imageUrl)
- **sessions**: Session storage for connect-pg-simple (sid, sess, expire)

**Key Design Decisions:**
- Serial IDs for all tables (auto-incrementing integers)
- Foreign key constraints with CASCADE delete for referential integrity
- Timezone-aware timestamps using `timestamp().notNull().defaultNow()`
- Text arrays for tags using `.array()` method syntax
- Enums for status fields (blog: draft/published, event: upcoming/ongoing/completed/cancelled)

**Database Operations:**
- Schema managed via Drizzle ORM in `shared/schema.ts`
- Push changes with `npm run db:push` (or `--force` if data loss warning)
- PostgresJS storage adapter in `server/storage.ts` implements IStorage interface
- Database initialized via `server/db.ts` using `@neondatabase/serverless`

### External Dependencies

**Third-party Services:**
- **ZeptoMail**: Email delivery service for contact form submissions
  - API Key: `ZEPTOMAIL_API_KEY` (environment variable)
  - From Email: `ZEPTOMAIL_FROM_EMAIL` (environment variable)
  - Sends HTML-formatted emails with brand styling

- **Google Fonts CDN**: Typography delivery
  - Poppins (weights: 400, 500, 600, 700)
  - Inter (weights: 400, 500, 600)

**Development Tools:**
- Replit-specific plugins (cartographer, dev banner, runtime error modal)
- Only loaded in development mode within Replit environment

**NPM Packages:**
- UI Components: @radix-ui/* (extensive component library)
- Forms: @hookform/resolvers, react-hook-form, zod
- Database: @neondatabase/serverless, drizzle-orm, drizzle-zod
- Utilities: clsx, class-variance-authority, date-fns, embla-carousel-react
- Session Management: connect-pg-simple (configured but not actively used)

### Authentication & Authorization

**Authentication System (November 2025):**
- **Strategy**: Passport.js Local Strategy with bcryptjs password hashing
- **Session Management**: Express sessions stored in PostgreSQL via connect-pg-simple
- **Admin Initialization**: Secure token-protected endpoint (`/api/auth/init-admin`)
  - Requires `ADMIN_INIT_TOKEN` environment variable in `X-Init-Token` header
  - Validates email format and password strength (min 8 characters)
  - Creates admin user with hashed password in database
- **Frontend Auth State**: `useAuth()` hook provides authentication status
  - Handles 401 responses gracefully (treats as unauthenticated)
  - Returns: `user`, `isLoading`, `isAuthenticated`, `isAdmin`
- **Session Security**: 
  - 7-day session TTL
  - HttpOnly cookies (prevents XSS)
  - Secure flag in production
  - SameSite=strict for CSRF protection

**Admin Initialization Process:**
```bash
# One-time setup to create admin account
curl -X POST https://your-domain/api/auth/init-admin \
  -H "X-Init-Token: YOUR_ADMIN_INIT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@omastalo.co.za","password":"YourSecurePassword"}'
```

**Protected Routes**: Future admin pages will use `isAdmin` check from `useAuth()` hook.

### Feature Implementation Details

**Event Registration System (November 2025):**
- **Events Page (`client/src/pages/Events.tsx`):**
  - Fetches events from database via GET `/api/events`
  - Filters events into "Upcoming" and "Past" tabs using date-fns `isFuture()` and `isPast()`
  - Displays loading spinner during data fetch
  - Shows error state if API request fails (distinguishes from "no events" state)
  - Empty states for when no events exist in each category
  - Each event card displays: title, category badge, description, date/time, location, capacity
  - "Register Now" button opens RSVP dialog for upcoming events
  
- **RSVP Dialog (`client/src/components/RSVPDialog.tsx`):**
  - React Hook Form with Zod validation for attendee information
  - Required fields: name, email, number of attendees (1-10)
  - Optional fields: phone number, special message
  - Submits to POST `/api/rsvps` endpoint
  - Success state displays CheckCircle2 icon (no emojis per design guidelines)
  - Confirmation message informs user of email delivery
  - Automatically resets form state on dialog close
  
- **Backend RSVP Processing (`server/routes.ts`):**
  - Validates RSVP data using `insertRsvpSchema` from Drizzle Zod
  - Stores RSVP in database via `storage.createRsvp()`
  - Retrieves event details to include in confirmation email
  - Sends branded HTML email via ZeptoMail with:
    - Event title, date, time, location
    - Attendee count and special requests
    - OMASTALO branding with gold (#C9A227) accents
  - Returns success response to frontend
  
- **Data Flow:**
  1. User clicks "Register Now" on Events page
  2. RSVPDialog opens with event pre-selected
  3. User fills form and submits
  4. Frontend validates via Zod schema
  5. POST request to `/api/rsvps` with event ID and attendee data
  6. Backend validates, saves to database, sends confirmation email
  7. Success state shown with icon and close button
  8. User receives branded email confirmation

**Blog System (November 2025):**
- Blog API routes implemented (GET/POST/PATCH/DELETE)
- Blog page fetches from database with loading/empty states
- Admin panel UI development paused - rich text editor not yet implemented
- Status field filters for "published" posts only on public endpoint

### Performance Optimizations

**Design Goals:**
- Sub-1.5s load time target (per design guidelines)
- Material Design elevation system for visual hierarchy
- Progressive disclosure information architecture
- Optimized image formats (.webp)
- Mobile-first responsive design

**Build Configuration:**
- Vite for fast development builds and optimized production bundles
- Code splitting via dynamic imports (not yet implemented but supported)
- TypeScript strict mode for type safety and optimization opportunities