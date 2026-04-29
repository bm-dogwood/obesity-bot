import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="site-nav">
      <Link href="/" className="logo">🤖 Obesity.bot</Link>
      <Link href="/bmi-calculator">BMI Calculator</Link>
      <Link href="/obesity-treatment-options">Treatments</Link>
      <Link href="/glp1-medications-guide">GLP-1 Drugs</Link>
      <Link href="/weight-loss-surgery-guide">Surgery</Link>
      <Link href="/obesity-statistics-by-state">Statistics</Link>
      <Link href="/insurance-coverage-weight-loss">Insurance</Link>
    </nav>
  )
}
