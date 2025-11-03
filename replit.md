# OMASTALO - Academic Personal Brand Website

## Overview

OMASTALO (Organization for Mathematics, Statistics and Life Orientation) is a professional academic website for Dr. Michael Kgarimetsa. The platform showcases academic services, educational events, mentorship programs, and personal brand content. Built as a modern, mobile-first web application with a focus on credibility, accessibility, and performance.

**Core Purpose:**
- Showcase Dr. Kgarimetsa's academic background and expertise
- Promote educational events and workshops
- Provide mentoring and educational consultation services
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
- `POST /api/send-mail`: Contact form submission handler
  - Validates input using Zod schema
  - Sends emails via ZeptoMail API
  - Sends to info@omastalo.co.za

**Middleware:**
- JSON body parsing with raw body preservation
- Request/response logging for API routes
- CORS and security headers (implicit via Express defaults)

**Storage Layer:**
- In-memory storage implementation (MemStorage class) for user management
- Interface-based design (`IStorage`) for future database migration
- Drizzle ORM configured but database schema not yet implemented

### Database Design

**Current State:**
- Drizzle ORM configured for PostgreSQL (`drizzle.config.ts`)
- Schema location: `shared/schema.ts` (currently only contains Zod validation schemas)
- Database credentials via `DATABASE_URL` environment variable
- Migration directory: `/migrations`

**Rationale:** The application is structured to support database integration but currently operates without persistent storage. The contact form data is sent via email rather than stored in a database. User management schema exists in memory storage but is not actively used in the current feature set.

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

**Current State:** No authentication system implemented. The application is a public-facing informational website with a contact form. User schema exists in storage layer but is not utilized.

**Future Consideration:** Authentication infrastructure is ready for implementation if admin functionality is needed (event management, blog posting, etc.).

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