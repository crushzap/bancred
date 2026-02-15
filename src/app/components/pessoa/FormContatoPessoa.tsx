import type { FormEvent } from 'react'

type FormContatoPessoaProps = {
  email: string
  telefone: string
  erroEmail: string
  erroTelefone: string
  carregando: boolean
  onChangeEmail: (valor: string) => void
  onChangeTelefone: (valor: string) => void
  onSubmit: (evento: FormEvent<HTMLFormElement>) => void
}

export default function FormContatoPessoa({
  email,
  telefone,
  erroEmail,
  erroTelefone,
  carregando,
  onChangeEmail,
  onChangeTelefone,
  onSubmit,
}: FormContatoPessoaProps) {
  return (
    <form className="pessoa-form" onSubmit={onSubmit}>
      <div className="pessoa-form__linha">
        <label htmlFor="email">E-mail</label>
        <div className="pessoa-input-wrapper">
          <input
            id="email"
            type="email"
            placeholder="seuemail@gmail.com"
            value={email}
            onChange={(event) => onChangeEmail(event.target.value)}
            className={erroEmail ? 'pessoa-input pessoa-input--erro' : 'pessoa-input'}
            data-testid="input-email"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
        </div>
        {erroEmail ? <p className="pessoa-erro">{erroEmail}</p> : null}
      </div>
      <div className="pessoa-form__linha">
        <label htmlFor="telefone">Telefone</label>
        <div className="pessoa-input-wrapper">
          <input
            id="telefone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={telefone}
            onChange={(event) => onChangeTelefone(event.target.value)}
            className={erroTelefone ? 'pessoa-input pessoa-input--erro' : 'pessoa-input'}
            data-testid="input-phone"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
        {erroTelefone ? <p className="pessoa-erro">{erroTelefone}</p> : null}
      </div>
      <button className="botao-verde" type="submit" data-testid="button-continue" disabled={carregando}>
        {carregando ? 'Processando...' : 'Garantir Meu Dinheiro!'}
      </button>
    </form>
  )
}
