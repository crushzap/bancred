import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormContatoPessoa from '../components/pessoa/FormContatoPessoa'
import ResumoPessoa from '../components/pessoa/ResumoPessoa'
import PageContainer from '../components/PageContainer'

type UserData = {
  cpf?: string
  nome?: string
  NOME?: string
  data_nascimento?: string
  nascimento?: string
  NASC?: string
  genero?: string
  sexo?: string
  SEXO?: string
  nome_mae?: string
  NOME_MAE?: string
  mae?: string
  primeiroNome?: string
  email?: string
  telefone?: string
}

function formatarDataBrasileira(valor: string) {
  if (!valor) return '-'
  const normalizado = valor.trim()
  const iso = normalizado.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (iso) {
    return `${iso[3]}/${iso[2]}/${iso[1]}`
  }
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(normalizado)) return normalizado
  const date = new Date(normalizado)
  if (!Number.isNaN(date.getTime())) {
    const dia = String(date.getDate()).padStart(2, '0')
    const mes = String(date.getMonth() + 1).padStart(2, '0')
    const ano = date.getFullYear()
    return `${dia}/${mes}/${ano}`
  }
  return normalizado
}

function formatarGenero(valor: string) {
  if (!valor) return '-'
  const normalizado = valor.trim().toUpperCase()
  if (normalizado === 'M' || normalizado === 'MASCULINO') return 'Masculino'
  if (normalizado === 'F' || normalizado === 'FEMININO') return 'Feminino'
  return valor
}

function formatarTelefone(valor: string) {
  const numeros = valor.replace(/\D/g, '').slice(0, 11)
  const ddd = numeros.slice(0, 2)
  const parte1 = numeros.length > 10 ? numeros.slice(2, 7) : numeros.slice(2, 6)
  const parte2 = numeros.length > 10 ? numeros.slice(7, 11) : numeros.slice(6, 10)
  if (parte2) return `(${ddd}) ${parte1}-${parte2}`
  if (parte1) return `(${ddd}) ${parte1}`
  if (ddd) return `(${ddd}`
  return ''
}

function validarEmail(valor: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)
}

export default function Pessoa() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [erroEmail, setErroEmail] = useState('')
  const [erroTelefone, setErroTelefone] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    const stored = window.sessionStorage.getItem('userData')
    if (!stored) {
      navigate('/cpf')
      return
    }
    try {
      const parsed = JSON.parse(stored) as UserData
      setUserData(parsed)
      setEmail(parsed.email || '')
      setTelefone(parsed.telefone ? formatarTelefone(parsed.telefone) : '')
    } catch {
      navigate('/cpf')
    }
  }, [navigate])

  useEffect(() => {
    if (erroEmail) setErroEmail('')
  }, [email])

  useEffect(() => {
    if (erroTelefone) setErroTelefone('')
  }, [telefone])

  const nomeCompleto = useMemo(() => (userData?.NOME || userData?.nome || '').toString().trim() || 'Cliente', [userData])
  const nascimento = useMemo(
    () => formatarDataBrasileira((userData?.NASC || userData?.nascimento || userData?.data_nascimento || '').toString().trim()),
    [userData]
  )
  const genero = useMemo(() => formatarGenero((userData?.SEXO || userData?.genero || userData?.sexo || '').toString().trim()), [userData])
  const nomeMae = useMemo(() => (userData?.NOME_MAE || userData?.nome_mae || userData?.mae || '').toString().trim() || '****************', [userData])
  const primeiroNome = useMemo(() => nomeCompleto.split(' ')[0], [nomeCompleto])

  function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    let temErro = false
    if (!email) {
      setErroEmail('O endereço de e-mail é obrigatório.')
      temErro = true
    } else if (!validarEmail(email)) {
      setErroEmail('Informe um endereço de e-mail válido.')
      temErro = true
    }
    const telefoneNumeros = telefone.replace(/\D/g, '')
    if (!telefone) {
      setErroTelefone('O telefone é obrigatório.')
      temErro = true
    } else if (telefoneNumeros.length < 10) {
      setErroTelefone('Informe um telefone válido.')
      temErro = true
    }
    if (temErro) return
    setCarregando(true)
    const atualizado: UserData = {
      ...userData,
      primeiroNome,
      email,
      telefone,
    }
    window.sessionStorage.setItem('userData', JSON.stringify(atualizado))
    window.setTimeout(() => {
      navigate('/simulacao')
    }, 1200)
  }

  function handleTelefone(valor: string) {
    setTelefone(formatarTelefone(valor))
  }

  if (!userData) {
    return null
  }

  return (
    <PageContainer>
      <section className="pessoa-page">
        <div className="pessoa-card">
          <ResumoPessoa nome={nomeCompleto} nascimento={nascimento} genero={genero} mae={nomeMae} primeiroNome={primeiroNome} />
          <div className="pessoa-card__form">
            <h3>Complete as informações restantes:</h3>
            <FormContatoPessoa
              email={email}
              telefone={telefone}
              erroEmail={erroEmail}
              erroTelefone={erroTelefone}
              carregando={carregando}
              onChangeEmail={setEmail}
              onChangeTelefone={handleTelefone}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
