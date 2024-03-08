import { Heading1, Heading2 } from '../Utils'
import { CoverImage } from "../CoverImage"
import coverImgUrl from "../assets/collision.jpg"

interface Info {
  role: string
  group: string
  university: string
  country: string
  duration: string
  misc?: string
}

function Element ({ info }: { info: Info }): JSX.Element {
  const title: string = `${info.role}: ${info.duration}`
  const affiliation: string = `${info.group}, ${info.university}, ${info.country}`
  return (
    <>
      <Heading2 title={title} />
      <div>
        {affiliation}
      </div>
      <div>
        {info.misc ?? ''}
      </div>
    </>
  )
}

export function Cv (): JSX.Element {
  const infoList: Info[] = [
    {
      role: 'PhD candidate',
      duration: 'May 2020 - Sep. 2024 (planned)',
      group: 'Physics of Fluids group',
      university: 'University of Twente',
      country: 'THE NETHERLANDS'
    },
    {
      role: 'MSc in Mechanical Engineering',
      duration: 'Apr. 2018 - Mar. 2020',
      group: 'Fluid Engineering Laboratory',
      university: 'The University of Tokyo',
      country: 'JAPAN',
      misc: 'Miura Award, The Japan Society of Mechanical Engineering'
    },
    {
      role: 'Exchange student',
      duration: 'Aug. 2018 - Mar. 2019',
      group: 'Linné Flow Center',
      university: 'KTH Royal Institute of Technology',
      country: 'SWEDEN'
    },
    {
      role: 'BSc in Mechanical Engineering',
      duration: 'Apr. 2014 - Mar. 2018',
      group: 'Fluid Engineering Laboratory',
      university: 'The University of Tokyo',
      country: 'JAPAN'
    }
  ]
  return (
    <>
      <CoverImage src={coverImgUrl} backgroundColor='#242424' />
      <Heading1 title='Curriculum Vitae' />
      {infoList.map((info: Info, index: number) => (
        <Element key={index} info={info} />
      ))}
    </>
  )
}
