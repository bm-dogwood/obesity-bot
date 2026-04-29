import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Obesity Statistics by State 2024: CDC Data & Prevalence Rates – Obesity.bot',
  description: 'Adult obesity rates by state with 2024 CDC data. See which states have the highest and lowest obesity prevalence, demographic breakdowns, and 10-year trends.',
  keywords: 'obesity statistics by state, CDC obesity data, adult obesity rates, obesity prevalence 2024, obesity by state map',
  alternates: { canonical: 'https://obesity.bot/obesity-statistics-by-state' },
}

const stateData = [
  { state: 'Alabama', rate: 38.7, trend: '↑' },
  { state: 'Alaska', rate: 31.4, trend: '→' },
  { state: 'Arizona', rate: 31.2, trend: '↑' },
  { state: 'Arkansas', rate: 40.4, trend: '↑' },
  { state: 'California', rate: 26.5, trend: '→' },
  { state: 'Colorado', rate: 25.0, trend: '→' },
  { state: 'Connecticut', rate: 28.5, trend: '→' },
  { state: 'Delaware', rate: 33.3, trend: '↑' },
  { state: 'Florida', rate: 30.0, trend: '→' },
  { state: 'Georgia', rate: 35.4, trend: '↑' },
  { state: 'Hawaii', rate: 25.1, trend: '→' },
  { state: 'Idaho', rate: 30.2, trend: '↑' },
  { state: 'Illinois', rate: 33.4, trend: '↑' },
  { state: 'Indiana', rate: 36.3, trend: '↑' },
  { state: 'Iowa', rate: 36.4, trend: '↑' },
  { state: 'Kansas', rate: 35.2, trend: '↑' },
  { state: 'Kentucky', rate: 40.3, trend: '↑' },
  { state: 'Louisiana', rate: 40.1, trend: '↑' },
  { state: 'Maine', rate: 31.2, trend: '→' },
  { state: 'Maryland', rate: 32.9, trend: '↑' },
  { state: 'Massachusetts', rate: 27.1, trend: '→' },
  { state: 'Michigan', rate: 35.3, trend: '↑' },
  { state: 'Minnesota', rate: 31.3, trend: '↑' },
  { state: 'Mississippi', rate: 41.0, trend: '↑' },
  { state: 'Missouri', rate: 36.7, trend: '↑' },
  { state: 'Montana', rate: 27.5, trend: '→' },
  { state: 'Nebraska', rate: 35.3, trend: '↑' },
  { state: 'Nevada', rate: 30.4, trend: '↑' },
  { state: 'New Hampshire', rate: 29.7, trend: '→' },
  { state: 'New Jersey', rate: 28.9, trend: '↑' },
  { state: 'New Mexico', rate: 31.6, trend: '↑' },
  { state: 'New York', rate: 28.7, trend: '→' },
  { state: 'North Carolina', rate: 35.9, trend: '↑' },
  { state: 'North Dakota', rate: 37.0, trend: '↑' },
  { state: 'Ohio', rate: 36.0, trend: '↑' },
  { state: 'Oklahoma', rate: 39.7, trend: '↑' },
  { state: 'Oregon', rate: 30.9, trend: '↑' },
  { state: 'Pennsylvania', rate: 33.8, trend: '↑' },
  { state: 'Rhode Island', rate: 29.4, trend: '→' },
  { state: 'South Carolina', rate: 37.5, trend: '↑' },
  { state: 'South Dakota', rate: 35.3, trend: '↑' },
  { state: 'Tennessee', rate: 39.2, trend: '↑' },
  { state: 'Texas', rate: 36.1, trend: '↑' },
  { state: 'Utah', rate: 26.9, trend: '→' },
  { state: 'Vermont', rate: 27.6, trend: '→' },
  { state: 'Virginia', rate: 32.6, trend: '↑' },
  { state: 'Washington', rate: 28.3, trend: '→' },
  { state: 'West Virginia', rate: 41.1, trend: '↑' },
  { state: 'Wisconsin', rate: 34.0, trend: '↑' },
  { state: 'Wyoming', rate: 30.4, trend: '→' },
]

const sorted = [...stateData].sort((a, b) => b.rate - a.rate)

const faqs = [
  { q: 'Which state has the highest obesity rate?', a: 'West Virginia has the highest adult obesity rate at approximately 41.1% of adults, followed closely by Mississippi (41.0%), Arkansas (40.4%), Kentucky (40.3%), and Louisiana (40.1%) — all exceeding the 40% threshold, a milestone first crossed around 2022.' },
  { q: 'Which state has the lowest obesity rate?', a: 'Colorado consistently has the lowest adult obesity rate at approximately 25.0%, followed by Hawaii (25.1%), California (26.5%), Utah (26.9%), and Massachusetts (27.1%). These states generally have higher rates of physical activity, urban density favoring walking, and higher median incomes.' },
  { q: 'How is state obesity data collected?', a: 'The CDC collects obesity data through the Behavioral Risk Factor Surveillance System (BRFSS), the largest telephone health survey in the world. It surveys over 400,000 US adults annually across all states and territories about their height, weight, and health behaviors. Data is self-reported, which may lead to slight underestimation of true BMI.' },
  { q: 'Why do Southern states have higher obesity rates?', a: 'Researchers identify several interconnected factors: lower average household income and food insecurity, higher rates of sedentary jobs and car-dependent communities, historical food culture with higher consumption of calorie-dense foods, lower rates of health insurance coverage limiting treatment access, and higher rates of underlying conditions like diabetes and cardiovascular disease.' },
  { q: 'Has US obesity gotten worse over time?', a: 'Yes. In 1990, no state had an adult obesity rate above 15%. By 2000, 28 states had rates of 20–24%. Today, over 20 states have rates exceeding 35%. The prevalence of severe obesity (BMI ≥ 40) has tripled since 2000, representing the fastest-growing segment of the obesity epidemic.' },
]

export default function StatisticsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Dataset',
        name: 'US Adult Obesity Prevalence by State 2024',
        description: 'Adult obesity rates for all 50 US states based on CDC BRFSS data',
        url: 'https://obesity.bot/obesity-statistics-by-state',
        creator: { '@type': 'Organization', name: 'Obesity.bot' },
        temporalCoverage: '2024',
        spatialCoverage: 'United States',
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
      <div className="breadcrumb"><a href="/">Home</a> › Obesity Statistics by State</div>
      <main>
        <section className="hero">
          <div className="page-wrapper">
            <span className="hero-badge">CDC BRFSS Data · 2024</span>
            <h1>Adult Obesity Rates by State (2024)</h1>
            <p>Comprehensive CDC-based data on obesity prevalence across all 50 states — with trends, demographics, and regional analysis.</p>
          </div>
        </section>

        <section className="content-section">
          <div className="page-wrapper">
            <div className="stat-grid">
              <div className="stat-box"><span className="stat-number">41.9%</span><span className="stat-label">National adult obesity rate</span></div>
              <div className="stat-box"><span className="stat-number">9.2%</span><span className="stat-label">Severe obesity (BMI ≥ 40)</span></div>
              <div className="stat-box"><span className="stat-number">20+</span><span className="stat-label">States above 35% rate</span></div>
              <div className="stat-box"><span className="stat-number">$173B</span><span className="stat-label">Annual US economic cost</span></div>
            </div>

            <h2>National Overview</h2>
            <p>According to the CDC's most recent National Health and Nutrition Examination Survey (NHANES), 41.9% of US adults aged 20 and over have obesity, and an additional 30.7% are classified as overweight. Combined, over 70% of American adults are above a healthy weight — a public health challenge with profound implications for healthcare costs, workforce productivity, and population longevity.</p>
            <p>The obesity epidemic has accelerated since the 1970s, driven by a complex interplay of food environment changes, sedentary lifestyles, sleep deprivation, endocrine disruptors, gut microbiome alterations, and genetic susceptibility. Annual healthcare costs attributable to obesity exceed $173 billion, with obese adults spending on average $1,861 more per year on medical costs than those with healthy weight.</p>

            <h2>Obesity Rate by State (2024)</h2>
            <p>The following table presents adult obesity prevalence rates by state, ranked from highest to lowest, based on CDC BRFSS data:</p>
            <table className="data-table">
              <thead>
                <tr><th>Rank</th><th>State</th><th>Obesity Rate (%)</th><th>Trend</th><th>Category</th></tr>
              </thead>
              <tbody>
                {sorted.map((s, i) => (
                  <tr key={s.state}>
                    <td>{i + 1}</td>
                    <td>{s.state}</td>
                    <td><strong>{s.rate}%</strong></td>
                    <td style={{fontSize:18}}>{s.trend}</td>
                    <td>
                      <span style={{
                        background: s.rate >= 40 ? '#ffebee' : s.rate >= 35 ? '#fff3e0' : s.rate >= 30 ? '#fffde7' : '#e8f5e9',
                        color: s.rate >= 40 ? '#c62828' : s.rate >= 35 ? '#e65100' : s.rate >= 30 ? '#f57f17' : '#2e7d32',
                        padding: '2px 8px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: 'system-ui',
                      }}>
                        {s.rate >= 40 ? 'Critical' : s.rate >= 35 ? 'High' : s.rate >= 30 ? 'Elevated' : 'Moderate'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>Regional Patterns</h2>
            <h3>The South: Highest Burden</h3>
            <p>The Southern United States consistently records the nation's highest obesity rates. All five states with obesity prevalence above 40% — West Virginia, Mississippi, Arkansas, Kentucky, and Louisiana — are in the South or Appalachian region. Socioeconomic factors including food deserts, limited access to recreation, and lower rates of preventive healthcare access all contribute.</p>

            <h3>Mountain West & Pacific: Lower Rates</h3>
            <p>Colorado, Utah, Hawaii, and California consistently record the lowest rates nationally. Factors include high rates of outdoor physical activity, urban walkability, higher median incomes, and California's stricter food labeling and marketing regulations. However, even these states have seen significant increases from their 1990 baselines.</p>

            <h3>The Midwest: Rapid Increase</h3>
            <p>Midwestern states including Missouri, North Dakota, Iowa, and Nebraska have seen some of the most rapid increases in recent years. Rural hospital closures and limited access to obesity specialists in these regions have exacerbated the treatment gap.</p>

            <h2>Demographic Breakdowns</h2>
            <table className="data-table">
              <thead>
                <tr><th>Group</th><th>Obesity Prevalence</th><th>Notes</th></tr>
              </thead>
              <tbody>
                <tr><td>Non-Hispanic Black adults</td><td>49.9%</td><td>Highest prevalence of any group</td></tr>
                <tr><td>Hispanic adults</td><td>45.6%</td><td>Significant increase since 2000</td></tr>
                <tr><td>Non-Hispanic White adults</td><td>41.4%</td><td>Close to national average</td></tr>
                <tr><td>Non-Hispanic Asian adults</td><td>16.1%</td><td>Lower BMI thresholds may understate burden</td></tr>
                <tr><td>Adults aged 40–59</td><td>44.8%</td><td>Highest by age group</td></tr>
                <tr><td>Adults aged 20–39</td><td>40.0%</td><td>Fastest-growing segment</td></tr>
                <tr><td>Adults with income {'<'}$25K</td><td>36.2%</td><td>Strong inverse relationship with income</td></tr>
              </tbody>
            </table>

            <h2>Childhood Obesity</h2>
            <p>The CDC's 2023 data shows that 19.7% of US children and adolescents (aged 2–19) have obesity — approximately 14.7 million children. Rates are highest in Hispanic children (26.2%) and non-Hispanic Black children (24.8%). Children with obesity are at substantially elevated risk for cardiovascular disease, type 2 diabetes, asthma, and bone problems — and are more likely to have obesity as adults.</p>

            <h2>Frequently Asked Questions</h2>
            {faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-q">Q: {f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}

            <div className="cta-box">
              <h3>Ready to Take Action?</h3>
              <p>Use our BMI calculator to assess your own risk, then explore treatment options.</p>
              <a href="/bmi-calculator">Calculate Your BMI →</a>
            </div>

            <div className="disclaimer">📊 Data sourced from CDC BRFSS and NHANES surveys. State-level estimates are based on self-reported height and weight and may vary slightly from measured values.</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
