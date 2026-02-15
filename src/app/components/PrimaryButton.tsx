import type { ButtonHTMLAttributes } from 'react'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export default function PrimaryButton({ className, ...props }: PrimaryButtonProps) {
  const classes = ['button-primary', className].filter(Boolean).join(' ')
  return <button className={classes} {...props} />
}
