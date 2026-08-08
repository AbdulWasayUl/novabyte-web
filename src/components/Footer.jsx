import { ArrowUp } from 'lucide-react';

export default function Footer({ t }) {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div>
          <a href="#main-content" className="brand footer-brand" aria-label="NovaByte Studios">
            <span className="brand-symbol" aria-hidden="true"><i /><i /></span>
            <span>NovaByte <small>Studios</small></span>
          </a>
          <p>{t.footer.tagline}</p>
        </div>
        <nav aria-label={t.nav.contact}>
          <a href="#about">{t.nav.about}</a>
          <a href="#pillars">{t.nav.pillars}</a>
          <a href="#organization">{t.nav.organization}</a>
          <a href="#privacy">{t.footer.privacyLink}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <a className="back-to-top" href="#main-content" aria-label={t.nav.skip}><ArrowUp size={20} /></a>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} NovaByte Studios. {t.footer.rights}</span>
        <span>{t.organization.locationValue}</span>
      </div>
    </footer>
  );
}
