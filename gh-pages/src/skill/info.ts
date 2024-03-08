import React from 'react'
import { fetchAndParseJson } from '../fetchAndParseJson'

export interface Info {
  name: string
  href: string
  src: string
  image: string
}

export interface SkillInfo {
  languages: Info[]
  tools: Info[]
}

export function useSkillHooks (): SkillInfo {
  const configSrc: string = 'https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/scripts/config/skill.json'
  const [skillInfo, setSkillInfo] = React.useState<SkillInfo>({ languages: Array<Info>(), tools: Array<Info>() })
  React.useEffect(() => {
    fetchAndParseJson<SkillInfo>(configSrc).then(
      (data): void => setSkillInfo(data),
      (error): never => { throw new Error(error) }
    )
  }, [configSrc])
  return skillInfo
}
