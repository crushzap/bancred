import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import PageContainer from '../components/PageContainer'
import ProgressBar from '../components/ProgressBar'

const etapas = [
  'Verificando dados pessoais',
  'Consultando score de crédito',
  'Analisando capacidade de pagamento',
  'Calculando melhor proposta',
  'Finalizando análise',
]

export default function Analise() {
  const navigate = useNavigate()
  const [progresso, setProgresso] = useState(0)
  const [etapaAtiva, setEtapaAtiva] = useState(0)

  const percentual = useMemo(() => Math.min(progresso, 100), [progresso])

  useEffect(() => {
    let percentualAtual = 0
    const interval = window.setInterval(() => {
      percentualAtual += 1
      setProgresso(percentualAtual)
      if (percentualAtual >= 100) {
        window.clearInterval(interval)
      }
    }, 100)

    const timers = etapas.map((_, index) =>
      window.setTimeout(() => {
        setEtapaAtiva(index)
      }, index * 2000)
    )

    const finalizar = window.setTimeout(() => {
      navigate('/aprovado')
    }, 12000)

    return () => {
      window.clearInterval(interval)
      timers.forEach((timer) => window.clearTimeout(timer))
      window.clearTimeout(finalizar)
    }
  }, [navigate])

  return (
    <PageContainer>
      <Card>
        <div className="analise-icone">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v16a2 2 0 0 0 2 2h16" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
        </div>
        <h2 className="card-title">Análise em Andamento</h2>
        <p className="card-subtitle">Estamos processando suas informações para encontrar a melhor proposta</p>
        <div className="analise-progresso">
          <ProgressBar value={percentual} />
          <p className="analise-percentual">{percentual}%</p>
        </div>
        <div className="analise-etapas">
          {etapas.map((etapa, index) => {
            const estado = index < etapaAtiva ? 'concluida' : index === etapaAtiva ? 'ativa' : 'pendente'
            return (
              <div key={etapa} className={`analise-etapa analise-etapa--${estado}`}>
                <div className="analise-etapa__icone">
                  {estado === 'ativa' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="spinner">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  ) : estado === 'concluida' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  ) : (
                    <span />
                  )}
                </div>
                <span>{etapa}</span>
                {estado === 'concluida' ? <span className="analise-etapa__check">✓</span> : null}
              </div>
            )
          })}
        </div>
        <div className="analise-segura">
          <span className="analise-segura__dot" />
          <span>Conexão segura ativa</span>
        </div>
      </Card>
    </PageContainer>
  )
}
