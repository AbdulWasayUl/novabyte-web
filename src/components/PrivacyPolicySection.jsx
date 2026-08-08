import React from 'react';
import { Lock, FileText, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicySection({ t }) {
  return (
    <section className="section-padding" id="privacy" aria-labelledby="privacy-title">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t.privacy.tag}</div>
          <h2 id="privacy-title" className="section-title">
            {t.privacy.title}
          </h2>
          <p className="section-subtitle">
            {t.privacy.subtitle}
          </p>
        </div>

        <div className="privacy-doc-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <FileText size={20} className="text-emerald-400" />
              <strong style={{ fontSize: '1.1rem' }}>NovaByte Studios Official Privacy Policy</strong>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>{t.privacy.lastUpdated}</span>
          </div>

          <article className="privacy-article">
            <h3>{t.privacy.introTitle}</h3>
            <p>{t.privacy.introText}</p>

            <h3>{t.privacy.dataTitle}</h3>
            <p>{t.privacy.dataText}</p>
            <ul>
              <li><strong>{t.privacy.dataList1}</strong></li>
              <li><strong>{t.privacy.dataList2}</strong></li>
              <li><strong>{t.privacy.dataList3}</strong></li>
            </ul>

            <h3>{t.privacy.adsTitle}</h3>
            <p>{t.privacy.adsText}</p>

            <h3>{t.privacy.childrenTitle}</h3>
            <p>{t.privacy.childrenText}</p>

            <h3>{t.privacy.contactTitle}</h3>
            <p>{t.privacy.contactText}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
