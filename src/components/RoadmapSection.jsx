import React from 'react';
import { Layers, Sparkles, Clock, CheckCircle } from 'lucide-react';

export default function RoadmapSection({ t }) {
  const prototypes = [
    {
      title: t.roadmap.proto1Title,
      genre: t.roadmap.proto1Genre,
      status: t.roadmap.proto1Status,
      desc: t.roadmap.proto1Desc,
      target: 'Q4 2026',
      engine: 'Godot 4.6.3'
    },
    {
      title: t.roadmap.proto2Title,
      genre: t.roadmap.proto2Genre,
      status: t.roadmap.proto2Status,
      desc: t.roadmap.proto2Desc,
      target: 'Q4 2026',
      engine: 'Godot 4.6.3'
    },
    {
      title: t.roadmap.proto3Title,
      genre: t.roadmap.proto3Genre,
      status: t.roadmap.proto3Status,
      desc: t.roadmap.proto3Desc,
      target: 'Q1 2027',
      engine: 'Godot 4.6.3'
    }
  ];

  return (
    <section className="section-padding" id="roadmap" aria-labelledby="roadmap-title">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t.roadmap.tag}</div>
          <h2 id="roadmap-title" className="section-title">
            {t.roadmap.title}
          </h2>
          <p className="section-subtitle">
            {t.roadmap.subtitle}
          </p>
        </div>

        <div className="roadmap-grid" role="region" aria-label="Development Roadmap">
          {prototypes.map((proto, idx) => (
            <article key={idx} className="prototype-card">
              <div className="prototype-badge-row">
                <span className="status-badge">{proto.status}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>{proto.genre}</span>
              </div>

              <h3>{proto.title}</h3>
              <p>{proto.desc}</p>

              <div className="prototype-meta">
                <span>⚙️ {proto.engine}</span>
                <span>📅 Target: {proto.target}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
