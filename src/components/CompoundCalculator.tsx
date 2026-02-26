import { useMemo, useState, type ChangeEvent } from 'react'
import { calculateCompound } from '../utils/finance'
import './CompoundCalculator.css'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 2,
})

const CompoundCalculator = () => {
  const [principal, setPrincipal] = useState('5000')
  const [monthly, setMonthly] = useState('300')
  const [annualRate, setAnnualRate] = useState('10')
  const [years, setYears] = useState('5')

  const result = useMemo(() => {
    const inputs = {
      principal: Math.max(0, Number(principal) || 0),
      monthly: Math.max(0, Number(monthly) || 0),
      annualRate: Math.max(0, Number(annualRate) || 0),
      years: Math.max(0, Number(years) || 0),
    }

    return calculateCompound(inputs)
  }, [principal, monthly, annualRate, years])

  const reset = () => {
    setPrincipal('5000')
    setMonthly('300')
    setAnnualRate('10')
    setYears('5')
  }

  return (
    <div className="complex">
      <div className="card">
        <h2>Simule agora</h2>
        <p className="muted">Todos os valores em reais e taxas ao ano.</p>

        <div className="grid">
          <label className="field">
            <span>Capital inicial</span>
            <input
              value={principal}
              type="number"
              min="0"
              step="100"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setPrincipal(event.target.value)}
            />
          </label>
          <label className="field">
            <span>Aporte mensal</span>
            <input
              value={monthly}
              type="number"
              min="0"
              step="50"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setMonthly(event.target.value)}
            />
          </label>
          <label className="field">
            <span>Taxa anual (%)</span>
            <input
              value={annualRate}
              type="number"
              min="0"
              step="0.1"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setAnnualRate(event.target.value)}
            />
          </label>
          <label className="field">
            <span>Prazo (anos)</span>
            <input
              value={years}
              type="number"
              min="1"
              step="1"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setYears(event.target.value)}
            />
          </label>
        </div>

        <div className="actions">
          <button type="button" onClick={reset}>
            Voltar ao exemplo
          </button>
        </div>
      </div>

      <div className="card results">
        <h2>Resultado</h2>
        <div className="result">
          <span>Valor futuro estimado</span>
          <strong>{currencyFormatter.format(result.futureValue)}</strong>
        </div>
        <div className="result">
          <span>Total investido</span>
          <strong>{currencyFormatter.format(result.totalContrib)}</strong>
        </div>
        <div className="result">
          <span>Juros acumulados</span>
          <strong>{currencyFormatter.format(result.totalInterest)}</strong>
        </div>

        <div className="explain">
          <h3>Como funciona</h3>
          <ul>
            <li>Juros compostos mensais: a taxa anual é dividida por 12.</li>
            <li>O aporte mensal é aplicado no fim de cada mês.</li>
            <li>Se a taxa for 0%, o crescimento é apenas a soma dos aportes.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CompoundCalculator
