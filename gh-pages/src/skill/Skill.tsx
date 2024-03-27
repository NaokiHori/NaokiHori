import { JSX } from 'react'
import { Heading1, Heading2 } from '../Utils'
import { Info, SkillInfo, useSkillHooks } from './info'
import { CoverImage } from '../CoverImage'
import { LanguageStats } from './LanguageStats/LanguageStats'
import coverImgUrl from '../assets/rb2d.jpg'

function SkillItem ({ info }: { info: Info }): JSX.Element {
  const name: string = info.name
  const href: string = info.href
  const image: string = info.image
  return (
    <div style={{ padding: '2px 2px', flex: '0 0 auto' }}>
      <a href={href}>
        <img src={image} alt={name} height='65px' />
      </a>
    </div>
  )
}

function Container ({ infoList }: { infoList: Info[] }): JSX.Element {
  return (
    <div style={{ margin: 'auto', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      {infoList.map((info: Info, index: number) => (
        <SkillItem key={index} info={info} />
      ))}
    </div>
  )
}

export function Skill (): JSX.Element {
  const skillInfo: SkillInfo = useSkillHooks()
  return (
    <>
      <CoverImage src={coverImgUrl} />
      <Heading1 title='Skill' />
      <Heading2 title='Languages, libraries, frameworks' />
      <Container infoList={skillInfo.languages} />
      <Heading2 title='Tools, DevOps, Platforms' />
      <Container infoList={skillInfo.tools} />
      <Heading2 title='Language statistics' />
      <LanguageStats />
    </>
  )
}
