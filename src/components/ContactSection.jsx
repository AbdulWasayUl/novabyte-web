import { ArrowUpRight, Mail } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection({ t, onToast }) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('publishing');
  const [message, setMessage] = useState('');
  const [hasError, setHasError] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (!message.trim()) {
      setHasError(true);
      document.getElementById('message')?.focus();
      return;
    }
    setHasError(false);
    const subjectLabels = {
      publishing: t.contact.subPublishing,
      feedback: t.contact.subFeedback,
      general: t.contact.subGeneral,
    };
    const mailSubject = `[NovaByte Studios] ${subjectLabels[subject]}`;
    const mailBody = `${message.trim()}\n\n— ${name.trim()}`;
    window.location.href = `mailto:wasay6788@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    onToast?.(t.contact.launchMailBtn);
  };

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-panel">
          <div className="contact-copy">
            <div className="section-kicker">{t.contact.tag}</div>
            <h2 id="contact-title">{t.contact.title}</h2>
            <p>{t.contact.subtitle}</p>
            <div className="mail-note"><Mail size={18} aria-hidden="true" /><span>{t.contact.mailClientHint}</span></div>
          </div>

          <form className="contact-form" onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="name">{t.contact.name}</label>
              <input id="name" name="name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="subject">{t.contact.subject}</label>
              <select id="subject" name="subject" value={subject} onChange={(event) => setSubject(event.target.value)}>
                <option value="publishing">{t.contact.subPublishing}</option>
                <option value="feedback">{t.contact.subFeedback}</option>
                <option value="general">{t.contact.subGeneral}</option>
              </select>
            </div>
            <div className="field field-full">
              <label htmlFor="message">{t.contact.message} <span aria-hidden="true">*</span></label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                aria-invalid={hasError}
                aria-describedby={hasError ? 'message-error' : undefined}
                value={message}
                onChange={(event) => { setMessage(event.target.value); if (hasError) setHasError(false); }}
              />
              {hasError && <p className="field-error" id="message-error" role="alert">{t.contact.message} *</p>}
            </div>
            <button className="button form-submit" type="submit">
              {t.contact.launchMailBtn}<ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
