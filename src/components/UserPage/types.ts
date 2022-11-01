export interface ButtonOptions {
  id: number
  title: string
  value: string
  icon: JSX.Element
  onClick: (value: string) => void
}
