import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h5>🤖 Obesity.bot</h5>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.5)',maxWidth:220}}>
            Evidence-based obesity resources, tools, and treatment guidance.
          </p>
        </div>
        <div className="footer-col">
          <h5>Tools</h5>
          <Link href="/bmi-calculator">BMI Calculator</Link>
          <Link href="/obesity-treatment-options">Treatment Options</Link>
          <Link href="/glp1-medications-guide">GLP-1 Guide</Link>
        </div>
        <div className="footer-col">
          <h5>Resources</h5>
          <Link href="/weight-loss-surgery-guide">Surgery Guide</Link>
          <Link href="/obesity-statistics-by-state">State Statistics</Link>
          <Link href="/insurance-coverage-weight-loss">Insurance Coverage</Link>
        </div>
        <div className="footer-col">
          <h5>External</h5>
          <a href="https://www.cdc.gov/obesity" target="_blank" rel="noopener">CDC Obesity Data</a>
          <a href="https://www.niddk.nih.gov/health-information/weight-management" target="_blank" rel="noopener">NIH Weight Mgmt</a>
          <a href="https://obesitymedicine.org" target="_blank" rel="noopener">Obesity Medicine Assoc.</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Obesity.bot · Medical information is for educational purposes only. Always consult a healthcare provider.</p>
      </div>
    </footer>
  )
}
