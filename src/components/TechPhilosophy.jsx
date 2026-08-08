import React from 'react';
import { Cpu, Zap, GitBranch, Shield, ArrowRight } from 'lucide-react';

export default function TechPhilosophy({ t }) {
  const cards = [
    {
      icon: <Cpu size={22} />,
      title: t.tech.card1Title,
      desc: t.tech.card1Desc
    },
    {
      icon: <Zap size={22} />,
      title: t.tech.card2Title,
      desc: t.tech.card2Desc
    },
    {
      icon: <GitBranch size={22} />,
      title: t.tech.card3Title,
      desc: t.tech.card3Desc
    },
    {
      icon: <Shield size={22} />,
      title: t.tech.card4Title,
      desc: t.tech.card4Desc
    }
  ];

  return (
    <section className="section-padding" id="tech" aria-labelledby="tech-title">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t.tech.tag}</div>
          <h2 id="tech-title" className="section-title">
            {t.tech.title}
          </h2>
          <p className="section-subtitle">
            {t.tech.subtitle}
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="philosophy-grid">
          {cards.map((card, idx) => (
            <div key={idx} className="philosophy-box">
              <div className="box-icon" aria-hidden="true">
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* 15-Day Sprint Pipeline Breakdown */}
        <div className="sprint-timeline" aria-label="15-Day Agile Sprint">
          <h3 style={{ fontSize: '1.25rem', marginBottom: 6 }}>15-Day Engineering Sprint Breakdown</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            A disciplined cadence ensuring ~30–50 focused hours per title with zero copy-pasting.
          </p>

          <div className="sprint-steps">
            <div className="sprint-step">
              <span>Days 1–3</span>
              <h4>Mechanics Gate</h4>
              <p style={{ color: 'var(--text-muted)' }}>Greybox prototype & fun test</p>
            </div>

            <div className="sprint-step">
              <span>Days 4–7</span>
              <h4>Content & Loops</h4>
              <p style={{ color: 'var(--text-muted)' }}>Levels, fail states & balance</p>
            </div>

            <div className="sprint-step">
              <span>Days 8–10</span>
              <h4>Art & Juice</h4>
              <p style={{ color: 'var(--text-muted)' }}>Themes, SFX & screen feel</p>
            </div>

            <div className="sprint-step">
              <span>Days 11–13</span>
              <h4>AdMob & QA</h4>
              <p style={{ color: 'var(--text-muted)' }}>SDKs & physical hardware testing</p>
            </div>

            <div className="sprint-step">
              <span>Days 14–15</span>
              <h4>Play Release</h4>
              <p style={{ color: 'var(--text-muted)' }}>Automated build & review</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
