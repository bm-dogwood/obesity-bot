import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BMITool from './BMITool'

export const metadata: Metadata = {
  title: 'BMI Calculator with Health Risk Assessment – Obesity.bot',
  description: 'Free BMI calculator with detailed health risk assessment. Find out if your BMI indicates underweight, normal, overweight, or obesity — with personalized next steps.',
  keywords: 'BMI calculator, body mass index calculator, BMI health risk, obesity BMI, overweight BMI chart',
  alternates: { canonical: 'https://obesity.bot/bmi-calculator' },
  openGraph: {
    title: 'BMI Calculator with Health Risk Assessment',
    description: 'Calculate your BMI and understand what it means for your health.',
    url: 'https://obesity.bot/bmi-calculator',
  },
}

const faqs = [
  { q: 'What is a healthy BMI range?', a: 'A BMI between 18.5 and 24.9 is considered healthy for most adults. BMI 25–29.9 is overweight, and 30+ is classified as obesity. However, BMI has limitations — it does not account for muscle mass, bone density, or fat distribution.' },
  { q: 'Is BMI accurate for everyone?', a: 'BMI is a useful screening tool but is not perfect. It may overestimate body fat in athletes with high muscle mass and underestimate it in older adults who have lost muscle. Other measures like waist circumference and body fat percentage provide additional context.' },
  { q: 'What BMI is considered obese?', a: 'A BMI of 30 or higher is classified as obesity. The CDC further divides obesity into Class 1 (BMI 30–34.9), Class 2 (BMI 35–39.9), and Class 3 or severe obesity (BMI ≥ 40).' },
  { q: 'Can I lose weight if my BMI is over 40?', a: 'Yes. People with severe obesity (BMI ≥ 40) have multiple treatment options including intensive lifestyle interventions, FDA-approved weight-loss medications like GLP-1 agonists, and bariatric surgery. Speak with an obesity medicine specialist for a personalized plan.' },
  { q: 'How is BMI calculated?', a: 'BMI is calculated by dividing weight in kilograms by height in meters squared (kg/m²). In imperial units: (weight in pounds × 703) ÷ (height in inches)².' },
  { q: 'Does BMI affect insurance coverage for obesity treatment?', a: 'Yes, significantly. Most insurers and Medicare require a BMI ≥ 30 (or ≥ 27 with a weight-related condition) to cover medications, and BMI ≥ 35 or 40 for bariatric surgery, depending on the plan.' },
]

export default function BMICalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: 'BMI Calculator with Health Risk Assessment',
        url: 'https://obesity.bot/bmi-calculator',
        description: 'Free interactive BMI calculator with health risk categories and next-step recommendations.',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://obesity.bot' },
            { '@type': 'ListItem', position: 2, name: 'BMI Calculator', item: 'https://obesity.bot/bmi-calculator' },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'SoftwareApplication',
        name: 'BMI Calculator',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <div className="breadcrumb">
        <a href="/">Home</a> › BMI Calculator
      </div>
      <main>
        <section className="hero">
          <div className="page-wrapper">
            <span className="hero-badge">Free Tool · Instant Results</span>
            <h1>BMI Calculator with Health Risk Assessment</h1>
            <p>Enter your height and weight to get your Body Mass Index, health risk category, and personalized recommendations.</p>
          </div>
        </section>

        <section className="content-section">
          <div className="page-wrapper">
            <BMITool />

            <h2>Understanding Your BMI</h2>
            <p>Body Mass Index (BMI) is a simple numerical value calculated from your height and weight. Developed in the 1830s by Belgian mathematician Adolphe Quetelet, BMI has been used by clinicians and public health researchers for over a century as a convenient screening tool for weight categories that may lead to health problems.</p>
            <p>While BMI is not a perfect measure of body fatness or health, it remains the most widely used screening tool because it is inexpensive, non-invasive, and correlates reasonably well with more direct measures of body fat, such as dual-energy X-ray absorptiometry (DEXA) scans.</p>

            <table className="data-table">
              <thead>
                <tr><th>BMI Range</th><th>Category</th><th>Associated Health Risk</th></tr>
              </thead>
              <tbody>
                <tr><td>Below 18.5</td><td>Underweight</td><td>Moderate (malnutrition, osteoporosis)</td></tr>
                <tr><td>18.5 – 24.9</td><td>Normal weight</td><td>Low</td></tr>
                <tr><td>25.0 – 29.9</td><td>Overweight</td><td>Increased</td></tr>
                <tr><td>30.0 – 34.9</td><td>Obesity Class I</td><td>High</td></tr>
                <tr><td>35.0 – 39.9</td><td>Obesity Class II</td><td>Very High</td></tr>
                <tr><td>40.0 and above</td><td>Obesity Class III (Severe)</td><td>Extremely High</td></tr>
              </tbody>
            </table>

            <h2>BMI and Health Risks: What the Research Shows</h2>
            <p>Decades of research have established associations between elevated BMI and a wide range of health conditions. According to the CDC, adults with obesity are at higher risk for more than 13 types of cancer, type 2 diabetes, heart disease, stroke, sleep apnea, osteoarthritis, and mental health conditions including depression and anxiety.</p>
            <p>A landmark 2016 study published in <em>The New England Journal of Medicine</em> found that obesity was responsible for approximately 4 million deaths globally, making it one of the leading preventable causes of death. In the United States alone, the annual economic cost of obesity exceeds $173 billion, according to CDC estimates.</p>

            <div className="card-grid">
              <div className="card">
                <h4>Cardiovascular Disease</h4>
                <p>Adults with obesity have a 2–3× higher risk of coronary heart disease and hypertension compared to those with a healthy weight.</p>
              </div>
              <div className="card">
                <h4>Type 2 Diabetes</h4>
                <p>Obesity accounts for 80–85% of the risk of developing type 2 diabetes. Each 1-unit increase in BMI raises diabetes risk by about 8%.</p>
              </div>
              <div className="card">
                <h4>Sleep Apnea</h4>
                <p>Approximately 70% of obstructive sleep apnea cases are attributable to obesity. Even a 10% weight loss can significantly reduce apnea severity.</p>
              </div>
              <div className="card">
                <h4>Joint Disease</h4>
                <p>Each pound of body weight adds 4 pounds of pressure on the knees. Obesity roughly doubles the risk of knee osteoarthritis.</p>
              </div>
            </div>

            <h2>Limitations of BMI</h2>
            <p>BMI is a useful starting point but should not be interpreted in isolation. Key limitations include:</p>
            <ul>
              <li><strong>Muscle mass:</strong> Athletes and bodybuilders may have a high BMI despite very low body fat percentages.</li>
              <li><strong>Age:</strong> Older adults often have higher fat percentages at the same BMI as younger adults due to muscle loss (sarcopenia).</li>
              <li><strong>Sex:</strong> Women typically have more body fat than men at the same BMI.</li>
              <li><strong>Ethnicity:</strong> Asian populations face higher metabolic risk at lower BMI thresholds, leading some guidelines to recommend lower cutoffs for this group.</li>
              <li><strong>Fat distribution:</strong> Visceral fat (around internal organs) is more metabolically dangerous than subcutaneous fat. Waist circumference (greater than 35 inches in women or 40 inches in men) is an important additional risk marker.</li>
            </ul>

            <h2>What to Do After Checking Your BMI</h2>
            <p>If your BMI falls in the overweight or obese range, the next step is to consult with a healthcare provider for a comprehensive assessment. Your provider may order blood tests to check for cholesterol, blood sugar, and other metabolic markers, and will consider your complete health picture — not just your BMI — when recommending a treatment plan.</p>
            <p>Treatment options range from evidence-based diet and exercise programs to FDA-approved medications like GLP-1 receptor agonists (Ozempic, Wegovy, Mounjaro) and surgical interventions for those with severe obesity.</p>

            <div className="cta-box">
              <h3>Explore Your Treatment Options</h3>
              <p>Compare diet programs, medications, and surgery to find the right approach for your situation.</p>
              <a href="/obesity-treatment-options">Compare Treatments →</a>
            </div>

            <h2>Frequently Asked Questions</h2>
            {faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-q">Q: {f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}

            <div className="disclaimer">
              ⚕️ This BMI calculator is for informational purposes only. BMI is a screening tool, not a diagnostic measure. Consult a licensed healthcare provider for a complete health evaluation and medical advice.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
