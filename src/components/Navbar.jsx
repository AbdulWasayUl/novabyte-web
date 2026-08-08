import { useEffect, useRef, useState } from 'react';
import { Check, Eye, Globe2, Menu, Moon, Sun, X } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ur', name: 'اردو' },
  { code: 'ar', name: 'العربية' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
];

export default function Navbar({ t, locale, setLocale, theme, setTheme, contrast, setContrast }) {
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef(null);
  const currentLanguage = languages.find((language) => language.code === locale) || languages[0];
  const links = [
    ['#about', t.nav.about],
    ['#pillars', t.nav.pillars],
    ['#organization', t.nav.organization],
    ['#privacy', t.nav.privacy],
    ['#contact', t.nav.contact],
  ];

  useEffect(() => {
    const closeMenus = (event) => {
      if (event.key === 'Escape') {
        setLangOpen(false);
        setMobileOpen(false);
      }
      if (event.type === 'pointerdown' && !langRef.current?.contains(event.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('keydown', closeMenus);
    document.addEventListener('pointerdown', closeMenus);
    return () => {
      document.removeEventListener('keydown', closeMenus);
      document.removeEventListener('pointerdown', closeMenus);
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">{t.nav.skip}</a>
      <header className="site-header">
        <div className="container nav-row">
          <a href="#main-content" className="brand" aria-label="NovaByte Studios">
            <span className="brand-symbol" aria-hidden="true"><i /><i /></span>
            <span>NovaByte <small>Studios</small></span>
          </a>

          <nav className="desktop-nav" aria-label={t.nav.about}>
            {links.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
          </nav>

          <div className="nav-tools">
            <button
              className="round-control"
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={t.nav.themeToggle}
              title={t.nav.themeToggle}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              className={`round-control ${contrast === 'high' ? 'is-active' : ''}`}
              type="button"
              onClick={() => setContrast(contrast === 'normal' ? 'high' : 'normal')}
              aria-label={t.nav.contrastToggle}
              aria-pressed={contrast === 'high'}
              title={t.nav.contrastToggle}
            >
              <Eye size={17} />
            </button>

            <div className="language-picker" ref={langRef}>
              <button
                className="language-trigger"
                type="button"
                onClick={() => setLangOpen((open) => !open)}
                aria-expanded={langOpen}
                aria-haspopup="menu"
              >
                <Globe2 size={16} aria-hidden="true" />
                <span>{currentLanguage.code.toUpperCase()}</span>
              </button>
              {langOpen && (
                <div className="language-menu" role="menu" aria-label={t.nav.langSelect}>
                  {languages.map((language) => (
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={locale === language.code}
                      key={language.code}
                      onClick={() => { setLocale(language.code); setLangOpen(false); }}
                    >
                      <span lang={language.code}>{language.name}</span>
                      {locale === language.code && <Check size={15} aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="round-control mobile-toggle"
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={t.nav.menu}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label={t.nav.menu}>
            <div className="container">
              {links.map(([href, label]) => (
                <a href={href} key={href} onClick={() => setMobileOpen(false)}>{label}</a>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
