# Heirloom

A digital legacy app that helps families preserve, participate, and protect their stories across generations.

## Overview

Heirloom is a minimal, elegant website introducing a private digital vault for family stories, voices, and memories. The design combines warmth, trust, and timelessness through careful typography, color choices, and storytelling.

## Design System

### Colors
- **Forest Green** (`#0C3B2E`) — Primary, trust, permanence
- **Antique Gold** (`#C4A464`) — Accent, warmth, luxury
- **Ivory Linen** (`#F8F5EE`) — Background, softness, elegance

### Typography
- **Headlines:** Cormorant Garamond (serif, elegant)
- **Body:** Inter (sans-serif, readable)

## Structure

```
heirloom/
├── index.html          # Home page with hero, features, waitlist
├── about.html          # About page with manifesto and founders
├── css/
│   └── styles.css      # Complete design system and styles
├── js/
│   └── main.js         # Animations and form handling
└── assets/             # Future images and media
```

## Features

### Home Page
- Hero section with core value proposition
- How It Works (3-step process)
- Why It Matters (emotional connection)
- Security & Trust
- Waitlist signup form

### About Page
- Manifesto and brand story
- Founders section
- Company values
- Founding Circle CTA

### Interactions
- Smooth scroll animations (fade-in on view)
- Responsive mobile design
- Form validation and submission handling
- Header scroll effects

## Local Development

Simply open `index.html` in your browser. No build process required.

```bash
# Using Python
python -m http.server 8000

# Using Node
npx http-server

# Then visit: http://localhost:8000
```

## Form Integration

The waitlist forms currently log to console. To integrate with Supabase:

1. Create a Supabase project
2. Create a `waitlist` table with columns: `name`, `email`, `form_type`, `created_at`
3. Update the `submitToWaitlist()` function in `js/main.js` with your Supabase credentials

## Deployment

This is a static site and can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any static hosting service

## License

© 2024 Heirloom. All rights reserved.
