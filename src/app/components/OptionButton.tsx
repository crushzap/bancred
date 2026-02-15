import type { ReactNode } from 'react'

type OptionButtonProps = {
  label: string
  icon: ReactNode
  selected?: boolean
  onClick?: () => void
}

export default function OptionButton({ label, icon, selected = false, onClick }: OptionButtonProps) {
  return (
    <button className={selected ? 'option-button option-button--selected' : 'option-button'} type="button" onClick={onClick}>
      <span className="option-button__icon">{icon}</span>
      <span>{label}</span>
    </button>
  )
}
