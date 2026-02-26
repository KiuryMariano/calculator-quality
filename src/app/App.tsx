import './App.css'
import BasicCalculator from '../components/BasicCalculator'
import CompoundCalculator from '../components/CompoundCalculator'

const App = () => {
  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">Calculadora financeira</p>
        <h1>Projeção de juros compostos com aportes mensais</h1>
        <p className="lead">
          Preencha os campos e veja a evolução do seu capital ao longo do tempo.
          A calculadora usa juros compostos mensais e considera os aportes no fim de
          cada mês. Você entende o resultado e já pode testar cenários reais.
        </p>
      </header>

      <section className="section">
        <BasicCalculator />
      </section>

      <section className="section">
        <CompoundCalculator />
      </section>
    </main>
  )
}

export default App
