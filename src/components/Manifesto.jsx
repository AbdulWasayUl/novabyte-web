import React from 'react';
import { ShieldCheck, HeartHandshake, BatteryCharging, Lock } from 'lucide-react';

export default function Manifesto({ t }) {
  const commitments = [
    {
      icon: <HeartHandshake size={28} />,
      title: t.manifesto.p1Title,
      desc: t.manifesto.p1Desc
    },
    {
      icon: <ShieldCheck size={28} />,
      title: t.manifesto.p2Title,
      desc: t.manifesto.p2Desc
    },
    {
      icon: <BatteryCharging size={28} />,
      title: t.manifesto.p3Title,
      desc: t.manifesto.p3Desc
    },
    {
      icon: <Lock size={28} />,
      title: t.manifesto.p4Title,
      desc: t.manifesto.p4Desc
    }
  ];

  return (
    <section className="section-padding" id="manifesto" aria-labelledby="manifesto-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t.manifesto.tag}</div>
          <h2 id="manifesto-heading" className="section-title">
            {t.manifesto.title}
          </h2>
          <p className="section-subtitle">
            {t.manifesto.subtitle}
          </p>
        </div>

        <div className="manifesto-grid" role="region" aria-label="Studio Principles">
          {commitments.map((item, idx) => (
            <div key={idx} className="manifesto-card">
              <div className="manifesto-icon" aria-hidden="true">
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ fontSize: '0.925rem', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
