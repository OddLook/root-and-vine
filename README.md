# Root & Vine — Premium Plant Nursery

A modern, premium e-commerce experience for a plant nursery brand. Built with a mobile-first TikTok-style vertical scroll feed and a rich desktop bento grid, Root & Vine delivers an immersive shopping experience with smooth animations, care guide overlays, and a fully functional cart.

**Live demo:** [root-and-vine.vercel.app](https://root-and-vine.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 (Rolldown bundler) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Fonts | Playfair Display (headings) · Outfit (body) |
| Backend | Supabase (database · auth · storage) |
| Deployment | Vercel |

---

## Key Features

- **Dual-mode layout** — static card navigator on mobile; animated bento grid on desktop
- **Mobile navigation** — hamburger menu drawer with links and social icons; prev/next card buttons
- **Care guide overlay** — click/tap any product card to flip and reveal care info
- **Shopping cart** — add/remove items with a slide-in drawer, live item count badge
- **Scroll-triggered animations** — staggered card entrance via Framer Motion `whileInView`
- **See More pagination** — loads one row at a time; shows "End of the catalogue" when exhausted
- **Hero section** — full-bleed background, grain texture overlay, organic SVG wave transition
- **Custom scrollbar** — black thumb on white track (desktop/tablet); hidden on mobile
- **Code splitting** — Framer Motion, cart drawer, and menu drawer load as separate chunks
- **Responsive** — mobile card-by-card navigator below 768 px, 2 → 3 → 4 column grid on tablet and desktop
- **Supabase backend** — client initialised in `src/lib/supabaseClient.js`; auth, DB, and storage ready to wire up

---

## Project Structure

```
src/
├── components/
│   ├── Topbar.jsx       # Header — search, login, cart, hamburger (mobile)
│   ├── Hero.jsx         # Full-bleed landing section
│   ├── ProductFeed.jsx  # Layout router (mobile card navigator vs desktop grid)
│   ├── ProductCard.jsx  # Flip card with care guide overlay
│   ├── CartDrawer.jsx   # Slide-in cart drawer (lazy loaded)
│   ├── MenuDrawer.jsx   # Hamburger nav drawer — mobile only (lazy loaded)
│   └── Footer.jsx       # Four-column footer with links
├── data/
│   └── products.js      # 20 product definitions
├── hooks/
│   └── useCart.js       # Cart state (add, remove, open/close)
├── lib/
│   └── supabaseClient.js  # Supabase client (VITE_SUPABASE_URL / ANON_KEY)
├── index.css            # Tailwind v4 theme + grain texture + custom scrollbar
└── main.jsx
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- A [Supabase](https://supabase.com) project

### Installation

```bash
# Clone the repository
git clone https://github.com/OddLook/root-and-vine.git
cd root-and-vine

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local   # then fill in your Supabase credentials
```

Create a `.env.local` file at the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

---

## Design Decisions

- **Inline React styles for section padding** — Tailwind padding utilities were overridden by browser-default cascade rules in this setup; `style={{ paddingLeft, paddingRight }}` props guarantee specificity
- **`manualChunks` as a function** — Vite 8 uses the Rolldown bundler which requires `manualChunks` to be a function rather than a plain object
- **Static card navigator on mobile** — replaced TikTok-style snap scroll with a single static card + prev/next buttons for more controlled UX and simpler flip interaction
- **`e.stopPropagation()` on cart button** — prevents the card's click-to-flip handler from firing when the user taps Add to Cart
- **`clamp()` for topbar padding** — single inline style value handles responsive padding from mobile to desktop without media queries
- **Supabase client in `src/lib/`** — isolated from components so auth, DB queries, and storage calls share one initialised instance

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous (public) key |

---

## License

MIT
