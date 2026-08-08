import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export default function FaqSection({ t }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [query, setQuery] = useState('');

  const faqs = [
    {
      q: 'Why did NovaByte Studios choose Godot 4.6.3 over Unity 6?',
      a: 'Godot 4.6.3 is completely free and MIT-licensed with zero revenue share and no surprise runtime fees. It produces ultra-small 25MB APK binaries with instant 2-second boot times, and its GDScript engine eliminates compilation delays during our 15-day sprint cycles.'
    },
    {
      q: 'How does the 15-Day production cycle prevent Google Play Spam flags?',
      a: 'We allocate 30–50 focused engineering hours per title to craft completely distinct mechanics, unique vector/pixel art packs, handcrafted level curves, and independent store listings. We never ship lazy reskins with identical content.'
    },
    {
      q: 'What is the advantage of a Google Play Organization account?',
      a: 'Organization accounts are verified using a registered legal entity and D-U-N-S number. This grants direct production publishing access, exempting our studio from Google\'s 14-day / 12-tester closed testing requirement.'
    },
    {
      q: 'What are the rules regarding ad frequency in NovaByte games?',
      a: 'We enforce a strict 60-second minimum gameplay grace period before any interstitial ad, and never trigger ads on game launch or during tutorials. Our primary monetization revolves around player-chosen rewarded video continues and 2x boosts.'
    },
    {
      q: 'Are your games compliant with Android 16 (Target SDK 36)?',
      a: 'Yes. All our Gradle export templates and GitHub Actions CI pipelines compile strictly with compileSdkVersion=36 and targetSdkVersion=36, ensuring full compliance with Google Play requirements.'
    },
    {
      q: 'How is user progress and game state saved?',
      a: 'All titles save progression locally to user://save.json on application pause. Optional cloud synchronization is handled via Google Play Games Services, requiring zero custom servers or login passwords.'
    }
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="section-padding" id="faq" aria-labelledby="faq-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t.faq.tag}</div>
          <h2 id="faq-heading" className="section-title">
            {t.faq.title}
          </h2>
          <p className="section-subtitle">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Live Search */}
        <div className="faq-search">
          <Search
            size={18}
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: 14,
              color: 'var(--text-faint)'
            }}
            aria-hidden="true"
          />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: 42 }}
            placeholder={t.faq.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search FAQ questions"
          />
        </div>

        {/* Accordion List */}
        <div className="accordion-list" role="region" aria-label="FAQ Questions">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`accordion-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="accordion-btn"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <HelpCircle size={18} className="text-emerald-400" aria-hidden="true" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform var(--transition-fast)'
                    }}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="accordion-content"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
