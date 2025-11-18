# Freshmo Design Guidelines

## Design Approach

**Reference-Based**: Drawing inspiration from Glossier's clean beauty aesthetic, Apple's minimalist product photography, and Shopify's e-commerce patterns. The design emphasizes fresh, health-focused visuals with vibrant mint/turquoise brand colors creating an energetic yet professional shopping experience.

**Key Principles**:
- Fresh & Clean: Abundant whitespace with strategic turquoise accents
- Product-First: Large, high-quality product photography dominates
- Trust & Health: Clinical cleanliness meets approachable warmth
- Frictionless Commerce: Streamlined path from discovery to checkout

---

## Typography System

**Fonts** (Google Fonts):
- Primary: 'Outfit' - Headers, product names, CTAs (Weights: 400, 500, 600, 700)
- Secondary: 'Inter' - Body, descriptions, UI elements (Weights: 400, 500)

**Type Scale**:
- Hero Heading: 4rem → 2.5rem (Outfit 700)
- Product Title: 2.25rem → 1.75rem (Outfit 600)
- Section Heading: 1.875rem → 1.5rem (Outfit 600)
- Body Large: 1.125rem (Inter 400)
- Body: 1rem (Inter 400)
- Small/Meta: 0.875rem (Inter 500)

**Line Heights**: 1.7 for body, 1.1 for headings

---

## Layout System

**Spacing Primitives**: 4, 8, 12, 16 (p-4, gap-8, py-12, mb-16)
- Section padding: py-16 md:py-24
- Product grid gaps: gap-8 md:gap-12
- Container: max-w-7xl

---

## Component Library

### Navigation
**Desktop Header** (sticky, backdrop-blur):
- Freshmo logo left, horizontal nav center: Shop | Benefits | Science | Reviews
- Right: Search icon, Cart (with item count badge), Account icon
- Height: 72px, turquoise underline on active/hover

**Mobile**: Hamburger menu, cart icon with badge, logo center

### Hero Section
**Layout**: Full-width turquoise background with white gradient overlay (top to bottom, opacity 0 → 0.15)
- Large hero product image: Freshmo bottle floating with mint leaves (1920x1080px .webp)
- Left-aligned content (max-w-xl):
  - Eyebrow: "CLINICALLY PROVEN FRESH BREATH"
  - Headline: "Your Best Breath Starts Here"
  - Subtext: "Premium mouthwash with natural mint extracts"
  - CTA buttons with backdrop-blur-md: "Shop Now" (white bg) | "Learn More" (white outline)
- Height: 85vh desktop, auto mobile

### Product Cards
**Grid**: 3 columns desktop, 2 tablet, 1 mobile
- Square product image (800x800px .webp, white background)
- Variant name badge (Peppermint/Spearmint/Strawberry Mint)
- Product title + volume
- 5-star rating + review count
- Price (large, bold)
- "Add to Cart" button (full-width, turquoise)
- Quick view icon (top-right corner on hover)

### Product Detail Page
**Two-column split** (50/50 desktop):
- Left: Large product image gallery (main image + 4 thumbnails), zoom on hover
- Right: 
  - Breadcrumb navigation
  - Product name + variant selector (pill buttons)
  - Star rating + review link
  - Price (strikethrough original if on sale)
  - Quantity selector (- / number / +)
  - "Add to Cart" CTA (large, full-width)
  - "Buy Now" secondary button
  - Accordion sections: Description | Ingredients | Usage | Reviews

### Benefits Section
**3-column grid** with icons (from Heroicons):
- Fresh Breath (sparkles icon)
- Natural Ingredients (leaf icon)
- Clinically Tested (shield-check icon)
Each with icon, title, 2-line description

### Reviews Carousel
**Horizontal scroll cards**:
- 5-star rating
- Review text (3-line clamp)
- Customer name + verified badge
- Photo testimonials where available
- Navigation arrows + dots

### Shopping Cart (Slide-out Drawer)
**Right-side overlay**:
- Cart items list (image, name, quantity controls, price)
- Subtotal calculation
- "Checkout" button (sticky at bottom)
- "Continue Shopping" link

---

## Page Structures

### Home Page (8 sections)
1. Hero (product showcase with CTAs)
2. Featured Products (3 variants in grid)
3. Benefits (3-column icon grid)
4. Science/Trust (2-column: clinical study image + text)
5. Customer Reviews (carousel)
6. Instagram Gallery (4x4 grid UGC photos)
7. Subscription Offer (centered CTA banner with discount badge)
8. FAQ Accordion (6 common questions)

### Shop Page
- Filter sidebar (desktop) / dropdown (mobile): Variant, Price, Rating
- Product grid (12-24 items)
- Sort dropdown: Featured, Price, Rating, Newest
- Pagination

### Product Detail Page
- Breadcrumb navigation
- Product showcase (images + details)
- Related products slider (4 items)
- Reviews section (expandable)

### Checkout (Multi-step)
**Progress bar**: Cart → Shipping → Payment → Confirmation
- Single-column form (max-w-2xl centered)
- Order summary sidebar (desktop) / sticky bottom (mobile)
- Trust badges: Secure checkout, Free shipping, Money-back guarantee

---

## Images Strategy

**Hero Image**: Full-width Freshmo bottle on turquoise gradient with floating mint leaves, water droplets (1920x1080px, <150kb)

**Product Photography** (All .webp, white background):
- Main product shots: 1200x1200px, <100kb
- Lifestyle shots: People using product, bathroom settings
- Ingredient closeups: Mint leaves, natural elements
- Before/after mouth health visuals

**Supporting Images**:
- Clinical study graphics (charts, diagrams)
- Instagram UGC grid (800x800px each)
- Testimonial customer photos
- Ingredient transparency images

**Freshmo Logo**: SVG, turquoise version (header), white version (footer)

---

## Footer

**4-column grid** (stacked mobile), py-16:
- Column 1: Logo, tagline, social icons
- Column 2: Shop (variants, bundles, subscriptions)
- Column 3: Company (About, Science, Contact, Careers)
- Column 4: Support (FAQ, Shipping, Returns, Reviews)

**Bottom bar** (py-6, border-t):
- Copyright left, Legal links right (Privacy, Terms, Accessibility)

---

## Iconography
**Heroicons** (outline primary, solid accents):
- Commerce: shopping-cart, heart, search, user
- Product: sparkles, leaf, shield-check, star
- UI: chevron-right, plus, minus, close, menu

---

## Responsive Behavior
- Stack all grids to single column on mobile
- Product images: Full-width mobile, contained desktop
- Navigation: Collapse to hamburger <768px
- Cart drawer: Full-screen mobile, 400px wide desktop
- Touch targets: min 48px height
- Horizontal product scrolling on mobile for featured sections

---

## Accessibility
- WCAG 2.1 AA compliance
- Alt text for all product images (descriptive: "Freshmo Peppermint Mouthwash bottle with mint leaves")
- Focus indicators: 2px turquoise outline
- Form labels always visible
- Cart item count announced to screen readers
- Keyboard navigation throughout checkout

---

## Performance
- Lazy-load product images below fold
- WebP format all images
- Critical CSS inline
- Defer non-essential scripts
- Product image CDN optimization
- Cache product catalog data