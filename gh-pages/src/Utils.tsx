import { JSX } from 'react'

export function Heading1 ({ title }: { title: string }): JSX.Element {
  return (
    <h1 style={{ textAlign: 'left' }}>
      {title}
    </h1>
  )
}

export function Heading2 ({ title }: { title: string }): JSX.Element {
  return (
    <h2 style={{ textAlign: 'left' }}>
      {title}
    </h2>
  )
}

export function Heading3 ({ title }: { title: string }): JSX.Element {
  return (
    <h3 style={{ textAlign: 'left' }}>
      {title}
    </h3>
  )
}

export function UnorderedList ({ elements }: { elements: string[] }): JSX.Element {
  return (
    <ul>
      {elements.map((element: string, index: number) => (
        <li key={index}>
          {element}
        </li>
      ))}
    </ul>
  )
}
