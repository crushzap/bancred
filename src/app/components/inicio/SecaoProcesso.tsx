import { useNavigate } from 'react-router-dom'

const passos = [
  {
    titulo: 'Simulação gratuita',
    descricao: 'Formulário online em 2 minutos',
    testIdTitulo: 'text-step-1-title',
    testIdDescricao: 'text-step-1-description',
    icone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <line x1="8" x2="16" y1="6" y2="6" />
        <line x1="16" x2="16" y1="14" y2="18" />
        <path d="M16 10h.01" />
        <path d="M12 10h.01" />
        <path d="M8 10h.01" />
        <path d="M12 14h.01" />
        <path d="M8 14h.01" />
        <path d="M12 18h.01" />
        <path d="M8 18h.01" />
      </svg>
    ),
  },
  {
    titulo: 'Resultado imediato',
    descricao: 'Análise instantânea pela IA',
    testIdTitulo: 'text-step-2-title',
    testIdDescricao: 'text-step-2-description',
    icone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    titulo: 'Recebimento via PIX',
    descricao: 'Dinheiro na conta em minutos',
    testIdTitulo: 'text-step-3-title',
    testIdDescricao: 'text-step-3-description',
    icone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
      </svg>
    ),
  },
]

export default function SecaoProcesso() {
  const navigate = useNavigate()

  return (
    <section className="inicio-secao inicio-secao--clara">
      <div className="inicio-container">
        <div className="inicio-secao__cabecalho">
          <div className="inicio-secao__tag">
            <span className="inicio-secao__icone">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <span>Processo</span>
          </div>
          <h2>Como funciona?</h2>
          <p>Processo 100% digital e sem burocracias</p>
        </div>
        <div className="processo-grid">
          {passos.map((passo) => (
            <div key={passo.titulo} className="processo-card">
              <div className="processo-card__icone">{passo.icone}</div>
              <h3 data-testid={passo.testIdTitulo}>{passo.titulo}</h3>
              <p data-testid={passo.testIdDescricao}>{passo.descricao}</p>
            </div>
          ))}
        </div>
        <div className="processo-cta">
          <h3>Pronto para começar?</h3>
          <p>Descubra quanto você pode receber em menos de 2 minutos</p>
          <button className="botao-gradiente" type="button" onClick={() => navigate('/cpf')}>
            Fazer Simulação Gratuita
          </button>
        </div>
      </div>
    </section>
  )
}
