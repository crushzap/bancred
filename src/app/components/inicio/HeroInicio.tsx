import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../PrimaryButton'

export default function HeroInicio() {
  const navigate = useNavigate()

  return (
    <section className="inicio-hero">
      <div className="inicio-container">
        <div className="inicio-hero__conteudo">
          <h1 className="inicio-hero__titulo" data-testid="hero-title">
            <span>Empréstimo online,</span>
            <br />
            <span>
              receba hoje via <span className="text-accent">PIX</span>!
            </span>
          </h1>
          <div className="inicio-hero__subtitulo">
            <p>
              Mesmo com <span className="highlight">nome sujo</span> ou{' '}
              <span className="highlight">score baixo</span>
            </p>
            <p className="inicio-hero__nota">Simule sem compromisso</p>
          </div>
          <div className="inicio-hero__acao">
            <button className="botao-gradiente" type="button" onClick={() => navigate('/cpf')}>
              Começar Simulação
            </button>
          </div>
          <div className="inicio-hero__badges">
            <div className="inicio-hero__badge">
              <span className="badge-dot badge-dot--verde" />
              <span>100% Digital</span>
            </div>
            <div className="inicio-hero__badge">
              <span className="badge-dot badge-dot--azul" />
              <span>Sem Taxa</span>
            </div>
            <div className="inicio-hero__badge">
              <span className="badge-dot badge-dot--roxo" />
              <span>Seguro & Rápido</span>
            </div>
          </div>
          <div className="inicio-hero__acao-mobile">
            <PrimaryButton onClick={() => navigate('/cpf')}>Começar Simulação</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  )
}
