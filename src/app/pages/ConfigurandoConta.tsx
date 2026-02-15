import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const etapas = ['Conta criada com sucesso', 'Empréstimo aprovado e disponível', 'Configurações finalizadas']

export default function ConfigurandoConta() {
  const navigate = useNavigate()
  const [etapaAtiva, setEtapaAtiva] = useState(0)

  const etapasVisiveis = useMemo(() => etapas.slice(0, etapaAtiva + 1), [etapaAtiva])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setEtapaAtiva((prev) => {
        if (prev >= etapas.length - 1) {
          window.clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 1200)

    const timeout = window.setTimeout(() => {
      navigate('/conta')
    }, 4200)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [navigate])

  return (
    <div className="configurando-page">
      <div className="configurando-card">
        <div className="configurando-spinner" />
        <h2>Configurando sua conta</h2>
        <div className="configurando-etapas">
          {etapasVisiveis.map((etapa) => (
            <div key={etapa} className="configurando-etapa">
              <span className="configurando-check">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span>{etapa}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
