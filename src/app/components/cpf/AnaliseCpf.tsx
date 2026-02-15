type AnaliseCpfProps = {
  etapa: number
}

const etapas = [
  {
    titulo: 'Consultando banco de dados',
    concluido: 'Consultando banco de dados',
  },
  {
    titulo: 'Finalizando verificação',
    concluido: 'Finalizando verificação',
  },
  {
    titulo: 'Tudo pronto para seguir',
    concluido: 'Tudo pronto para seguir',
  },
]

export default function AnaliseCpf({ etapa }: AnaliseCpfProps) {
  return (
    <div className="cpf-analise-card">
      <div className="cpf-analise-card__cabecalho">
        <div className="cpf-analise-card__loader">
          <div className="cpf-analise-card__circulo" />
          <div className="cpf-analise-card__icone">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <polyline points="16 11 18 13 22 9" />
            </svg>
          </div>
        </div>
        <h3>Analisando seus dados</h3>
        <p>Processando informações...</p>
      </div>
      <div className="cpf-analise-lista">
        {etapas.map((item, index) => {
          const status = etapa > index ? 'feito' : etapa === index ? 'ativo' : 'pendente'
          return (
            <div key={item.titulo} className={`cpf-analise-item cpf-analise-item--${status}`}>
              <div className="cpf-analise-item__icone">
                {status === 'feito' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                )}
              </div>
              <div className="cpf-analise-item__texto">
                <p>{status === 'feito' ? item.concluido : item.titulo}</p>
                {status === 'ativo' ? <span className="cpf-analise-item__ponto">...</span> : null}
              </div>
            </div>
          )
        })}
      </div>
      <div className="cpf-analise-rodape">
        <span className="cpf-analise-rodape__ponto" />
        <span>Conexão segura ativa</span>
      </div>
    </div>
  )
}
