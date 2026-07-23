import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { getBusinessInfo } from "../lib/sanity";

export const Route = createRootRoute({
  loader: () => getBusinessInfo(),
  component: RootLayout,
});

function RootLayout() {
  const business = Route.useLoaderData();

  return (
    <>
      <style>{CSS}</style>

      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="site-logo">
            {business?.name ?? "My Business"}
          </Link>
          <nav className="site-nav">
            <a href="#gallery">Gallery</a>
            <a href="#hours">Hours</a>
            <a href="#contact" className="btn btn-sm">Contact</a>
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} {business?.name ?? "My Business"}. All rights reserved.</p>
          {(business?.socialLinks?.facebook || business?.socialLinks?.instagram) && (
            <div className="footer-socials">
              {business.socialLinks.facebook && <a href={business.socialLinks.facebook} target="_blank" rel="noopener">Facebook</a>}
              {business.socialLinks.instagram && <a href={business.socialLinks.instagram} target="_blank" rel="noopener">Instagram</a>}
              {business.socialLinks.tiktok && <a href={business.socialLinks.tiktok} target="_blank" rel="noopener">TikTok</a>}
            </div>
          )}
          <p className="footer-credit">
            Built with <a href="https://github.com/your-username/tanstack-start-sanity-starter" target="_blank" rel="noopener">TanStack Start + Sanity Starter</a>
          </p>
        </div>
      </footer>
    </>
  );
}

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --color-bg: #faf9f7;
    --color-surface: #ffffff;
    --color-ink: #1a1a1a;
    --color-muted: #6b6b6b;
    --color-accent: #c8552a;
    --color-accent-light: #f5e8e3;
    --color-border: #e5e3df;
    --font-display: 'Georgia', serif;
    --font-body: system-ui, sans-serif;
    --radius: 6px;
    --max-w: 1100px;
    --max-w-narrow: 680px;
  }

  body {
    background: var(--color-bg);
    color: var(--color-ink);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.65;
  }

  a { color: var(--color-accent); text-decoration: none; }
  a:hover { text-decoration: underline; }
  img { display: block; max-width: 100%; height: auto; }

  /* ── LAYOUT ── */
  .container { max-width: var(--max-w); margin: 0 auto; padding: 0 1.5rem; }
  .container-narrow { max-width: var(--max-w-narrow); }

  /* ── HEADER ── */
  .site-header {
    position: sticky; top: 0; z-index: 50;
    background: rgba(250,249,247,.95);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--color-border);
    padding: 1rem 0;
  }
  .header-inner { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .site-logo { font-family: var(--font-display); font-size: 1.25rem; color: var(--color-ink); font-weight: bold; }
  .site-nav { display: flex; align-items: center; gap: 1.5rem; }
  .site-nav a { font-size: .9rem; color: var(--color-muted); }
  .site-nav a:hover { color: var(--color-ink); text-decoration: none; }

  /* ── BUTTONS ── */
  .btn {
    display: inline-block;
    background: var(--color-accent);
    color: #fff !important;
    padding: .75rem 1.75rem;
    border-radius: var(--radius);
    font-size: .9rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: opacity .15s, transform .1s;
    text-decoration: none !important;
  }
  .btn:hover { opacity: .88; transform: translateY(-1px); }
  .btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }
  .btn-sm { padding: .5rem 1.1rem; }

  /* ── HERO ── */
  .hero {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: linear-gradient(160deg, var(--color-accent-light) 0%, var(--color-bg) 60%);
    padding: 5rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
  }
  .hero-content { max-width: 600px; }
  .eyebrow { font-size: .8rem; letter-spacing: .15em; text-transform: uppercase; color: var(--color-accent); margin-bottom: 1rem; }
  .hero-content h1 { font-family: var(--font-display); font-size: clamp(2.4rem, 6vw, 4rem); line-height: 1.1; color: var(--color-ink); margin-bottom: 1.5rem; }

  /* ── SECTIONS ── */
  .section { padding: 5rem 0; }
  .section-alt { background: var(--color-surface); }
  .section-title { font-family: var(--font-display); font-size: clamp(1.6rem, 3vw, 2.2rem); margin-bottom: 2.5rem; }

  /* ── GALLERY ── */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  .gallery-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: box-shadow .2s, transform .15s;
  }
  .gallery-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,.08); transform: translateY(-2px); }
  .gallery-img-wrap { aspect-ratio: 4/3; overflow: hidden; background: var(--color-border); }
  .gallery-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
  .gallery-card:hover img { transform: scale(1.04); }
  .gallery-info { padding: 1rem 1.2rem; }
  .gallery-tag { font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: var(--color-accent); }
  .gallery-info h3 { font-size: 1rem; font-weight: 600; margin: .25rem 0; }
  .gallery-info p { font-size: .85rem; color: var(--color-muted); }

  /* ── HOURS ── */
  .hours-table { width: 100%; border-collapse: collapse; }
  .hours-table td { padding: .6rem .5rem; border-bottom: 1px solid var(--color-border); }
  .hours-table td:last-child { text-align: right; color: var(--color-muted); }

  /* ── CONTACT ── */
  .contact-detail { margin-bottom: .5rem; font-size: .95rem; color: var(--color-muted); }
  .contact-detail a { color: var(--color-muted); }
  .contact-detail a:hover { color: var(--color-ink); }

  .contact-form { margin-top: 2rem; display: flex; flex-direction: column; gap: 1.2rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  label { display: flex; flex-direction: column; gap: .4rem; font-size: .85rem; font-weight: 500; color: var(--color-ink); }
  input, textarea {
    padding: .65rem .85rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    font-size: .9rem;
    font-family: var(--font-body);
    background: var(--color-surface);
    color: var(--color-ink);
    transition: border-color .15s;
  }
  input:focus, textarea:focus { outline: none; border-color: var(--color-accent); }
  textarea { resize: vertical; }
  .form-msg { padding: .75rem 1rem; border-radius: var(--radius); font-size: .85rem; }
  .form-msg--ok { background: #e8f5e9; color: #2e7d32; }
  .form-msg--err { background: #ffebee; color: #c62828; }

  /* ── FOOTER ── */
  .site-footer { background: var(--color-ink); color: rgba(255,255,255,.5); padding: 3rem 0; margin-top: auto; }
  .site-footer p { font-size: .85rem; margin-bottom: .5rem; }
  .site-footer a { color: rgba(255,255,255,.6); }
  .site-footer a:hover { color: #fff; text-decoration: none; }
  .footer-socials { display: flex; gap: 1.2rem; margin: .75rem 0; }
  .footer-credit { font-size: .75rem; margin-top: 1.5rem; opacity: .5; }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    .form-row { grid-template-columns: 1fr; }
    .site-nav a:not(.btn) { display: none; }
  }
`;
