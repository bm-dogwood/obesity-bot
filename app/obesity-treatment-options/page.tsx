import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Obesity Treatment Options: Diet, Medications & Surgery Compared – Obesity.bot',
  description: 'Compare obesity treatment options including low-calorie diets, FDA-approved weight loss drugs (GLP-1 agonists), and bariatric surgery. See efficacy, costs, and eligibility.',
  keywords: 'obesity treatment options, weight loss treatments, diet vs surgery, GLP-1 vs bariatric surgery, obesity medication comparison',
  alternates: { canonical: 'https://obesity.bot/obesity-treatment-options' },
}

const faqs = [
  { q: 'What is the most effective obesity treatment?', a: 'Bariatric surgery produces the largest and most durable weight loss (typically 25–35% of body weight). GLP-1 medications like semaglutide achieve 15–20% loss in clinical trials. Lifestyle interventions alone typically achieve 5–10% sustained loss. The best treatment depends on your BMI, health conditions, preferences, and insurance coverage.' },
  { q: 'Can I combine treatments?', a: 'Yes. Combination approaches are increasingly used. Many patients take GLP-1 medications after bariatric surgery to maintain or extend weight loss. Lifestyle therapy is always recommended alongside medical and surgical treatments.' },
  { q: 'Are GLP-1 drugs better than surgery?', a: 'Surgery produces greater average weight loss and has more long-term data. However, GLP-1 agonists are non-surgical, reversible, and highly effective — making them a compelling option for patients who are not surgical candidates or prefer to avoid surgery.' },
  { q: 'What BMI qualifies for obesity treatment?', a: 'Lifestyle programs are recommended at any BMI. Medications are approved at BMI ≥ 30 (or ≥ 27 with a weight-related condition). Surgery is typically covered at BMI ≥ 40 or ≥ 35 with serious comorbidities.' },
]

export default function TreatmentOptionsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Obesity Treatment Options: Complete Comparison Guide',
        url: 'https://obesity.bot/obesity-treatment-options',
        publisher: { '@type': 'Organization', name: 'Obesity.bot', url: 'https://obesity.bot' },
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
      <div className="breadcrumb"><a href="/">Home</a> › Obesity Treatment Options</div>
      <main>
        <section className="hero">
          <div className="page-wrapper">
            <span className="hero-badge">Evidence-Based Comparison</span>
            <h1>Obesity Treatment Options Compared</h1>
            <p>From lifestyle programs to prescription medications to surgery — understand what each approach achieves, costs, and requires.</p>
          </div>
        </section>

        <section className="content-section">
          <div className="page-wrapper">
            <div className="stat-grid">
              <div className="stat-box"><span className="stat-number">5–10%</span><span className="stat-label">Lifestyle intervention avg. loss</span></div>
              <div className="stat-box"><span className="stat-number">15–22%</span><span className="stat-label">GLP-1 medication avg. loss</span></div>
              <div className="stat-box"><span className="stat-number">25–35%</span><span className="stat-label">Bariatric surgery avg. loss</span></div>
              <div className="stat-box"><span className="stat-number">$0–$30K</span><span className="stat-label">Cost range across treatments</span></div>
            </div>

            <h2>Overview of Treatment Approaches</h2>
            <p>Obesity is a chronic, complex disease requiring long-term management. The American Academy of Family Physicians, the Obesity Medicine Association, and the American Society for Metabolic and Bariatric Surgery all recommend a stepwise approach to treatment — starting with the least invasive and escalating based on response and severity.</p>
            <p>Critically, obesity treatment is most effective when it addresses the biological, behavioral, and social drivers of weight — not just caloric intake. Modern obesity medicine recognizes the disease as a failure of normal satiety regulation, driven largely by hormonal dysregulation that medications and surgery can directly address.</p>

            <h2>Lifestyle & Behavioral Interventions</h2>
            <p>Intensive lifestyle intervention (ILI) — combining a reduced-calorie diet, increased physical activity, and behavioral counseling — remains the foundation of obesity treatment. The landmark Diabetes Prevention Program demonstrated that participants who lost 7% of body weight through lifestyle changes reduced their risk of developing type 2 diabetes by 58%.</p>

            <h3>Diet Approaches</h3>
            <div className="card-grid">
              <div className="card">
                <h4>Very Low Calorie Diet (VLCD)</h4>
                <p>800–1,200 kcal/day. Typically meal-replacement based. Rapid initial weight loss of 3–5 lbs/week but difficult to maintain without medical supervision.</p>
              </div>
              <div className="card">
                <h4>Mediterranean Diet</h4>
                <p>Strong cardiovascular evidence. Promotes whole grains, healthy fats, fish, and vegetables. Sustainable long-term with good adherence data.</p>
              </div>
              <div className="card">
                <h4>Low-Carbohydrate / Ketogenic</h4>
                <p>Effective for rapid short-term loss and blood sugar improvement. Long-term adherence is lower than Mediterranean-style approaches.</p>
              </div>
              <div className="card">
                <h4>Commercial Programs</h4>
                <p>WeightWatchers (WW), Jenny Craig, OPTIFAST, and Nutrisystem provide structure, accountability, and community support with variable efficacy.</p>
              </div>
            </div>

            <h2>Pharmacological Treatment (Weight Loss Medications)</h2>
            <p>The FDA has approved several medications specifically for chronic weight management. The newest and most effective class are GLP-1 receptor agonists, which mimic gut hormones to suppress appetite and slow gastric emptying.</p>

            <table className="data-table">
              <thead>
                <tr><th>Medication</th><th>Type</th><th>Avg. Weight Loss</th><th>FDA Approved</th><th>Monthly Cost</th></tr>
              </thead>
              <tbody>
                <tr><td>Wegovy (semaglutide)</td><td>GLP-1 agonist</td><td>~15%</td><td>2021</td><td>$1,300–$1,500</td></tr>
                <tr><td>Zepbound (tirzepatide)</td><td>GLP-1 / GIP dual</td><td>~20–22%</td><td>2023</td><td>$1,060–$1,200</td></tr>
                <tr><td>Qsymia</td><td>Phentermine/topiramate</td><td>~9%</td><td>2012</td><td>$150–$250</td></tr>
                <tr><td>Contrave</td><td>Naltrexone/bupropion</td><td>~5%</td><td>2014</td><td>$100–$200</td></tr>
                <tr><td>Saxenda (liraglutide)</td><td>GLP-1 agonist</td><td>~8%</td><td>2014</td><td>$1,200–$1,400</td></tr>
              </tbody>
            </table>

            <h2>Bariatric (Weight Loss) Surgery</h2>
            <p>Bariatric surgery is the most effective long-term treatment for severe obesity. It works through restriction (reducing stomach size), malabsorption (bypassing part of the small intestine), or hormonal changes (altering gut hormone secretion). More than 200,000 procedures are performed annually in the United States.</p>

            <table className="data-table">
              <thead>
                <tr><th>Procedure</th><th>Mechanism</th><th>Avg. Weight Loss</th><th>Reversible?</th><th>Avg. Cost</th></tr>
              </thead>
              <tbody>
                <tr><td>Gastric Sleeve (Sleeve Gastrectomy)</td><td>Restriction</td><td>60–70% EWL*</td><td>No</td><td>$15,000–$25,000</td></tr>
                <tr><td>Roux-en-Y Gastric Bypass</td><td>Restriction + malabsorption</td><td>70–80% EWL</td><td>Difficult</td><td>$20,000–$35,000</td></tr>
                <tr><td>Adjustable Gastric Band</td><td>Restriction</td><td>40–50% EWL</td><td>Yes</td><td>$10,000–$20,000</td></tr>
                <tr><td>Duodenal Switch (BPD/DS)</td><td>Restriction + strong malabsorption</td><td>75–85% EWL</td><td>No</td><td>$25,000–$45,000</td></tr>
              </tbody>
            </table>
            <p style={{fontSize:13,color:'var(--text-muted)'}}>*EWL = Excess Weight Loss</p>

            <h2>Head-to-Head: GLP-1 Medications vs. Surgery</h2>
            <p>A landmark 2024 meta-analysis in <em>JAMA Surgery</em> compared outcomes from tirzepatide and bariatric surgery. While surgery produced greater average weight loss (27% vs. 21%), tirzepatide patients showed comparable improvements in blood sugar control and nearly equivalent reductions in cardiovascular risk factors at 1 year — positioning GLP-1 agonists as a meaningful alternative for many patients.</p>
            <p>However, surgery has decades of long-term outcome data, and most studies show that weight regain is more common with medications once discontinued. Surgery may offer more durable metabolic remission, particularly for type 2 diabetes.</p>

            <h2>Choosing the Right Treatment</h2>
            <p>The best treatment is the one you can safely pursue and sustain. Consider these factors when discussing options with your provider:</p>
            <ul>
              <li><strong>Your BMI and health conditions:</strong> Higher BMI and more severe comorbidities generally favor more intensive treatments.</li>
              <li><strong>Insurance coverage:</strong> Varies dramatically — surgery may be covered while medications are not, or vice versa.</li>
              <li><strong>Surgical risk:</strong> Bariatric surgery carries a 0.1–0.3% mortality risk; GLP-1 medications carry no surgical risk.</li>
              <li><strong>Lifestyle readiness:</strong> All treatments require significant dietary and behavioral changes.</li>
              <li><strong>Speed vs. durability:</strong> Surgery produces faster and generally more durable results; medications offer a non-invasive path with ongoing cost implications.</li>
            </ul>

            <div className="cta-box">
              <h3>Need Help Navigating Insurance?</h3>
              <p>Learn which obesity treatments your plan covers and how to get prior authorization approved.</p>
              <a href="/insurance-coverage-weight-loss">Insurance Coverage Guide →</a>
            </div>

            <h2>Frequently Asked Questions</h2>
            {faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-q">Q: {f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}

            <div className="disclaimer">⚕️ Treatment decisions should be made with a qualified healthcare provider. This page is for educational purposes only.</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
