'use client'
import { useState } from 'react'

type BmiResult = { bmi: number; category: string; color: string; risk: string; advice: string }

function calcBMI(height: number, weight: number, unit: 'imperial' | 'metric'): BmiResult {
  let bmi: number
  if (unit === 'imperial') {
    bmi = (weight / (height * height)) * 703
  } else {
    bmi = weight / ((height / 100) * (height / 100))
  }
  bmi = Math.round(bmi * 10) / 10

  let category: string, color: string, risk: string, advice: string
  if (bmi < 18.5) {
    category = 'Underweight'; color = '#2196f3'; risk = 'Moderate'
    advice = 'Consider speaking with a dietitian about healthy weight gain strategies. Underweight can signal nutritional deficiencies.'
  } else if (bmi < 25) {
    category = 'Normal Weight'; color = '#4caf50'; risk = 'Low'
    advice = 'Great! Maintain your healthy weight with balanced nutrition and regular physical activity.'
  } else if (bmi < 30) {
    category = 'Overweight'; color = '#ff9800'; risk = 'Increased'
    advice = 'Even modest weight loss (5–10%) can improve blood pressure, cholesterol, and blood sugar. Consider lifestyle changes or a clinical program.'
  } else if (bmi < 35) {
    category = 'Obesity Class I'; color = '#f44336'; risk = 'High'
    advice = 'GLP-1 medications and structured lifestyle programs are effective at this BMI. Talk to an obesity medicine specialist.'
  } else if (bmi < 40) {
    category = 'Obesity Class II'; color = '#c62828'; risk = 'Very High'
    advice = 'Bariatric surgery and GLP-1 agonists are both clinically indicated. Discuss all options with your provider.'
  } else {
    category = 'Obesity Class III (Severe)'; color = '#880e4f'; risk = 'Extremely High'
    advice = 'Surgical options (gastric sleeve or bypass) have strong evidence at this BMI. Immediate consultation with an obesity medicine specialist is recommended.'
  }
  return { bmi, category, color, risk, advice }
}

export default function BMITool() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState<BmiResult | null>(null)
  const [error, setError] = useState('')

  const handleCalc = () => {
    setError('')
    let h: number, w: number
    if (unit === 'imperial') {
      h = parseInt(heightFt) * 12 + (parseInt(heightIn) || 0)
      w = parseFloat(weight)
    } else {
      h = parseFloat(heightCm)
      w = parseFloat(weight)
    }
    if (!h || !w || h <= 0 || w <= 0) { setError('Please enter valid height and weight.'); return }
    setResult(calcBMI(h, w, unit))
  }

  return (
    <div className="bmi-tool">
      <h2 style={{ color: 'var(--primary)', fontSize: '1.4rem', marginBottom: 20 }}>Calculate Your BMI</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Unit System</label>
        <select value={unit} onChange={e => { setUnit(e.target.value as 'imperial' | 'metric'); setResult(null) }}>
          <option value="imperial">Imperial (ft, in, lbs)</option>
          <option value="metric">Metric (cm, kg)</option>
        </select>
      </div>
      {unit === 'imperial' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div><label>Height (feet)</label><input type="number" placeholder="5" min="1" max="9" value={heightFt} onChange={e => setHeightFt(e.target.value)} /></div>
          <div><label>Height (inches)</label><input type="number" placeholder="8" min="0" max="11" value={heightIn} onChange={e => setHeightIn(e.target.value)} /></div>
          <div style={{ gridColumn: '1/-1' }}><label>Weight (lbs)</label><input type="number" placeholder="180" min="50" max="700" value={weight} onChange={e => setWeight(e.target.value)} /></div>
        </div>
      ) : (
        <>
          <label>Height (cm)</label>
          <input type="number" placeholder="175" min="50" max="300" value={heightCm} onChange={e => setHeightCm(e.target.value)} />
          <label>Weight (kg)</label>
          <input type="number" placeholder="80" min="20" max="350" value={weight} onChange={e => setWeight(e.target.value)} />
        </>
      )}
      {error && <p style={{ color: 'red', fontSize: 14, marginBottom: 8 }}>{error}</p>}
      <button onClick={handleCalc}>Calculate BMI</button>

      {result && (
        <div className="bmi-result" style={{ background: result.color + '18', border: `2px solid ${result.color}` }}>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: result.color, lineHeight: 1 }}>{result.bmi}</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, color: result.color, margin: '8px 0 4px' }}>{result.category}</div>
          <div style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>Health Risk: <strong>{result.risk}</strong></div>
          <p style={{ fontSize: 15, color: '#333', margin: 0 }}>{result.advice}</p>
        </div>
      )}
    </div>
  )
}
