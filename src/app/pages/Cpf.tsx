import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AnaliseCpf from '../components/cpf/AnaliseCpf'
import FormularioCpf from '../components/cpf/FormularioCpf'
import PageContainer from '../components/PageContainer'

const tempoEtapas = [3000, 3000, 800]

function formatarCpf(valor: string) {
  const numeros = valor.replace(/\D/g, '').slice(0, 11)
  const parte1 = numeros.slice(0, 3)
  const parte2 = numeros.slice(3, 6)
  const parte3 = numeros.slice(6, 9)
  const parte4 = numeros.slice(9, 11)
  if (parte4) {
    return `${parte1}.${parte2}.${parte3}-${parte4}`
  }
  if (parte3) {
    return `${parte1}.${parte2}.${parte3}`
  }
  if (parte2) {
    return `${parte1}.${parte2}`
  }
  return parte1
}

function validarCpf(valor: string) {
  const cpf = valor.replace(/\D/g, '')
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false
  let soma = 0
  for (let i = 1; i <= 9; i += 1) soma += Number.parseInt(cpf[i - 1], 10) * (11 - i)
  let resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== Number.parseInt(cpf[9], 10)) return false
  soma = 0
  for (let i = 1; i <= 10; i += 1) soma += Number.parseInt(cpf[i - 1], 10) * (12 - i)
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  return resto === Number.parseInt(cpf[10], 10)
}

export default function Cpf() {
  const navigate = useNavigate()
  const [cpf, setCpf] = useState('')
  const [erro, setErro] = useState('')
  const [etapa, setEtapa] = useState<'consulta' | 'analise'>('consulta')
  const [indiceEtapa, setIndiceEtapa] = useState(0)
  const [carregando, setCarregando] = useState(false)

  const cpfFormatado = useMemo(() => formatarCpf(cpf), [cpf])

  useEffect(() => {
    if (etapa !== 'analise') return undefined
    setIndiceEtapa(0)
    const timers: Array<number> = []
    let acumulado = 0
    tempoEtapas.forEach((tempo, index) => {
      acumulado += tempo
      const timer = window.setTimeout(() => {
        setIndiceEtapa(index)
        if (index === tempoEtapas.length - 1) {
          navigate('/pessoa')
        }
      }, acumulado)
      timers.push(timer)
    })
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [etapa, navigate])

  useEffect(() => {
    if (erro) setErro('')
  }, [cpf])

  function handleChange(valor: string) {
    setCpf(valor)
  }

  async function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setCarregando(true)
    if (!validarCpf(cpf)) {
      setErro('CPF inválido. Verifique os números digitados.')
      setCarregando(false)
      return
    }
    const cpfNumeros = cpf.replace(/\D/g, '')
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    let userData: Record<string, string | null> = {}
    const urls = isLocal
      ? [
          `${window.location.origin}/consulta/cpf`,
          'http://localhost:3005/consulta/cpf',
          'http://127.0.0.1:3005/consulta/cpf',
        ]
      : [`${window.location.origin}/consulta/cpf`, `${window.location.origin}/consulta/cpf.php`]
    let dados: Record<string, string> | null = null
    for (const url of urls) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cpf: cpfNumeros }),
        })
        if (!response.ok) continue
        const resposta = await response.json()
        if (resposta?.success === false && !resposta?.data) continue
        const payload = resposta?.data || resposta
        if (payload) {
          dados = payload
          break
        }
      } catch {
        continue
      }
    }
    if (dados) {
      const nomeMae = dados.nome_mae || dados.NOME_MAE || '****************'
      userData = {
        cpf: dados.cpf || cpfFormatado,
        nome: dados.nome || dados.NOME || 'Dados não disponíveis',
        genero: dados.genero || dados.sexo || dados.SEXO || '',
        data_nascimento: dados.data_nascimento || dados.nascimento || dados.NASC || '',
        nome_mae: nomeMae,
        CPF: dados.cpf || cpfFormatado,
        NOME: dados.nome || dados.NOME || 'Dados não disponíveis',
        SEXO: dados.genero || dados.sexo || dados.SEXO || '',
        NASC: dados.data_nascimento || dados.nascimento || dados.NASC || '',
        NOME_MAE: nomeMae,
      }
    }
    if (!Object.keys(userData).length) {
      userData = {
        cpf: cpfFormatado,
        nome: 'Dados não disponíveis',
        nascimento: null,
        situacao: 'Regular',
        status: 'aprovado',
        fonte: 'simulado',
      }
    }
    window.sessionStorage.setItem('userData', JSON.stringify(userData))
    setCarregando(false)
    setEtapa('analise')
  }

  return (
    <PageContainer>
      <section className="cpf-page">
        {etapa === 'consulta' ? (
          <FormularioCpf
            cpf={cpfFormatado}
            erro={erro}
            carregando={carregando}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        ) : (
          <AnaliseCpf etapa={indiceEtapa} />
        )}
      </section>
    </PageContainer>
  )
}
