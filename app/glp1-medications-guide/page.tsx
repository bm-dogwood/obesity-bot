import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'GLP-1 Medications Guide: Ozempic, Wegovy, Mounjaro & Zepbound – Obesity.bot',
  description: 'Complete guide to GLP-1 weight loss drugs including semaglutide (Wegovy, Ozempic) and tirzepatide (Zepbound, Mounjaro). Compare efficacy, side effects, costs, and insurance coverage.',
  keywords: 'GLP-1 medications, Ozempic for weight loss, Wegovy, Mounjaro, Zepbound, semaglutide, tirzepatide, weight loss injections',
  alternates: { canonical: 'https://obesity.bot/glp1-medications-guide' },
}

const faqs = [
  { q: 'What is a GLP-1 receptor agonist?', a: 'GLP-1 (glucagon-like peptide-1) receptor agonists are a class of drugs that mimic the GLP-1 hormone produced in the gut after eating. They work by slowing gastric emptying, stimulating insulin release, and signaling the brain to reduce appetite — resulting in significant weight loss.' },
  { q: 'What is the difference between Ozempic and Wegovy?', a: 'Both contain semaglutide, but at different doses. Wegovy (up to 2.4 mg weekly) is FDA-approved specifically for chronic weight management. Ozempic (up to 2.0 mg weekly) is approved for type 2 diabetes but is widely prescribed off-label for weight loss.' },
  { q: 'How much weight can I lose on Wegovy?', a: 'In the STEP 1 clinical trial, participants taking semaglutide 2.4 mg lost an average of 14.9% of body weight over 68 weeks compared to 2.4% with placebo. About one-third of participants lost 20% or more of their body weight.' },
  { q: 'What are the common side effects of GLP-1 drugs?', a: 'The most common side effects are gastrointestinal: nausea, vomiting, diarrhea, and constipation. These typically improve after the first few weeks. Serious but rare risks include pancreatitis and, in rodent studies (but not humans), thyroid tumors. GLP-1 drugs are contraindicated in people with a personal or family history of medullary thyroid cancer.' },
  { q: 'Will insurance cover GLP-1 weight loss medications?', a: 'Coverage varies widely. Wegovy and Zepbound are covered by some commercial plans and by Medicare Part D (for cardiovascular risk reduction, per 2024 guidance), but many plans still exclude them. Prior authorization is usually required, and BMI ≥ 30 (or ≥ 27 with comorbidity) is typically needed.' },
  { q: 'What happens if I stop taking GLP-1 medications?', a: 'Discontinuation typically results in significant weight regain — studies show most patients regain roughly two-thirds of lost weight within a year of stopping. This underscores that obesity is a chronic disease requiring ongoing management, similar to blood pressure or cholesterol medications.' },
]

export default function GLP1GuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'GLP-1 Medications Complete Guide: Ozempic, Wegovy, Mounjaro, Zepbound',
        url: 'https://obesity.bot/glp1-medications-guide',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <div className="breadcrumb"><a href="/">Home</a> › GLP-1 Medications Guide</div>
      <main>
        <section className="hero">
          <div className="page-wrapper">
            <span className="hero-badge">Updated 2025 · Clinically Reviewed</span>
            <h1>GLP-1 Weight Loss Medications: Complete Guide</h1>
            <p>Everything you need to know about semaglutide, tirzepatide, and the next generation of obesity drugs — efficacy, side effects, costs, and how to access them.</p>
          </div>
        </section>

        <section className="content-section">
          <div className="page-wrapper">
            <h2>What Are GLP-1 Medications?</h2>
            <p>GLP-1 receptor agonists are a class of injectable (and increasingly oral) medications that mimic the action of glucagon-like peptide-1, a hormone secreted by cells in the small intestine in response to eating. Originally developed for type 2 diabetes management, their dramatic weight loss effects led to dedicated obesity indications from the FDA.</p>
            <p>The mechanism is multifaceted: GLP-1 drugs slow the rate at which food leaves the stomach (gastric emptying), reduce appetite signals in the hypothalamus, and stimulate insulin release while suppressing glucagon. The net result is significant, sustained caloric reduction without the willpower battles associated with traditional dieting.</p>

            <div className="stat-grid">
              <div className="stat-box"><span className="stat-number">15–22%</span><span className="stat-label">Average body weight loss</span></div>
              <div className="stat-box"><span className="stat-number">5M+</span><span className="stat-label">Americans currently prescribed</span></div>
              <div className="stat-box"><span className="stat-number">20%</span><span className="stat-label">Cardiovascular event reduction</span></div>
              <div className="stat-box"><span className="stat-number">$1,000+</span><span className="stat-label">Monthly list price (no insurance)</span></div>
            </div>

            <h2>Drug-by-Drug Breakdown</h2>

            <h3>Semaglutide — Wegovy & Ozempic (Novo Nordisk)</h3>
            <div className="card-grid">
              <div className="card">
                <h4>Wegovy (Weight Loss)</h4>
                <p><span className="tag">FDA 2021</span> 2.4 mg weekly injection. Average 15% weight loss in STEP trials. Indicated for BMI ≥ 30 or ≥ 27 with comorbidity. Monthly cost ~$1,350.</p>
              </div>
              <div className="card">
                <h4>Ozempic (Diabetes)</h4>
                <p><span className="tag">FDA 2017</span> Up to 2.0 mg weekly. Widely prescribed off-label for weight loss. Lower dose than Wegovy but similar mechanism. Monthly cost ~$900–$1,000.</p>
              </div>
            </div>
            <p>Semaglutide's landmark SELECT trial (2023, n=17,604) demonstrated a 20% reduction in major adverse cardiovascular events (MACE) in people with obesity and established cardiovascular disease — a breakthrough that led to expanded coverage under Medicare Part D in 2024.</p>

            <h3>Tirzepatide — Zepbound & Mounjaro (Eli Lilly)</h3>
            <div className="card-grid">
              <div className="card">
                <h4>Zepbound (Weight Loss)</h4>
                <p><span className="tag">FDA 2023</span> Dual GLP-1/GIP agonist. 15 mg weekly injection. Average 20–22% weight loss in SURMOUNT trials — superior to any prior medication. Monthly cost ~$1,060.</p>
              </div>
              <div className="card">
                <h4>Mounjaro (Diabetes)</h4>
                <p><span className="tag">FDA 2022</span> Same molecule as Zepbound. Up to 15 mg weekly. Broadly used off-label for weight management in type 2 diabetes patients.</p>
              </div>
            </div>
            <p>The SURMOUNT-1 trial (n=2,539) showed that participants on tirzepatide 15 mg lost a mean 22.5% of body weight — the highest efficacy ever demonstrated for a pharmacologic obesity treatment. Approximately 57% of participants achieved ≥ 20% weight loss, a threshold previously associated only with bariatric surgery.</p>

            <h3>Older GLP-1 Agents</h3>
            <table className="data-table">
              <thead>
                <tr><th>Drug</th><th>Brand</th><th>Dosing</th><th>Avg. Loss</th><th>Notes</th></tr>
              </thead>
              <tbody>
                <tr><td>Liraglutide</td><td>Saxenda</td><td>3 mg/day injection</td><td>~8%</td><td>FDA-approved for obesity since 2014; daily dosing less convenient</td></tr>
                <tr><td>Exenatide</td><td>Byetta, Bydureon</td><td>Weekly injection</td><td>~3–5%</td><td>Primarily diabetes use; modest weight loss</td></tr>
              </tbody>
            </table>

            <h2>Emerging Medications (Pipeline)</h2>
            <p>The next wave of obesity pharmacology is already in late-stage trials:</p>
            <ul>
              <li><strong>Retatrutide (Eli Lilly):</strong> Triple agonist (GLP-1/GIP/glucagon). Phase 2 data showed up to 24.2% weight loss at 48 weeks — potentially surpassing tirzepatide.</li>
              <li><strong>Orforglipron (Eli Lilly):</strong> Oral GLP-1 pill (non-peptide). Phase 3 results showed ~15% weight loss — matching injections without needles.</li>
              <li><strong>Cagrilintide + semaglutide (CagriSema, Novo Nordisk):</strong> Combination of amylin analog and semaglutide. Phase 3 data showed ~22% weight loss.</li>
              <li><strong>Amycretin (Novo Nordisk):</strong> Oral GLP-1/amylin combination. Phase 1 data showed 13% loss in 12 weeks — remarkable for an oral agent.</li>
            </ul>

            <h2>Side Effects and Safety Profile</h2>
            <p>GLP-1 medications have a well-characterized safety profile built from years of use in type 2 diabetes. The most common side effects are gastrointestinal and dose-dependent:</p>
            <ul>
              <li><strong>Nausea:</strong> Affects 40–50% of patients, especially during dose escalation. Usually resolves within 4–8 weeks.</li>
              <li><strong>Vomiting:</strong> Less common than nausea; typically manageable with slower dose titration.</li>
              <li><strong>Diarrhea / Constipation:</strong> Occur in 20–30% of patients.</li>
              <li><strong>Injection site reactions:</strong> Mild and transient; occur with all injectable forms.</li>
            </ul>
            <p>Serious adverse events are uncommon. Pancreatitis has been reported rarely. GLP-1 drugs carry a boxed warning for thyroid C-cell tumors based on rodent studies, though human relevance remains unestablished. They are contraindicated in patients with a personal or family history of medullary thyroid carcinoma or MEN2 syndrome.</p>

            <h2>Cost and Access</h2>
            <p>The high list price of GLP-1 drugs remains the primary access barrier for millions of patients. Without insurance, monthly costs range from $1,000 to $1,500. Options to reduce out-of-pocket cost include:</p>
            <ul>
              <li><strong>Manufacturer savings cards:</strong> Novo Nordisk and Eli Lilly offer savings programs that can reduce cost to $25–$99/month for commercially insured patients.</li>
              <li><strong>Medicare Part D:</strong> As of 2024, semaglutide is covered for cardiovascular risk reduction in eligible beneficiaries. Full obesity coverage expansion is expected in 2026.</li>
              <li><strong>Compounded semaglutide:</strong> Available during FDA shortage periods but quality and safety are not guaranteed. The FDA has warned about compounded versions.</li>
              <li><strong>Prior authorization:</strong> Required by most plans. Your provider will need to document BMI, failed lifestyle interventions, and weight-related comorbidities.</li>
            </ul>

            <div className="cta-box">
              <h3>Is Surgery a Better Option for You?</h3>
              <p>Compare GLP-1 medications versus bariatric surgery with our detailed guide.</p>
              <a href="/weight-loss-surgery-guide">View Surgery Guide →</a>
            </div>

            <h2>Frequently Asked Questions</h2>
            {faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-q">Q: {f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}

            <div className="disclaimer">⚕️ GLP-1 medications require a prescription. This guide is educational only. Discuss eligibility, dosing, and risks with your healthcare provider.</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
