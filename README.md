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
| Deployment | Vercel |

---

## Key Features

- **Dual-mode layout** — TikTok-style snap scroll on mobile; animated bento grid on desktop
- **Care guide overlay** — click any product card to reveal light, water, humidity and difficulty info
- **Shopping cart** — add/remove items with a slide-in drawer, live item count badge
- **Scroll-triggered animations** — staggered card entrance via Framer Motion `whileInView`
- **Hero section** — full-bleed background, grain texture overlay, organic SVG wave transition
- **Code splitting** — Framer Motion, React DOM, and the cart drawer load as separate chunks for optimal performance
- **Responsive** — mobile snap-scroll feed below 768 px, 2 → 3 → 4 column grid on tablet and desktop

---

## Project Structure

```
src/
├── components/
│   ├── Topbar.jsx       # Header with cart icon and badge
│   ├── Hero.jsx         # Full-bleed landing section
│   ├── ProductFeed.jsx  # Layout router (mobile vs desktop)
│   ├── ProductCard.jsx  # Flip card with care guide overlay
│   ├── CartDrawer.jsx   # Slide-in cart (lazy loaded)
│   └── Footer.jsx       # Four-column footer with links
├── data/
│   └── products.js      # 12 product definitions
├── hooks/
│   └── useCart.js       # Cart state (add, remove, open/close)
├── index.css            # Tailwind v4 theme + grain texture
└── main.jsx
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/root-and-vine.git
cd root-and-vine

# Install dependencies
npm install

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
- **`snap-y snap-mandatory`** — native CSS scroll snap delivers the TikTok feed feel without any JS scroll library
- **`e.stopPropagation()` on cart button** — prevents the card's click-to-flip handler from firing when the user taps Add to Cart

---

## License

MIT
