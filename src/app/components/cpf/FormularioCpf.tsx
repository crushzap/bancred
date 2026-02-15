import type { FormEvent } from 'react'

type FormularioCpfProps = {
  cpf: string
  erro: string
  carregando: boolean
  onChange: (valor: string) => void
  onSubmit: (evento: FormEvent<HTMLFormElement>) => void
}

export default function FormularioCpf({
  cpf,
  erro,
  carregando,
  onChange,
  onSubmit,
}: FormularioCpfProps) {
  return (
    <div className="cpf-card">
      <div className="cpf-card__cabecalho">
        <div className="cpf-card__icone">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <polyline points="16 11 18 13 22 9" />
          </svg>
        </div>
        <h2>Vamos começar sua análise</h2>
        <p>Informe seu CPF para começar</p>
      </div>
      <form className="cpf-form" onSubmit={onSubmit}>
        <div className="cpf-form__grupo">
          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(event) => onChange(event.target.value)}
            maxLength={14}
            data-testid="input-cpf"
            className={erro ? 'cpf-input cpf-input--erro' : 'cpf-input'}
          />
          {erro ? (
            <p className="cpf-erro" data-testid="error-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
              <span>{erro}</span>
            </p>
          ) : null}
        </div>
        <button className="botao-gradiente botao-gradiente--full" type="submit" data-testid="button-continue" disabled={carregando}>
          {carregando ? 'Validando...' : 'Continuar'}
        </button>
        <div className="cpf-aviso">
          <div className="cpf-aviso__linha">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>Seus dados estão protegidos e não serão compartilhados</span>
          </div>
          <div className="cpf-aviso__linha">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>Análise em tempo real sem afetar seu score</span>
          </div>
        </div>
      </form>
    </div>
  )
}
