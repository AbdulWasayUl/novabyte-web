import { ArrowUpRight, Compass, MapPin, Target } from 'lucide-react';

export default function AboutSection({ t }) {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="container editorial-grid">
        <div className="section-intro">
          <div className="section-kicker">{t.about.tag}</div>
          <h2 id="about-title">{t.about.title}</h2>
        </div>

        <div className="about-content">
          <p className="statement">{t.about.lead}</p>
          <div className="about-stories">
            <article>
              <Compass size={21} aria-hidden="true" />
              <p>{t.about.p1}</p>
            </article>
            <article>
              <Target size={21} aria-hidden="true" />
              <p>{t.about.p2}</p>
            </article>
          </div>
          <div className="location-line">
            <MapPin size={16} aria-hidden="true" />
            <span>{t.organization.locationValue}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
