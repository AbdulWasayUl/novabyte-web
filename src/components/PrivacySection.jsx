import { ChevronDown, LockKeyhole } from 'lucide-react';

export default function PrivacySection({ t }) {
  const items = [
    [t.privacy.introTitle, t.privacy.introText],
    [t.privacy.dataTitle, t.privacy.dataText, [t.privacy.dataList1, t.privacy.dataList2, t.privacy.dataList3]],
    [t.privacy.adsTitle, t.privacy.adsText],
    [t.privacy.childrenTitle, t.privacy.childrenText],
    [t.privacy.contactTitle, t.privacy.contactText],
  ];

  return (
    <section className="section privacy-section" id="privacy" aria-labelledby="privacy-title">
      <div className="container privacy-grid">
        <div className="section-intro privacy-intro">
          <span className="privacy-icon"><LockKeyhole size={22} aria-hidden="true" /></span>
          <div className="section-kicker">{t.privacy.tag}</div>
          <h2 id="privacy-title">{t.privacy.title}</h2>
          <p>{t.privacy.subtitle}</p>
          <small>{t.privacy.lastUpdated}</small>
        </div>
        <div className="privacy-accordion">
          {items.map(([title, body, list], index) => (
            <details key={title} open={index === 0}>
              <summary><span>{title}</span><ChevronDown size={18} aria-hidden="true" /></summary>
              <div className="detail-body">
                <p>{body}</p>
                {list && <ul>{list.map((item) => <li key={item}>{item}</li>)}</ul>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
