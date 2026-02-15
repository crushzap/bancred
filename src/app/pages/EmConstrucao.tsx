import PageContainer from '../components/PageContainer'

type EmConstrucaoProps = {
  titulo: string
}

export default function EmConstrucao({ titulo }: EmConstrucaoProps) {
  return (
    <PageContainer>
      <div className="placeholder">
        <h2>{titulo}</h2>
        <p>Estamos preparando esta etapa para você.</p>
      </div>
    </PageContainer>
  )
}
