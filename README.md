# Ultimate Mobile Apps Website

A beautiful, modern portfolio website showcasing Ultimate Mobile Apps' premium mobile applications. Built with Next.js 14, featuring glassmorphism design effects.

## Features

- ✨ **Glassmorphism Design** - Modern, premium UI with glass effects
- 📱 **Mobile-First** - Optimized for iOS and Android users
- ⚡ **Performance** - Static site generation for fast loading
- 🎨 **Beautiful Animations** - Smooth transitions and floating effects
- 📄 **Complete Pages** - Home, Apps, About, Support, Privacy, Terms
- 🔍 **SEO Optimized** - Meta tags and OpenGraph support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS 4
- **Language**: TypeScript
- **Deployment**: AWS Amplify / S3 + CloudFront (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
├── app/
│   ├── apps/          # Apps gallery page
│   ├── about/         # About page
│   ├── support/       # Support & FAQ page
│   ├── privacy/       # Privacy Policy
│   ├── terms/         # Terms of Service
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Home page
├── components/
│   ├── Header.tsx     # Navigation header
│   ├── Footer.tsx     # Site footer
│   ├── AppCard.tsx    # App showcase card
│   └── FAQItem.tsx    # FAQ accordion item
├── data/
│   └── apps.json      # App data configuration
└── public/
    └── icons/         # App icons (add your icons here)
```

## Adding App Icons

Place your app icons in `public/icons/` with these filenames:
- `vita.png` - VitaChoice®
- `timer.png` - Timer for Life
- `freedom.png` - FreedomTek®
- `liberty.png` - LibertySocial™
- `legal.png` - LegalTraker™

Recommended: 512x512px PNG with transparency.

## Updating App Data

Edit `data/apps.json` to add or modify apps:

```json
{
  "name": "App Name",
  "tagline": "App description.",
  "icon": "/icons/app-icon.png",
  "iosURL": "https://apps.apple.com/...",
  "androidURL": "https://play.google.com/..."
}
```

## Deployment

### AWS Amplify (Recommended)

1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `pnpm build`
   - Output directory: `.next`
3. Deploy automatically on push to main branch

### AWS S3 + CloudFront

1. Build the site: `pnpm build`
2. Export static files: `pnpm export` (if using static export)
3. Upload to S3 bucket
4. Configure CloudFront distribution
5. Set up Route53 for custom domain

## Performance Targets

- LCP < 1.8s
- Total JS < 120kb
- Mobile PageSpeed: 95+

## License

© 2024 Ultimate Mobile Apps. All rights reserved.
