import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import PageContainer from '../components/PageContainer'
import PrimaryButton from '../components/PrimaryButton'

type CepResposta = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
}

function formatarCep(valor: string) {
  const numeros = valor.replace(/\D/g, '').slice(0, 8)
  if (numeros.length <= 5) return numeros
  return `${numeros.slice(0, 5)}-${numeros.slice(5)}`
}

export default function Endereco() {
  const navigate = useNavigate()
  const [cep, setCep] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [expandido, setExpandido] = useState(false)
  const [dados, setDados] = useState<CepResposta | null>(null)
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')

  const cepNumeros = useMemo(() => cep.replace(/\D/g, ''), [cep])

  useEffect(() => {
    setErro('')
    setExpandido(false)
    setDados(null)
  }, [cepNumeros])

  async function buscarCep() {
    if (cepNumeros.length !== 8) {
      setErro('Informe um CEP válido')
      return
    }
    setCarregando(true)
    setErro('')
    try {
      const response = await fetch(`/consulta/cep?cep=${cepNumeros}`)
      const resultado = await response.json()
      if (!response.ok || !resultado?.success) {
        setErro('CEP não encontrado')
        setCarregando(false)
        return
      }
      const payload = resultado.data as CepResposta
      setDados(payload)
      setComplemento(payload.complemento || '')
      setExpandido(true)
    } catch {
      setErro('Não foi possível buscar o CEP')
    } finally {
      setCarregando(false)
    }
  }

  function handleContinuar() {
    if (!expandido) {
      buscarCep()
      return
    }
    navigate('/credenciais')
  }

  return (
    <PageContainer>
      <Card>
        <div className={expandido ? 'endereco-card endereco-card--expanded' : 'endereco-card'}>
          <h2 className="card-title">Onde você quer receber seu carnê?</h2>
          <p className="card-subtitle">Informe seu endereço para receber o contrato pelos Correios</p>
          <div className="endereco-form">
            <label>CEP</label>
            <input
              className="input-field"
              placeholder="99999-999"
              value={cep}
              onChange={(event) => setCep(formatarCep(event.target.value))}
              inputMode="numeric"
            />
            {erro ? <span className="endereco-erro">{erro}</span> : null}
          </div>
          <div className="endereco-detalhes">
            <div className="endereco-form">
              <label>Rua</label>
              <input className="input-field" value={dados?.logradouro || ''} readOnly />
            </div>
            <div className="endereco-grid">
              <div className="endereco-form">
                <label>Número</label>
                <input className="input-field" value={numero} onChange={(event) => setNumero(event.target.value)} />
                <span className="endereco-opcional">Opcional</span>
              </div>
              <div className="endereco-form">
                <label>Complemento</label>
                <input
                  className="input-field"
                  placeholder="Ex: Apto 101, Bloco A"
                  value={complemento}
                  onChange={(event) => setComplemento(event.target.value)}
                />
                <span className="endereco-opcional">Opcional</span>
              </div>
            </div>
            <div className="endereco-form">
              <label>Bairro</label>
              <input className="input-field" value={dados?.bairro || ''} readOnly />
            </div>
            <div className="endereco-grid">
              <div className="endereco-form">
                <label>Cidade</label>
                <input className="input-field" value={dados?.localidade || ''} readOnly />
              </div>
              <div className="endereco-form">
                <label>Estado</label>
                <input className="input-field" value={dados?.uf || ''} readOnly />
              </div>
            </div>
          </div>
          <PrimaryButton type="button" onClick={handleContinuar} disabled={carregando}>
            {carregando ? 'Buscando...' : 'Continuar'}
          </PrimaryButton>
        </div>
      </Card>
    </PageContainer>
  )
}
