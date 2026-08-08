import { useEffect, useRef, useState } from 'react';
import { translations } from './i18n/translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import StudioPillars from './components/StudioPillars';
import OrganizationDetails from './components/OrganizationDetails';
import PrivacySection from './components/PrivacySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const readPreference = (key, fallback) => {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
};

const savePreference = (key, value) => {
  try { localStorage.setItem(key, value); } catch { /* Preferences remain session-only. */ }
};

const getInitialTheme = () => {
  const savedTheme = readPreference('novabyte_theme', '');
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [contrast, setContrast] = useState(
    () => readPreference('novabyte_contrast', 'normal'),
  );
  const [locale, setLocale] = useState(
    () => readPreference('novabyte_locale', 'en'),
  );
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimer = useRef(null);

  const showToast = (message) => {
    window.clearTimeout(toastTimer.current);
    setToastMessage(message);
    toastTimer.current = window.setTimeout(() => setToastMessage(null), 5000);
  };

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    savePreference('novabyte_theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#081a12' : '#f5f7f2',
    );
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.contrast = contrast;
    savePreference('novabyte_contrast', contrast);
  }, [contrast]);

  useEffect(() => {
    const current = translations[locale] || translations.en;
    document.documentElement.lang = locale;
    document.documentElement.dir = current.dir || 'ltr';
    savePreference('novabyte_locale', locale);
    document.title = `NovaByte Studios — ${current.about.title}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', current.hero.lead);
  }, [locale]);

  const t = translations[locale] || translations.en;

  return (
    <div className="site-shell">
      <Navbar
        t={t}
        locale={locale}
        setLocale={setLocale}
        theme={theme}
        setTheme={setTheme}
        contrast={contrast}
        setContrast={setContrast}
      />
      <main id="main-content">
        <Hero t={t} />
        <AboutSection t={t} />
        <StudioPillars t={t} />
        <OrganizationDetails t={t} />
        <PrivacySection t={t} />
        <ContactSection t={t} onToast={showToast} />
      </main>
      <Footer t={t} />
      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          {toastMessage}
          <button type="button" onClick={() => setToastMessage(null)} aria-label={t.nav.close}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
      )}
    </div>
  );
}
