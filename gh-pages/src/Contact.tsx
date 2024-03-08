import { JSX } from 'react'

interface ContactInfo {
  href: string
  label: string
}

function Element ({ contactInfo }: { contactInfo: ContactInfo }): JSX.Element {
  const href: string = contactInfo.href
  const label: string = contactInfo.label
  return (
    <li>
      <a href={href} target='_blank' rel='noreferrer' style={{ color: '#fff' }}>
        {label}
      </a>
    </li>
  )
}

export function Contact (): JSX.Element {
  const contactInfos: ContactInfo[] = [
    {
      href: 'https://github.com/NaokiHori',
      label: 'GitHub'
    },
    {
      href: 'https://gitlab.com/NaokiHori',
      label: 'GitLab (smaller projects)'
    },
    {
      href: 'https://www.youtube.com/@NaokiHori',
      label: 'YouTube (gallery)'
    },
    {
      href: 'https://www.linkedin.com/in/naoki-hori-b559032a1/',
      label: 'Linkedin'
    },
    {
      href: 'https://qiita.com/NaokiHori',
      label: 'Qiita (articles in Japanese)'
    }
  ]
  return (
    <ul>
      {contactInfos.map((contactInfo: ContactInfo, index: number) => (
        <Element key={index} contactInfo={contactInfo} />
      ))}
    </ul>
  )
}
