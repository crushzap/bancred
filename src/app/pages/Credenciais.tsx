import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import PageContainer from '../components/PageContainer'
import PrimaryButton from '../components/PrimaryButton'

type UserData = {
  email?: string
}

export default function Credenciais() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)

  useEffect(() => {
    const stored = window.sessionStorage.getItem('userData')
    if (!stored) return
    try {
      const parsed = JSON.parse(stored) as UserData
      if (parsed?.email) {
        setEmail(parsed.email)
      }
    } catch {
      return
    }
  }, [])

  return (
    <PageContainer>
      <Card>
        <div className="credenciais-card">
          <h2 className="card-title">Crie sua senha de acesso</h2>
          <p className="card-subtitle">Defina suas credenciais para acessar nossa plataforma e acompanhar seu empréstimo</p>
          <div className="pessoa-form">
            <div className="pessoa-form__linha">
              <label htmlFor="credenciais-email">Email</label>
              <div className="pessoa-input-wrapper">
                <input
                  id="credenciais-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="pessoa-input"
                />
              </div>
            </div>
            <div className="pessoa-form__linha">
              <label htmlFor="credenciais-senha">Senha</label>
              <div className="pessoa-input-wrapper credenciais-input-wrapper">
                <input
                  id="credenciais-senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  className="pessoa-input"
                />
                <button
                  type="button"
                  className="credenciais-toggle"
                  onClick={() => setMostrarSenha((prev) => !prev)}
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {mostrarSenha ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a21.81 21.81 0 0 1 5.06-6.94" />
                      <path d="M1 1l22 22" />
                      <path d="M10.59 10.59A2 2 0 0 0 12 14a2 2 0 0 0 1.41-.59" />
                      <path d="M9.88 4.24A10.94 10.94 0 0 1 12 4c7 0 10 8 10 8a21.81 21.81 0 0 1-3.34 4.94" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <PrimaryButton type="button" onClick={() => navigate('/configurando-conta')}>
            Continuar
          </PrimaryButton>
        </div>
      </Card>
    </PageContainer>
  )
}
