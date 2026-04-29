import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Insurance Coverage for Weight Loss Treatments: Medicare, Medicaid & Private Plans – Obesity.bot',
  description: 'Learn how Medicare, Medicaid, and private insurance cover obesity treatments including GLP-1 medications, bariatric surgery, and behavioral counseling. Includes prior authorization tips.',
  keywords: 'insurance coverage weight loss, Medicare bariatric surgery, does insurance cover Wegovy, Ozempic insurance, prior authorization weight loss',
  alternates: { canonical: 'https://obesity.bot/insurance-coverage-weight-loss' },
}

const faqs = [
  { q: 'Does Medicare cover bariatric surgery?', a: 'Yes. Medicare Part A covers inpatient bariatric surgery and Part B covers outpatient procedures when performed at a certified bariatric surgery center of excellence. Patients must have a BMI ≥ 35 with at least one obesity-related comorbidity (type 2 diabetes, hypertension, etc.) and have received behavioral counseling.' },
  { q: 'Does Medicare cover GLP-1 weight loss drugs?', a: 'As of 2024, Medicare Part D covers semaglutide (Wegovy) for cardiovascular risk reduction in patients with established cardiovascular disease and BMI ≥ 27. Full coverage of GLP-1 drugs for obesity alone (without CVD) is expected to be implemented in 2026 following CMS rulemaking.' },
  { q: 'How do I get prior authorization for Wegovy or Zepbound?', a: 'Your prescriber submits a prior authorization request documenting your BMI (≥ 30 or ≥ 27 with comorbidity), failed lifestyle interventions, and that the medication is medically necessary. Attach supporting documentation including lab results and chart notes. Approval typically takes 3–10 business days; denials can be appealed.' },
  { q: 'Does Medicaid cover bariatric surgery?', a: 'Medicaid coverage varies significantly by state. As of 2024, approximately 40 states cover bariatric surgery for eligible adults. Coverage criteria, approved procedures, and prior authorization requirements vary by state Medicaid program. Check your state\'s Medicaid benefit manual or call your plan.' },
  { q: 'What if my insurance denies coverage for obesity treatment?', a: 'You have the right to appeal. Request an internal appeal with your insurer first — submit a letter of medical necessity from your doctor, peer-reviewed clinical evidence supporting the treatment, and documentation of your medical history. If denied again, request an external review by an independent review organization (IRO). Success rates for external appeals are often 30–60%.' },
  { q: 'Are there any no-cost obesity services?', a: 'Medicare Part B covers intensive behavioral counseling for obesity (up to 26 sessions in the first year) at zero cost share when provided by a primary care provider. The CDC also offers free National Diabetes Prevention Program (DPP) in many communities, which includes structured weight loss support at low or no cost.' },
]

export default function InsurancePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Insurance Coverage for Weight Loss: Complete Guide 2024',
        url: 'https://obesity.bot/insurance-coverage-weight-loss',
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
      <div className="breadcrumb"><a href="/">Home</a> › Insurance Coverage for Weight Loss</div>
      <main>
        <section className="hero">
          <div className="page-wrapper">
            <span className="hero-badge">2024–2025 Coverage Guide</span>
            <h1>Insurance Coverage for Obesity Treatment</h1>
            <p>Navigate Medicare, Medicaid, and private insurance for weight loss drugs, bariatric surgery, and behavioral counseling — including how to appeal denials.</p>
          </div>
        </section>

        <section className="content-section">
          <div className="page-wrapper">
            <div className="stat-grid">
              <div className="stat-box"><span className="stat-number">72%</span><span className="stat-label">of large employers cover bariatric surgery</span></div>
              <div className="stat-box"><span className="stat-number">25%</span><span className="stat-label">of plans cover GLP-1 drugs</span></div>
              <div className="stat-box"><span className="stat-number">$0</span><span className="stat-label">Medicare behavioral counseling cost</span></div>
              <div className="stat-box"><span className="stat-number">40+</span><span className="stat-label">states with Medicaid surgery coverage</span></div>
            </div>

            <div className="disclaimer">
              📋 Insurance coverage rules change frequently. Always verify current coverage with your specific plan before scheduling any procedure or filling a prescription. This guide reflects general coverage trends as of 2024–2025.
            </div>

            <h2>Medicare Coverage</h2>
            <h3>Bariatric Surgery (Part A/B)</h3>
            <p>Medicare covers bariatric surgery for beneficiaries who meet all of the following criteria:</p>
            <ul>
              <li>BMI ≥ 35 with at least one obesity-related comorbidity</li>
              <li>Surgery performed at a CMS-certified bariatric surgery center of excellence (COE)</li>
              <li>Beneficiary has received multidisciplinary team evaluation</li>
              <li>No prior bariatric procedure in the last 3 years</li>
            </ul>
            <p>Approved procedures include Roux-en-Y gastric bypass, laparoscopic adjustable gastric banding, and sleeve gastrectomy. Part A covers inpatient stays; Part B covers outpatient or same-day surgical procedures.</p>

            <h3>GLP-1 Medications (Part D)</h3>
            <p>As of 2024, Medicare Part D covers semaglutide (Wegovy) specifically for cardiovascular risk reduction — not solely for obesity — in adults with BMI ≥ 27 and established cardiovascular disease (prior heart attack, stroke, or peripheral artery disease). This coverage followed the FDA's approval of this expanded indication based on the SELECT trial.</p>
            <p>Full Medicare coverage of GLP-1 drugs for obesity treatment without CVD is expected through CMS regulatory action, with implementation targeted for 2026. When implemented, an estimated 3.6 million Medicare beneficiaries would become newly eligible.</p>

            <h3>Intensive Behavioral Therapy (IBT) — Part B</h3>
            <p>Medicare Part B covers intensive behavioral counseling for obesity at <strong>zero patient cost</strong> when provided by a primary care physician or qualified non-physician practitioner in a primary care setting. The benefit includes:</p>
            <ul>
              <li>1 high-intensity session (15+ minutes) per week for the first month</li>
              <li>1 session every 2 weeks for months 2–6</li>
              <li>1 monthly session for months 7–12 (if patient achieved ≥ 3 kg weight loss by month 6)</li>
            </ul>

            <h2>Medicaid Coverage by State</h2>
            <p>Medicaid coverage for obesity treatment is highly variable and set by each state's Medicaid program within federal guidelines. As of 2024:</p>
            <table className="data-table">
              <thead>
                <tr><th>Treatment</th><th>States with Coverage</th><th>Typical Requirements</th></tr>
              </thead>
              <tbody>
                <tr><td>Bariatric surgery</td><td>~40 states</td><td>BMI ≥ 40 or ≥ 35 with comorbidity; prior authorization; psychological eval</td></tr>
                <tr><td>GLP-1 medications (Wegovy)</td><td>~10–15 states</td><td>BMI ≥ 30 + failed lifestyle program; prior authorization required</td></tr>
                <tr><td>GLP-1 (Ozempic for T2D)</td><td>All states</td><td>Type 2 diabetes diagnosis required; available as diabetes treatment</td></tr>
                <tr><td>Behavioral counseling</td><td>Most states</td><td>Varies; some require referral from PCP</td></tr>
                <tr><td>Commercial weight loss programs</td><td>Few states</td><td>Rarely covered; check individual state plans</td></tr>
              </tbody>
            </table>

            <h2>Private / Employer Insurance</h2>
            <p>Coverage through employer-sponsored plans and ACA marketplace plans varies enormously. Key trends as of 2024–2025:</p>

            <h3>Bariatric Surgery</h3>
            <p>Approximately 72% of large employer plans (500+ employees) cover bariatric surgery, according to the International Foundation of Employee Benefit Plans. Requirements typically include BMI documentation, 3–6 months of supervised diet and exercise with documented results, psychological evaluation, and surgeon and facility network restrictions.</p>

            <h3>GLP-1 Weight Loss Medications</h3>
            <p>Despite the effectiveness of Wegovy and Zepbound, only about 25–35% of commercial plans currently include weight loss medications on formulary. Many plans that cover Ozempic or Mounjaro for diabetes specifically exclude the obesity-indicated versions (Wegovy, Zepbound) to limit cost. Employers' adoption is accelerating: a 2024 KFF survey found that 43% of large employers plan to add weight loss drug coverage in the next 2 years.</p>

            <div className="card-grid">
              <div className="card">
                <h4>Plans More Likely to Cover</h4>
                <p>Large self-insured employers (Fortune 500+) · Premium ACA gold/platinum plans · BCBS plans · Aetna, Cigna with obesity benefit riders</p>
              </div>
              <div className="card">
                <h4>Plans Less Likely to Cover</h4>
                <p>Small employer plans · ACA bronze/silver plans · Plans with explicit obesity medication exclusions · High-deductible plans without riders</p>
              </div>
            </div>

            <h2>How to Get Prior Authorization Approved</h2>
            <p>Prior authorization (PA) is required by nearly all plans for bariatric surgery and GLP-1 medications. Follow these steps to maximize approval chances:</p>
            <ol style={{color:'var(--text-muted)',marginLeft:24,marginBottom:16}}>
              <li style={{marginBottom:10}}><strong>Document your BMI precisely</strong> — Use measured height and weight from a clinical visit, not self-reported data.</li>
              <li style={{marginBottom:10}}><strong>Record failed interventions</strong> — Document participation in a supervised diet program, behavioral counseling, or previous medications with dates and outcomes.</li>
              <li style={{marginBottom:10}}><strong>List all comorbidities</strong> — Hypertension, T2D, sleep apnea, GERD, joint disease, and cardiovascular risk factors all strengthen medical necessity.</li>
              <li style={{marginBottom:10}}><strong>Get a detailed letter of medical necessity (LMN)</strong> — Your prescriber should cite relevant clinical guidelines (ASMBS, ACC/AHA, Obesity Medicine Association) and peer-reviewed evidence.</li>
              <li style={{marginBottom:10}}><strong>Ask about step therapy requirements</strong> — Some plans require failure of a lower-cost drug first. If so, request that medication and document the trial.</li>
              <li style={{marginBottom:10}}><strong>File the appeal immediately on denial</strong> — You typically have 30–180 days to file. Request peer-to-peer review between your doctor and the plan's medical director.</li>
            </ol>

            <h2>Manufacturer Patient Assistance Programs</h2>
            <p>Both Novo Nordisk and Eli Lilly offer savings programs to reduce out-of-pocket cost for commercially insured patients:</p>
            <ul>
              <li><strong>Novo Nordisk Patient Assistance Program:</strong> Wegovy savings card can reduce monthly cost to as low as $25 for eligible commercially insured patients.</li>
              <li><strong>Eli Lilly Savings Card (Zepbound):</strong> Can reduce cost to $25–$99/month for eligible patients.</li>
              <li>Uninsured patients below certain income thresholds may qualify for free medication through manufacturer patient assistance programs.</li>
            </ul>

            <h2>Frequently Asked Questions</h2>
            {faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-q">Q: {f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}

            <div className="cta-box">
              <h3>Know Your BMI First</h3>
              <p>Insurance eligibility for most obesity treatments starts with a BMI threshold. Check yours now.</p>
              <a href="/bmi-calculator">Calculate Your BMI →</a>
            </div>

            <div className="disclaimer">⚕️ Insurance coverage information is for general guidance only and changes frequently. Always verify your specific plan's benefits by calling the member services number on your insurance card.</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
