import { Building2, CheckCircle2, CircleDashed } from 'lucide-react';

export default function OrganizationDetails({ t }) {
  const credentials = [
    [t.organization.legalName, 'NovaByte Studios', false],
    [t.organization.entityType, t.organization.entityValue, false],
    [t.organization.dunsStatus, t.organization.dunsValue, true],
    [t.organization.location, t.organization.locationValue, false],
    [t.organization.targetAccount, t.organization.targetValue, true],
  ];

  return (
    <section className="section organization-section" id="organization" aria-labelledby="org-title">
      <div className="container">
        <div className="organization-panel">
          <div className="organization-copy">
            <span className="proof-icon"><Building2 size={23} aria-hidden="true" /></span>
            <div className="section-kicker">{t.organization.tag}</div>
            <h2 id="org-title">{t.organization.title}</h2>
            <p>{t.organization.subtitle}</p>
          </div>
          <dl className="credentials">
            {credentials.map(([term, value, pending]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>
                  {pending
                    ? <CircleDashed size={16} aria-hidden="true" />
                    : <CheckCircle2 size={16} aria-hidden="true" />}
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
