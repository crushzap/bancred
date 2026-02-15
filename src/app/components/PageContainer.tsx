import type { ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
}

export default function PageContainer({ children }: PageContainerProps) {
  return <div className="page-container">{children}</div>
}
