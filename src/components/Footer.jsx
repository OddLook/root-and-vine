const links = {
  Shop: ['All Plants', 'Indoor Plants', 'Outdoor Plants', 'Rare Finds', 'Gift Sets'],
  'Care Guides': ['Beginners', 'Low Light', 'Pet Friendly', 'Air Purifying'],
  Company: ['About Us', 'Sustainability', 'Blog', 'Careers', 'Contact'],
}

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div style={{ paddingLeft: 'clamp(1.25rem, 5vw, 5rem)', paddingRight: 'clamp(1.25rem, 5vw, 5rem)', paddingTop: '4.8rem', paddingBottom: '4.8rem' }}>
        <div className="grid grid-cols-4 gap-12 border-b border-white/10" style={{ paddingBottom: '4rem' }}>
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <span className="font-display text-xl font-bold">Root & Vine</span>
            <p className="text-white/50 text-sm leading-relaxed">
              Hand-picked plants delivered to your door. We believe every space deserves to grow.
            </p>
            <div className="flex gap-3 mt-1">
              <a href="#" aria-label="Instagram" className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 hover:border-[#72a744] transition-colors">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="TikTok" className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 hover:border-[#72a744] transition-colors">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                </svg>
              </a>
              <a href="#" aria-label="Pinterest" className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 hover:border-[#72a744] transition-colors">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.27-5.36 1.27-5.36s-.32-.65-.32-1.6c0-1.5.87-2.63 1.95-2.63.92 0 1.37.69 1.37 1.52 0 .93-.59 2.31-.9 3.59-.25 1.07.54 1.95 1.59 1.95 1.91 0 3.19-2.45 3.19-5.35 0-2.21-1.49-3.76-3.62-3.76-2.47 0-3.92 1.85-3.92 3.77 0 .75.29 1.55.64 1.99a.26.26 0 0 1 .06.24c-.07.27-.21.87-.24.99-.04.16-.13.2-.29.12-1.09-.51-1.77-2.09-1.77-3.37 0-2.74 1.99-5.26 5.74-5.26 3.01 0 5.35 2.15 5.35 5.01 0 2.99-1.88 5.39-4.49 5.39-.88 0-1.7-.46-1.98-.99l-.54 2.01c-.19.75-.72 1.68-1.08 2.25.81.25 1.67.39 2.56.39 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(links).map(([heading, items]) => (
            <div key={heading} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white/80">{heading}</h3>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-white/50 text-sm hover:text-[#72a744] transition-colors cursor-pointer">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-white/30 text-xs" style={{ marginTop: '3rem' }}>
          <span>© {new Date().getFullYear()} Root & Vine. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors cursor-pointer">Terms of Service</a>
            <a href="#" className="hover:text-white/60 transition-colors cursor-pointer">Shipping Info</a>
          </div>
        </div>

        <div className="text-center text-white/25 text-xs" style={{ marginTop: '1.25rem' }}>
          <a
            href="https://musubi-catalogue.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/50 transition-colors cursor-pointer"
          >
            Design &amp; development — Musubi Studio
          </a>
        </div>
      </div>
    </footer>
  )
}
