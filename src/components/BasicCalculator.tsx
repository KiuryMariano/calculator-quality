import { useMemo, useState, type ChangeEvent } from 'react'

const formatBasic = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 4,
})

const BasicCalculator = () => {
  const [a, setA] = useState('1200')
  const [b, setB] = useState('350')
  const [op, setOp] = useState<'add' | 'sub' | 'mul' | 'div'>('add')

  const resultText = useMemo(() => {
    const aValue = Number(a)
    const bValue = Number(b)

    if (Number.isNaN(aValue) || Number.isNaN(bValue)) {
      return '—'
    }

    switch (op) {
      case 'add':
        return formatBasic.format(aValue + bValue)
      case 'sub':
        return formatBasic.format(aValue - bValue)
      case 'mul':
        return formatBasic.format(aValue * bValue)
      case 'div':
        return bValue === 0 ? 'Divisão por zero' : formatBasic.format(aValue / bValue)
      default:
        return '—'
    }
  }, [a, b, op])

  return (
    <div className="card basic">
      <h2>Calculadora básica</h2>
      <p className="muted">Operações rápidas com dois valores.</p>
      <div className="basic-grid">
        <label className="field">
          <span>Valor A</span>
          <input
            value={a}
            type="number"
            step="0.01"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setA(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Valor B</span>
          <input
            value={b}
            type="number"
            step="0.01"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setB(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Operação</span>
          <select
            value={op}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setOp(event.target.value as typeof op)
            }
          >
            <option value="add">Soma</option>
            <option value="sub">Subtração</option>
            <option value="mul">Multiplicação</option>
            <option value="div">Divisão</option>
          </select>
        </label>
      </div>
      <div className="result basic-result">
        <span>Resultado</span>
        <strong>{resultText}</strong>
      </div>
    </div>
  )
}

export default BasicCalculator
