import { Gauge, HeartHandshake, PackageOpen, Sparkles } from 'lucide-react';

export default function StudioPillars({ t }) {
  const pillars = [
    [t.pillars.p1Title, t.pillars.p1Desc, Sparkles],
    [t.pillars.p2Title, t.pillars.p2Desc, Gauge],
    [t.pillars.p3Title, t.pillars.p3Desc, PackageOpen],
    [t.pillars.p4Title, t.pillars.p4Desc, HeartHandshake],
  ];

  return (
    <section className="section pillars-section" id="pillars" aria-labelledby="pillars-title">
      <div className="container">
        <div className="split-heading">
          <div>
            <div className="section-kicker">{t.pillars.tag}</div>
            <h2 id="pillars-title">{t.pillars.title}</h2>
          </div>
          <p>{t.pillars.subtitle}</p>
        </div>

        <div className="pillar-list">
          {pillars.map(([title, description, Icon], index) => (
            <article className="pillar" key={title}>
              <span className="pillar-number">0{index + 1}</span>
              <span className="pillar-icon"><Icon size={20} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
