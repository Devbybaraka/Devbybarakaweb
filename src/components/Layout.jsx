import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, Briefcase, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Work', to: '/#work' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Track order', to: '/track' },
  { label: 'Services', to: '/#services' },
  { label: 'Approach', to: '/#approach' },
  { label: 'Contact', to: '/#contact' },
];

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-slate-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white text-sm font-bold tracking-[0.2em] text-slate-800">
              D
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">devbybaraka</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Request a proposal
              <ArrowRight size={16} />
            </Link>
          </div>

          <button
            type="button"
            className="rounded-md border border-slate-300 p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-slate-50 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className="text-sm font-medium text-slate-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white text-sm font-bold tracking-[0.2em] text-slate-800">
                D
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">devbybaraka</div>
              </div>
            </div>
            <p className="max-w-md text-sm text-slate-600">
              Building thoughtful digital experiences and reliable online presence for brands and businesses that want to grow with clarity.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/">Overview</Link></li>
              <li><Link to="/#work">Case Studies</Link></li>
              <li><Link to="/#services">Services</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="mailto:barakanewton019@gmail.com">barakanewton019@gmail.com</a></li>
              <li><a href="tel:+254755375947">+254755375947</a></li>
              <li><Link to="/#contact">Book a consultation</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-4 py-4 text-xs text-slate-500 sm:px-6 lg:flex-row lg:px-8">
            <p>© 2026 devbybaraka. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/#contact">Privacy</Link>
              <Link to="/#contact">Terms</Link>
              <Link to="/#contact">Legal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
