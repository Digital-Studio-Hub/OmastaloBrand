# Omastalo Design Guidelines

## Design Approach

**Selected Approach**: Material Design System with Academic Brand Customization

This academic brand platform requires the credibility and structure of Material Design while maintaining a distinctive personal brand identity. We'll adapt Material's elevation, typography hierarchy, and interaction patterns to create an authoritative yet approachable academic presence.

**Key Design Principles**:
- Academic Authority: Clean, structured layouts that establish credibility
- Personal Connection: Warm, approachable elements that humanize expertise
- Progressive Disclosure: Information architecture that guides users from overview to depth
- Performance Excellence: Every design decision optimized for sub-1.5s load times

---

## Typography System

**Font Families** (via Google Fonts CDN):
- Primary: 'Poppins' - Headers, CTAs, Navigation (Weights: 400, 500, 600, 700)
- Secondary: 'Inter' - Body text, captions, metadata (Weights: 400, 500, 600)

**Type Scale** (Desktop → Mobile responsive):
- Hero Heading: 3.5rem → 2.25rem (Poppins 700)
- Page Title: 2.5rem → 1.875rem (Poppins 600)
- Section Heading: 2rem → 1.5rem (Poppins 600)
- Subsection: 1.5rem → 1.25rem (Poppins 500)
- Body Large: 1.125rem (Inter 400)
- Body Standard: 1rem (Inter 400)
- Caption/Meta: 0.875rem (Inter 500)

**Line Heights**: 1.6 for body text, 1.2 for headings

---

## Layout System

**Spacing Primitives** (Tailwind units):
- Primary rhythm: 4, 8, 16, 24 (p-4, m-8, gap-16, py-24)
- Section padding: py-16 md:py-24 lg:py-32
- Component spacing: gap-8 md:gap-12
- Micro-spacing: 2, 4 for tight elements

**Container Strategy**:
- Max-width: max-w-7xl for full sections
- Content max-width: max-w-4xl for text-heavy areas
- Grid system: 12-column responsive grid

**Breakpoints**:
- Mobile-first approach
- sm: 640px, md: 768px, lg: 1024px, xl: 1280px

---

## Component Library

### Navigation
**Desktop Header**:
- Fixed position with subtle shadow on scroll
- Logo (Omastalo main logo) left-aligned
- Horizontal navigation: Home | About | Services | Events | Blog | Resources
- Gold "Contact" CTA button right-aligned
- Height: 80px with subtle backdrop blur

**Mobile Navigation**:
- Hamburger menu (Heroicons icon)
- Full-screen overlay menu with fade-in animation
- Stacked navigation with generous tap targets (min 48px)

### Hero Section (Home Page)
**Layout**: Asymmetric two-column (60/40 split on desktop, stacked mobile)
- Left: Professional headshot of Dr. Kgarimetsa (.webp, 800x1000px)
- Right: Hero content with hierarchy:
  - Small eyebrow text: "OMASTALO"
  - Large heading: "Dr. Michael Kgarimetsa"
  - Subheading: "Organization for Mathematics, Statistics & Life Orientation"
  - Inspirational quote in italics
  - CTA button group: "Book an Event" (primary gold) | "Learn More" (secondary outline)
  
**Background**: Clean white with subtle geometric pattern overlay (low opacity)

### Cards System
**Event Cards**:
- Elevated card (shadow-lg) with hover lift effect
- Top: Event category badge
- Large event title (Poppins 600)
- Date/time with calendar icon (Heroicons)
- Location with map pin icon
- "Register" CTA button
- 4px gold accent border on left edge

**Service Cards**:
- Grid layout: 2 columns desktop, 1 column mobile
- Icon area (80x80px circle with subtle navy background)
- Service title
- Brief description (2-3 lines)
- "Learn More" link with arrow icon

**Blog Post Cards**:
- Featured image (.webp, 16:9 ratio)
- Category badge overlay
- Post title (2-line clamp)
- Author meta + read time
- Excerpt (3-line clamp)

### Forms
**Contact Form**:
- Full-width single column layout
- Field hierarchy: Name | Email | Subject | Message (textarea)
- Label above input with required asterisk
- Input styling: Border-b-2 underline style (Material Design inspired)
- Focus state: Gold border-b with subtle grow animation
- Submit button: Full-width on mobile, auto-width on desktop
- reCAPTCHA badge placement below form
- Success/error message banners

### Timeline Component (About Page)
**Career Milestones**:
- Vertical timeline with gold connecting line
- Alternating left/right content on desktop
- Year/date nodes as gold circles on timeline
- Achievement cards with micro-elevation
- Icon representation for milestone type

---

## Page-Specific Layouts

### Home Page Structure
1. **Hero Section** (80vh desktop, auto mobile) - Asymmetric with professional photo
2. **Introduction Section** (py-24) - Centered max-w-3xl with mission statement
3. **Services Preview** (py-24) - 3-column grid showcasing core services with icons
4. **Upcoming Events** (py-24) - Horizontal scrolling event cards (3 visible, more scroll-able)
5. **Featured Blog Posts** (py-24) - 2-column grid with large featured post + 2 secondary
6. **Impact Numbers** (py-16) - 4-column stat display (students mentored, events hosted, etc.)
7. **CTA Banner** (py-20) - Full-width with background image, "Get in Touch" primary CTA

### About Page
- Hero with timeline photo background (.webp optimized)
- Biography section (2-column: portrait + text on desktop)
- Interactive career timeline
- Mission/Vision/Values grid (3 columns)
- Professional affiliations section

### Services Page
- Service category cards (2x2 grid desktop)
- Each service gets dedicated section with:
  - Icon header
  - Detailed description
  - Benefits list with checkmark icons
  - "Book This Service" CTA
- Future service (Marriage Officiation) shown as "Coming Soon" card with subtle styling

### Events Page
- Tabs: "Upcoming" | "Past"
- Calendar view option toggle
- Event cards in 2-column grid
- Filter sidebar (desktop) / dropdown (mobile): Category, Date, Location

### Blog Page
- Featured post hero (full-width image with overlay text)
- Category filter pills
- 3-column masonry grid for posts
- Load more button (not infinite scroll for accessibility)

### Resources Page
- Resource category cards
- Download cards with file type icons, size indicator
- Search bar prominent at top
- Tag filtering system

### Contact Page
- 2-column split (60/40):
  - Left: Contact form
  - Right: Contact information card with icons, office hours, social links
- Google Maps embed below (full-width, 400px height)

---

## Images Strategy

**Hero Images**:
- Home: Professional portrait of Dr. Kgarimetsa (primary hero)
- About: Academic setting photo (classroom, lecture hall)
- Services: Stock image of mentorship/teaching
- Events: Conference/seminar setting
- Blog: Category-specific headers (mathematics, statistics, life orientation themes)

**Stock Image Themes** (all .webp, optimized):
- Education environments: modern classrooms, students engaged in learning
- Professional settings: conferences, speaking engagements
- Community: mentorship moments, group discussions
- Academic materials: books, charts, educational tools

**Image Specifications**:
- Hero images: 1920x1080px, < 150kb
- Card images: 800x600px, < 80kb
- Thumbnails: 400x300px, < 40kb
- All images: Lazy-loaded below fold

**Omastalo Brand Logos**:
- Main logo (color): Primary header usage
- White logo: Dark backgrounds/footer
- Black logo: Print/light backgrounds
- All SVG format for scalability

---

## Footer Design

**Structure** (3-row layout):

**Row 1** - Brand & Links (py-12):
- 4-column grid desktop, stacked mobile
- Column 1: Omastalo logo + tagline
- Column 2: Quick Links (Home, About, Services, etc.)
- Column 3: Resources & Blog links
- Column 4: Contact information with icons

**Row 2** - Lekker Network (py-8, border-t border-opacity-10):
- Centered content
- Lekker Network logo (centered, 120px width)
- "Powered by Lekker Network" text below logo
- Level 1 Verified Badge (100px, clickable to verification page)

**Row 3** - Legal (py-6, border-t border-opacity-10):
- Copyright: "© 2025 OMASTALO — Organization for Mathematics, Statistics & Life Orientation"
- Legal links: Privacy Policy | Terms of Service (inline, separated by vertical bars)

---

## Iconography

**Icon Library**: Heroicons (outline style for primary, solid for emphasis)

**Common Icons**:
- Navigation: menu, close, chevron-down
- Services: academic-cap, calculator, chart-bar, light-bulb
- Contact: envelope, phone, map-pin, calendar
- Social: twitter, linkedin, facebook (as needed)
- UI: arrow-right, check-circle, information-circle

---

## Responsive Behavior

**Mobile-First Adaptations**:
- Stack all multi-column layouts to single column
- Increase touch target sizes (min 48x48px)
- Simplify navigation to hamburger menu
- Full-width CTAs for better thumb reach
- Reduce vertical spacing by 33% on mobile
- Hero heights: auto instead of fixed viewport
- Horizontal scrolling for event/blog previews

**Tablet Considerations**:
- 2-column layouts where desktop shows 3-4
- Maintain desktop navigation if space permits
- Balanced spacing between mobile and desktop values

---

## Accessibility

- WCAG 2.1 AA compliance minimum
- Color contrast ratio: 4.5:1 for body text, 3:1 for large text
- Focus indicators: 2px gold outline with 2px offset
- Skip navigation link (visually hidden, keyboard accessible)
- Semantic HTML5 structure
- ARIA labels for icon-only buttons
- Form field error messaging (visible + ARIA announcements)
- Keyboard navigation: Full site navigable via keyboard
- Alt text: Descriptive for all images

---

## Performance Optimizations

- Critical CSS inline for above-fold content
- Lazy-load all images below fold
- Font-display: swap for web fonts
- Defer non-critical JavaScript
- Compress .webp images: Hero <150kb, Cards <80kb
- Enable browser caching headers
- Minimize DOM depth (max 10 levels)
- Use CSS Grid/Flexbox over JavaScript layouts