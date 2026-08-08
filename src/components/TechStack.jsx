import React from 'react';
import { Cpu, Zap, Shield, GitBranch, Radio, Terminal, Award, Clock } from 'lucide-react';

export default function TechStack({ t }) {
  return (
    <section className="section-padding" id="tech" aria-labelledby="tech-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">{t.tech.tag}</div>
          <h2 id="tech-heading" className="section-title">
            {t.tech.title}
          </h2>
          <p className="section-subtitle">
            {t.tech.subtitle}
          </p>
        </div>

        {/* 4 Tech Advantage Pillar Cards */}
        <div className="tech-grid" role="region" aria-label="Technical Advantages">
          <div className="tech-box">
            <div className="tech-icon-wrap" aria-hidden="true">
              <Award size={24} />
            </div>
            <h3>{t.tech.godotTitle}</h3>
            <p>{t.tech.godotDesc}</p>
          </div>

          <div className="tech-box">
            <div className="tech-icon-wrap" aria-hidden="true">
              <Zap size={24} />
            </div>
            <h3>{t.tech.perfTitle}</h3>
            <p>{t.tech.perfDesc}</p>
          </div>

          <div className="tech-box">
            <div className="tech-icon-wrap" aria-hidden="true">
              <Shield size={24} />
            </div>
            <h3>{t.tech.admobTitle}</h3>
            <p>{t.tech.admobDesc}</p>
          </div>

          <div className="tech-box">
            <div className="tech-icon-wrap" aria-hidden="true">
              <Radio size={24} />
            </div>
            <h3>{t.tech.remoteTitle}</h3>
            <p>{t.tech.remoteDesc}</p>
          </div>
        </div>

        {/* 15-Day Sprint Pipeline Visualizer */}
        <div className="pipeline-track" id="pipeline" aria-labelledby="pipeline-heading">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div className="section-tag">{t.pipeline.tag}</div>
            <h3 id="pipeline-heading" style={{ fontSize: '1.8rem', marginBottom: 8 }}>
              {t.pipeline.title}
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>{t.pipeline.subtitle}</p>
          </div>

          <div className="pipeline-steps">
            <div className="pipeline-step-card">
              <span className="step-day-badge">Days 1–3</span>
              <h4 style={{ fontSize: '1rem', margin: '8px 0', color: 'var(--text-main)' }}>Mechanics & Fun Gate</h4>
              <p style={{ fontSize: '0.85rem' }}>{t.pipeline.step1}</p>
            </div>

            <div className="pipeline-step-card">
              <span className="step-day-badge">Days 4–7</span>
              <h4 style={{ fontSize: '1rem', margin: '8px 0', color: 'var(--text-main)' }}>Progression & Content</h4>
              <p style={{ fontSize: '0.85rem' }}>{t.pipeline.step2}</p>
            </div>

            <div className="pipeline-step-card">
              <span className="step-day-badge">Days 8–10</span>
              <h4 style={{ fontSize: '1rem', margin: '8px 0', color: 'var(--text-main)' }}>Art, Juice & Audio</h4>
              <p style={{ fontSize: '0.85rem' }}>{t.pipeline.step3}</p>
            </div>

            <div className="pipeline-step-card">
              <span className="step-day-badge">Days 11–13</span>
              <h4 style={{ fontSize: '1rem', margin: '8px 0', color: 'var(--text-main)' }}>AdMob & Device QA</h4>
              <p style={{ fontSize: '0.85rem' }}>{t.pipeline.step4}</p>
            </div>

            <div className="pipeline-step-card">
              <span className="step-day-badge">Days 14–15</span>
              <h4 style={{ fontSize: '1rem', margin: '8px 0', color: 'var(--text-main)' }}>Google Play Release</h4>
              <p style={{ fontSize: '0.85rem' }}>{t.pipeline.step5}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
