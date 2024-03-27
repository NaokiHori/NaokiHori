import { JSX } from 'react'

export function LanguageStats (): JSX.Element {
  const src: string = 'https://raw.githubusercontent.com/NaokiHori/NaokiHori/card/card/language.svg'
  return (
    <div style={{ textAlign: 'center' }}>
      <img className='Card' src={src} alt='Language Card' />
    </div>
  )
}
