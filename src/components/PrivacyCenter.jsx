import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, CheckCircle2, RefreshCw, FileText } from 'lucide-react';

export default function PrivacyCenter({ t, onToast }) {
  const [consent, setConsent] = useState(() => {
    const saved = localStorage.getItem('novabyte_privacy_consent');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      adId: true,
      analytics: true,
      crashlytics: true,
      remoteConfig: true
    };
  });

  const handleToggle = (key) => {
    const next = { ...consent, [key]: !consent[key] };
    setConsent(next);
    localStorage.setItem('novabyte_privacy_consent', JSON.stringify(next));
    if (onToast) {
      onToast(`🛡️ ${t.privacy.consentSaved}`);
    }
  };

  const handleReset = () => {
    const resetState = { adId: true, analytics: true, crashlytics: true, remoteConfig: true };
    setConsent(resetState);
    localStorage.setItem('novabyte_privacy_consent', JSON.stringify(resetState));
    if (onToast) {
      onToast(`🔄 Privacy preferences reset to studio defaults.`);
    }
  };

  return (
    <section className="section-padding" id="privacy" aria-labelledby="privacy-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t.privacy.tag}</div>
          <h2 id="privacy-heading" className="section-title">
            {t.privacy.title}
          </h2>
          <p className="section-subtitle">
            {t.privacy.subtitle}
          </p>
        </div>

        <div className="privacy-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: 6 }}>
                Google Play Data Safety & GDPR Telemetry Controls
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Customize anonymous SDK permissions locally. These settings mirror our in-game UMP Consent flows.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <RefreshCw size={15} />
              <span>Reset Defaults</span>
            </button>
          </div>

          {/* Interactive Consent Toggles */}
          <div className="consent-toggles-grid" role="region" aria-label="Consent Manager">
            {/* 1. Advertising ID */}
            <div className="consent-card">
              <div>
                <div className="consent-header">
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{t.privacy.adIdTitle}</h4>
                  <label className="toggle-switch" aria-label={t.privacy.adIdTitle}>
                    <input
                      type="checkbox"
                      checked={consent.adId}
                      onChange={() => handleToggle('adId')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {t.privacy.adIdDesc}
                </p>
              </div>
              <div style={{ marginTop: 14, fontSize: '0.75rem', color: 'var(--color-primary-400)', fontWeight: 700 }}>
                Status: {consent.adId ? 'ACTIVE (Personalized)' : 'MUTED (Contextual Only)'}
              </div>
            </div>

            {/* 2. Firebase Analytics */}
            <div className="consent-card">
              <div>
                <div className="consent-header">
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{t.privacy.analyticsTitle}</h4>
                  <label className="toggle-switch" aria-label={t.privacy.analyticsTitle}>
                    <input
                      type="checkbox"
                      checked={consent.analytics}
                      onChange={() => handleToggle('analytics')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {t.privacy.analyticsDesc}
                </p>
              </div>
              <div style={{ marginTop: 14, fontSize: '0.75rem', color: 'var(--color-primary-400)', fontWeight: 700 }}>
                Status: {consent.analytics ? 'TELEMETRY ON' : 'DISABLED'}
              </div>
            </div>

            {/* 3. Crashlytics */}
            <div className="consent-card">
              <div>
                <div className="consent-header">
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{t.privacy.crashTitle}</h4>
                  <label className="toggle-switch" aria-label={t.privacy.crashTitle}>
                    <input
                      type="checkbox"
                      checked={consent.crashlytics}
                      onChange={() => handleToggle('crashlytics')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {t.privacy.crashDesc}
                </p>
              </div>
              <div style={{ marginTop: 14, fontSize: '0.75rem', color: 'var(--color-primary-400)', fontWeight: 700 }}>
                Status: {consent.crashlytics ? 'AUTO-REPORT ON' : 'OFFLINE'}
              </div>
            </div>

            {/* 4. Remote Config */}
            <div className="consent-card">
              <div>
                <div className="consent-header">
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{t.privacy.remoteTitle}</h4>
                  <label className="toggle-switch" aria-label={t.privacy.remoteTitle}>
                    <input
                      type="checkbox"
                      checked={consent.remoteConfig}
                      onChange={() => handleToggle('remoteConfig')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {t.privacy.remoteDesc}
                </p>
              </div>
              <div style={{ marginTop: 14, fontSize: '0.75rem', color: 'var(--color-primary-400)', fontWeight: 700 }}>
                Status: {consent.remoteConfig ? 'CLOUD SYNC ON' : 'LOCAL FALLBACK'}
              </div>
            </div>
          </div>

          {/* Legal Statement & Summary */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            marginTop: '20px'
          }}>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileText size={18} className="text-emerald-400" />
              <span>Full Master Privacy Policy Summary (Google Play Compliant)</span>
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: 12 }}>
              NovaByte Studios is committed to protecting player privacy. Our mobile games collect non-identifiable diagnostic information, device screen dimensions, and Advertising Identifiers exclusively through certified Google AdMob and Firebase SDKs. We do not sell, rent, or trade player data to third parties. All titles comply with Children's Online Privacy Protection regulations by targeting audiences aged 13 and older.
            </p>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>
              Official Publisher Contact: <strong>legal@novabytestudios.com</strong> • Registered Address: Sahiwal, Pakistan • D-U-N-S Verified.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
