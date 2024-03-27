import { JSX } from 'react'
import { Heading1, Heading2, UnorderedList } from './Utils'
import { CoverImage } from './CoverImage'
import coverImgUrl from './assets/three-phase.png'

export function About (): JSX.Element {
  const workElements: string[] = [
    'Fluid mechanics (turbulent multiphase flows)',
    'High performance computing'
  ]
  const interestElements: string[] = [
    'Numerical methods',
    'Software design'
  ]
  return (
    <>
      <CoverImage src={coverImgUrl} />
      <Heading1 title='Naoki HORI' />
      <div>
        Ph.D. candidate at University of Twente.
      </div>
      <Heading2 title='Work' />
      <UnorderedList elements={workElements} />
      <Heading2 title='Interest' />
      <UnorderedList elements={interestElements} />
    </>
  )
}
