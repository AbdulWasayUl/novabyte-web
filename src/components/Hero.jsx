import { ArrowDownRight, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero({ t }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span aria-hidden="true" />{t.hero.statusBadge}</div>
          <h1 id="hero-title">
            {t.hero.titleStart}
            <em>{t.hero.titleHighlight}</em>
          </h1>
          <p className="hero-lead">{t.hero.lead}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#pillars">
              {t.hero.ctaPrimary}<ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="text-link" href="#organization">
              <ShieldCheck size={17} aria-hidden="true" />{t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="game-window">
            <div className="game-topbar"><span /><span /><span /></div>
            <div className="game-canvas">
              <div className="pixel pixel-a" />
              <div className="pixel pixel-b" />
              <div className="pixel pixel-c" />
              <div className="player-mark"><i /><i /></div>
              <div className="track-line" />
              <div className="score-card"><b>60</b><small>FPS</small></div>
            </div>
          </div>
          <div className="floating-card float-size">
            <small>{t.hero.facts.targetSub}</small>
            <strong>{t.hero.facts.target}</strong>
          </div>
          <div className="floating-card float-engine">
            <small>{t.hero.facts.engineSub}</small>
            <strong>{t.hero.facts.engine}</strong>
          </div>
        </div>
      </div>

      <div className="container hero-proof">
        {[t.hero.facts.engine, t.hero.facts.craft, t.hero.facts.target].map((fact, index) => (
          <div key={fact}><span>0{index + 1}</span><strong>{fact}</strong></div>
        ))}
        <a href="#about" aria-label={t.nav?.about || t.hero.ctaPrimary}><ArrowDownRight size={24} /></a>
      </div>
    </section>
  );
}
