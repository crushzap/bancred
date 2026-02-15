type ResumoPessoaProps = {
  nome: string
  nascimento: string
  genero: string
  mae: string
  primeiroNome: string
}

export default function ResumoPessoa({ nome, nascimento, genero, mae, primeiroNome }: ResumoPessoaProps) {
  return (
    <div className="pessoa-card__cabecalho">
      <div className="pessoa-card__icone">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.801 10A10 10 0 1 1 17 3.335" />
          <path d="m9 11 3 3L22 4" />
        </svg>
      </div>
      <h2>
        Olá, <span className="pessoa-nome">{primeiroNome}</span>!
      </h2>
      <p>Seu perfil está pré-aprovado. Vamos garantir esse dinheiro pra você agora?</p>
      <div className="pessoa-dados">
        <div className="pessoa-dado">
          <div className="pessoa-dado__icone">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <span>Nome Completo</span>
            <strong>{nome}</strong>
          </div>
        </div>
        <div className="pessoa-dado">
          <div className="pessoa-dado__icone">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
              <path d="M8 2v4" />
              <path d="M16 2v4" />
            </svg>
          </div>
          <div>
            <span>Data de Nascimento</span>
            <strong>{nascimento}</strong>
          </div>
        </div>
        <div className="pessoa-dado">
          <div className="pessoa-dado__icone">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 0-4 4" />
              <path d="M12 2a4 4 0 0 1 4 4" />
              <circle cx="12" cy="8" r="4" />
              <path d="M6 22v-2a6 6 0 0 1 6-6" />
              <path d="M18 22v-2a6 6 0 0 0-6-6" />
            </svg>
          </div>
          <div>
            <span>Gênero</span>
            <strong>{genero}</strong>
          </div>
        </div>
        <div className="pessoa-dado">
          <div className="pessoa-dado__icone">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div>
            <span>Nome da Mãe</span>
            <strong>{mae}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
