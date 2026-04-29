import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Weight Loss Surgery Guide: Gastric Sleeve, Bypass & More – Obesity.bot',
  description: 'Complete guide to bariatric surgery options including gastric sleeve, gastric bypass, and duodenal switch. Learn about eligibility, costs, risks, and long-term outcomes.',
  keywords: 'bariatric surgery, gastric sleeve, gastric bypass, weight loss surgery, bariatric surgery cost, sleeve gastrectomy, duodenal switch',
  alternates: { canonical: 'https://obesity.bot/weight-loss-surgery-guide' },
}

const faqs = [
  { q: 'Am I eligible for weight loss surgery?', a: 'Standard eligibility requires BMI ≥ 40 or BMI ≥ 35 with at least one serious weight-related comorbidity (such as type 2 diabetes, hypertension, or sleep apnea). Some programs also accept BMI 30–35 for certain metabolic conditions. You must also demonstrate a history of failed non-surgical weight loss attempts and be medically fit for surgery.' },
  { q: 'How much weight will I lose with bariatric surgery?', a: 'Average results vary by procedure. Gastric sleeve typically produces 60–70% excess weight loss (EWL). Roux-en-Y gastric bypass averages 70–80% EWL. Duodenal switch achieves 75–85% EWL. Results at 1 year represent peak loss; some regain is typical at 5+ years.' },
  { q: 'What are the risks of bariatric surgery?', a: 'Overall surgical mortality risk is 0.1–0.3%, comparable to gallbladder removal. Serious complications occur in 3–5% of patients and include anastomotic leaks, blood clots, and infections. Long-term risks include nutritional deficiencies (requiring lifelong supplementation), GERD, and, rarely, revision surgery.' },
  { q: 'Will insurance cover bariatric surgery?', a: 'Most major insurers cover bariatric surgery for eligible patients. Medicare covers approved procedures. Coverage typically requires BMI documentation, 3–6 months of medically supervised weight loss, psychological evaluation, and pre-surgical testing. Medicaid coverage varies significantly by state.' },
  { q: 'How long is recovery from bariatric surgery?', a: 'Most patients are discharged within 1–2 days. Return to light activity is typically possible in 1–2 weeks; strenuous exercise in 4–6 weeks. The full liquid to solid food progression takes 4–6 weeks. Most patients return to full activity and work within 3–4 weeks.' },
  { q: 'What is life like after bariatric surgery?', a: 'Long-term success requires permanent lifestyle changes: smaller portion sizes, high-protein diet, no drinking while eating, lifelong vitamin/mineral supplementation, and regular follow-up visits. Most patients report dramatic improvement in quality of life, and many experience remission of type 2 diabetes, sleep apnea, and hypertension.' },
]

export default function SurgeryGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        name: 'Weight Loss Surgery Guide',
        url: 'https://obesity.bot/weight-loss-surgery-guide',
        about: { '@type': 'MedicalProcedure', name: 'Bariatric Surgery' },
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
      <div className="breadcrumb"><a href="/">Home</a> › Weight Loss Surgery Guide</div>
      <main>
        <section className="hero">
          <div className="page-wrapper">
            <span className="hero-badge">Clinically Reviewed · 2025</span>
            <h1>Weight Loss Surgery: Complete Bariatric Guide</h1>
            <p>Understand every procedure, from gastric sleeve to bypass to duodenal switch — including eligibility, costs, risks, and what to expect before and after surgery.</p>
          </div>
        </section>

        <section className="content-section">
          <div className="page-wrapper">
            <div className="stat-grid">
              <div className="stat-box"><span className="stat-number">270K</span><span className="stat-label">US bariatric procedures/year</span></div>
              <div className="stat-box"><span className="stat-number">70%</span><span className="stat-label">Avg. excess weight loss</span></div>
              <div className="stat-box"><span className="stat-number">0.1%</span><span className="stat-label">30-day mortality rate</span></div>
              <div className="stat-box"><span className="stat-number">80%</span><span className="stat-label">T2D remission rate (bypass)</span></div>
            </div>

            <h2>Is Bariatric Surgery Right for You?</h2>
            <p>Bariatric surgery is not a cosmetic procedure — it is a serious medical intervention for severe obesity that has failed other treatments. It is currently the most effective long-term treatment for class II and III obesity, producing dramatic improvements not only in weight but in metabolic diseases, cardiovascular risk, sleep apnea, joint disease, and quality of life.</p>
            <p>The American Society for Metabolic and Bariatric Surgery (ASMBS) and the International Federation for the Surgery of Obesity (IFSO) updated their eligibility guidelines in 2022 to lower the BMI thresholds — recognizing that the metabolic benefits of surgery can occur at BMIs lower than the historical 35–40 cutoffs.</p>

            <h2>Eligibility Criteria</h2>
            <ul>
              <li><strong>BMI ≥ 40</strong> without weight-related comorbidities, or</li>
              <li><strong>BMI ≥ 35</strong> with at least one obesity-related comorbidity (T2D, hypertension, sleep apnea, GERD, fatty liver disease, joint disease), or</li>
              <li><strong>BMI 30–35</strong> with metabolic disease (per updated 2022 ASMBS guidelines) — though insurance coverage at this range is limited</li>
              <li>Age 18–65 (some programs accept teens 13–17 or adults over 65 with careful selection)</li>
              <li>Documentation of prior non-surgical weight loss attempts</li>
              <li>Absence of active substance use disorder or untreated psychiatric conditions</li>
              <li>Commitment to lifelong dietary, supplement, and follow-up requirements</li>
            </ul>

            <h2>Procedure Comparison</h2>

            <h3>Sleeve Gastrectomy (Gastric Sleeve)</h3>
            <p>The most commonly performed bariatric procedure in the US (~65% of all cases). The surgeon removes approximately 75–80% of the stomach, creating a narrow tube or "sleeve." This restricts food intake and also reduces levels of ghrelin, the appetite-stimulating hormone produced primarily in the stomach.</p>
            <div className="card-grid">
              <div className="card"><h4>✅ Advantages</h4><p>Simpler than bypass · No intestinal rerouting · Lower risk of nutritional deficiency · Laparoscopic · Good long-term data</p></div>
              <div className="card"><h4>⚠️ Considerations</h4><p>Irreversible · Can worsen GERD in some patients · 10–15% of patients convert to bypass by 10 years</p></div>
            </div>

            <h3>Roux-en-Y Gastric Bypass (RYGB)</h3>
            <p>Considered the gold standard for metabolic surgery. The stomach is divided into a small pouch (~30 mL) connected directly to the middle of the small intestine, bypassing the rest of the stomach and the duodenum. This creates both restriction and malabsorption and produces significant hormonal changes.</p>
            <div className="card-grid">
              <div className="card"><h4>✅ Advantages</h4><p>Greatest metabolic benefit · 80%+ type 2 diabetes remission · Strong 30-year outcome data · Better for severe GERD</p></div>
              <div className="card"><h4>⚠️ Considerations</h4><p>More complex surgery · Higher nutritional deficiency risk · Dumping syndrome possible · Difficult to revise</p></div>
            </div>

            <h3>Duodenal Switch (BPD-DS)</h3>
            <p>The most aggressive bariatric procedure. Combines sleeve gastrectomy with extensive intestinal bypass. Produces the greatest weight loss but also the highest risk of nutritional deficiencies. Typically reserved for patients with BMI ≥ 50 or those who need the most aggressive metabolic intervention.</p>

            <h3>Adjustable Gastric Band</h3>
            <p>An inflatable silicone band placed around the upper stomach. Once popular, it has declined dramatically — accounting for under 2% of US procedures — due to high revision rates, device complications, and inferior long-term weight loss versus sleeve and bypass.</p>

            <h2>The Surgery Journey: Step by Step</h2>
            <ol style={{color:'var(--text-muted)',marginLeft:24,marginBottom:16}}>
              <li style={{marginBottom:10}}><strong>Referral & initial consultation</strong> — Your PCP refers you to a bariatric program or you self-refer. Initial consultation covers history, BMI documentation, and goal-setting.</li>
              <li style={{marginBottom:10}}><strong>Pre-operative evaluation</strong> — Blood work, sleep study, upper endoscopy, cardiac clearance, and nutritional and psychological evaluations. Takes 4–12 weeks.</li>
              <li style={{marginBottom:10}}><strong>Insurance approval</strong> — Your program submits documentation. Most plans require 3–6 months of supervised diet. Approval typically takes 4–8 weeks.</li>
              <li style={{marginBottom:10}}><strong>Pre-op liver-shrinking diet</strong> — 2–4 weeks of very low calorie diet before surgery to reduce liver size and surgical risk.</li>
              <li style={{marginBottom:10}}><strong>Surgery day</strong> — Laparoscopic (minimally invasive) in most cases. Procedure time: 1–3 hours depending on type.</li>
              <li style={{marginBottom:10}}><strong>Hospital stay</strong> — Typically 1–2 nights. Liquid diet started within hours of surgery.</li>
              <li style={{marginBottom:10}}><strong>Recovery</strong> — Soft/pureed foods for 4–6 weeks. Return to work in 2–4 weeks (desk jobs); longer for physical work.</li>
              <li style={{marginBottom:10}}><strong>Lifelong follow-up</strong> — Annual or biannual visits with bariatric team; lifelong vitamin/mineral supplementation required.</li>
            </ol>

            <h2>Cost and Insurance</h2>
            <p>The average total cost of bariatric surgery in the US ranges from $15,000 to $35,000 depending on procedure, location, and program. With insurance coverage (commercial plans, Medicare, or Medicaid where applicable), patient out-of-pocket cost is typically limited to deductibles and copays — often $2,000–$5,000 total.</p>
            <p>For patients without coverage, medical tourism to Mexico, Costa Rica, or other countries can reduce cost to $4,000–$10,000, though quality, safety standards, and follow-up care vary significantly and carry additional risk.</p>

            <div className="cta-box">
              <h3>Not Sure If Surgery Is Right?</h3>
              <p>Compare surgery vs. GLP-1 medications to find the best fit for your situation.</p>
              <a href="/obesity-treatment-options">Compare All Treatments →</a>
            </div>

            <h2>Frequently Asked Questions</h2>
            {faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-q">Q: {f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}

            <div className="disclaimer">⚕️ Bariatric surgery involves significant risks. This guide is for educational purposes only. Consult a board-certified bariatric surgeon and your healthcare team to determine if surgery is appropriate for you.</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
