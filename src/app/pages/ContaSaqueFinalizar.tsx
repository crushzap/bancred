import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type SimulacaoData = {
  valorDesejado: number
  parcelas: number
  parcelaMensal: number
}

function formatarMoeda(valor: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
}

export default function ContaSaqueFinalizar() {
  const navigate = useNavigate()
  const [plano, setPlano] = useState('aprovado')
  const simulacao = useMemo<SimulacaoData | null>(() => {
    const bruto = window.sessionStorage.getItem('simulacaoData')
    if (!bruto) return null
    try {
      return JSON.parse(bruto) as SimulacaoData
    } catch {
      return null
    }
  }, [])
  const valor = simulacao?.valorDesejado ?? 5000
  const parcelasAprovadas = simulacao?.parcelas ?? 12
  const parcelaMensal = simulacao?.parcelaMensal ?? 502.01
  const aprovado = {
    id: 'aprovado',
    valor,
    seguro: 19,
    parcelas: `${parcelasAprovadas}x de ${formatarMoeda(parcelaMensal)}`,
  }
  const ofertas = [
    { id: '7000', valor: 7000, seguro: 27, parcelas: '12x de R$ 702,81' },
    { id: '11000', valor: 11000, seguro: 37, parcelas: '12x de R$ 1.104,42' },
  ]
  const ofertaSelecionada =
    plano === 'aprovado'
      ? aprovado
      : ofertas.find((oferta) => oferta.id === plano) ?? aprovado

  return (
    <div className="finalizar-page">
      <div className="finalizar-topo">
        <div className="finalizar-topo__marca">
          <span className="finalizar-topo__icone">$</span>
          <span>Bancred</span>
        </div>
        <div className="finalizar-topo__parceiro">
          <img className="finalizar-topo__logo" src="/stellanz.svg" alt="Stellanz" />
          <span>Parceira Oficial Stellanz</span>
          <span>Proteção garantida para o seu empréstimo</span>
        </div>
      </div>
      <div className="finalizar-container">
        <div className="finalizar-conteudo">
          <h2>Seu empréstimo está quase liberado</h2>
          <div className="finalizar-card">
            <div className="finalizar-card__titulo">Benefícios inclusos no seguro:</div>
            <ul className="finalizar-lista">
              <li>
                <span className="finalizar-lista__icone">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.55 17.2 4.9 12.5l1.4-1.4 3.25 3.3 8.2-8.2 1.4 1.4-9.6 9.6z"></path>
                  </svg>
                </span>
                Proteção em caso de morte ou invalidez
              </li>
              <li>
                <span className="finalizar-lista__icone">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.55 17.2 4.9 12.5l1.4-1.4 3.25 3.3 8.2-8.2 1.4 1.4-9.6 9.6z"></path>
                  </svg>
                </span>
                Proteção contra desemprego
              </li>
              <li>
                <span className="finalizar-lista__icone">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.55 17.2 4.9 12.5l1.4-1.4 3.25 3.3 8.2-8.2 1.4 1.4-9.6 9.6z"></path>
                  </svg>
                </span>
                Liberação imediata do valor total
              </li>
              <li>
                <span className="finalizar-lista__icone">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.55 17.2 4.9 12.5l1.4-1.4 3.25 3.3 8.2-8.2 1.4 1.4-9.6 9.6z"></path>
                  </svg>
                </span>
                100% reembolsável após quitação
              </li>
              <li>
                <span className="finalizar-lista__icone">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.55 17.2 4.9 12.5l1.4-1.4 3.25 3.3 8.2-8.2 1.4 1.4-9.6 9.6z"></path>
                  </svg>
                </span>
                Sem carência • vale desde o 1º dia
              </li>
            </ul>
          </div>
          <div className="finalizar-card">
            <div className="finalizar-card__titulo">Avaliações dos clientes</div>
            <div className="finalizar-avaliacao">
              <div className="finalizar-estrelas">★★★★★</div>
              <div className="finalizar-avaliacao__titulo">Maria S.</div>
              <div>“Processo muito rápido e seguro. O valor foi liberado em minutos.”</div>
            </div>
            <div className="finalizar-avaliacao">
              <div className="finalizar-estrelas">★★★★★</div>
              <div className="finalizar-avaliacao__titulo">João P.</div>
              <div>“Excelente parceria com a Allianz. Me deu muita confiança.”</div>
            </div>
          </div>
          <div
            className={plano === 'aprovado' ? 'finalizar-card finalizar-card--selecionado' : 'finalizar-card'}
            onClick={() => setPlano('aprovado')}
          >
            <div className="finalizar-plano">
              <div className="finalizar-plano__cabecalho">
                <label className="finalizar-radio">
                  <input type="radio" name="oferta" checked={plano === 'aprovado'} onChange={() => setPlano('aprovado')} />
                  <span className="finalizar-radio__icone">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.55 17.2 4.9 12.5l1.4-1.4 3.25 3.3 8.2-8.2 1.4 1.4-9.6 9.6z"></path>
                    </svg>
                  </span>
                  <span>Valor aprovado para liberação</span>
                </label>
                <div className="finalizar-seguro">
                  <span>Seguro</span>
                  <strong>R$ 19,00</strong>
                </div>
              </div>
              <div className="finalizar-plano__principal">
                <strong className="finalizar-plano__valor">{formatarMoeda(valor)}</strong>
                <div className="finalizar-plano__parcelas">{aprovado.parcelas}</div>
              </div>
            </div>
            <div className="finalizar-divisor" />
            <div className="finalizar-detalhes">
              <div>Detalhamento da Tarifa do Seguro</div>
              <ul>
                <li>
                  <span>Cobertura por morte ou invalidez</span>
                  <strong>R$ 7,74</strong>
                </li>
                <li>
                  <span>Proteção contra desemprego</span>
                  <strong>R$ 6,62</strong>
                </li>
                <li>
                  <span>Assistência 24h emergencial</span>
                  <strong>R$ 4,64</strong>
                </li>
              </ul>
              <div className="finalizar-detalhes__total">
                <span>Total do seguro</span>
                <strong>R$ 19,00</strong>
              </div>
            </div>
          </div>
          <div className="finalizar-card">
            <div className="finalizar-card__titulo">Temos mais 2 ofertas aprovadas para seu CPF:</div>
            <div className={plano === '7000' ? 'finalizar-opcao finalizar-opcao--ativa' : 'finalizar-opcao'} onClick={() => setPlano('7000')}>
              <label>
                <input type="radio" name="oferta" checked={plano === '7000'} onChange={() => setPlano('7000')} />
                <div className="finalizar-opcao__info">
                  <span>Você receberá</span>
                  <strong>{formatarMoeda(ofertas[0].valor)}</strong>
                  <div>{ofertas[0].parcelas}</div>
                </div>
              </label>
              <div className="finalizar-opcao__seguro">
                <span>Seguro</span>
                <strong>{formatarMoeda(ofertas[0].seguro)}</strong>
              </div>
            </div>
            <div className={plano === '11000' ? 'finalizar-opcao finalizar-opcao--ativa' : 'finalizar-opcao'} onClick={() => setPlano('11000')}>
              <label>
                <input type="radio" name="oferta" checked={plano === '11000'} onChange={() => setPlano('11000')} />
                <div className="finalizar-opcao__info">
                  <span>Você receberá</span>
                  <strong>{formatarMoeda(ofertas[1].valor)}</strong>
                  <div>{ofertas[1].parcelas}</div>
                </div>
              </label>
              <div className="finalizar-opcao__seguro">
                <span>Seguro</span>
                <strong>{formatarMoeda(ofertas[1].seguro)}</strong>
              </div>
            </div>
          </div>
          <div className="finalizar-rodape">
            <div className="finalizar-rodape__valor">{formatarMoeda(ofertaSelecionada.seguro)}</div>
            <div className="finalizar-rodape__pix">Pagamento único via PIX</div>
            <button
              className="finalizar-rodape__botao"
              type="button"
              onClick={() => {
                window.sessionStorage.setItem('checkoutData', JSON.stringify({ seguro: ofertaSelecionada.seguro }))
                navigate('/conta/checkout')
              }}
            >
              Pagar seguro
            </button>
            <div className="finalizar-rodape__info">Pagamento reconhecido automaticamente</div>
            <div className="finalizar-rodape__info">Processo 100% seguro</div>
          </div>
        </div>
      </div>
    </div>
  )
}
