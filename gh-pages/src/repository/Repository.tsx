import React, { JSX } from 'react'
import { Heading1, Heading2 } from '../Utils'
import { CategoryType, useRepositoryHooks } from './info'
import { CoverImage } from '../CoverImage'
import coverImgUrl from '../assets/hdt2d.jpg'

function Element ({ item }: { item: string }): JSX.Element {
  const href: string = `https://github.com/NaokiHori/${item}`
  const imgSrc: string = `https://raw.githubusercontent.com/NaokiHori/NaokiHori/card/card/${item}.svg`
  return (
    <div style={{ textAlign: 'center' }}>
      <a href={href} target='_blank' rel='noreferrer'>
        <img className='Card' src={imgSrc} />
      </a>
    </div>
  )
}

function Category ({ category }: { category: CategoryType }): JSX.Element {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false)
  const handleClick = (currentState: boolean): void => {
    const newState: boolean = !currentState
    setIsExpanded(newState)
  }
  const title: string = category.title
  const items: string[] = category.items
  return (
    <div onClick={() => handleClick(isExpanded)} style={{ cursor: 'pointer' }}>
      <Heading2 title={title} />
      {isExpanded && items.map((item: string, index: number) => (
        <Element key={index} item={item} />
      ))}
    </div>
  )
}

export function Repository (): JSX.Element {
  const categories: CategoryType[] = useRepositoryHooks()
  return (
    <>
      <CoverImage src={coverImgUrl} />
      <Heading1 title='GitHub Repository' />
      {categories.map((category: CategoryType, index: number) => (
        <Category key={index} category={category} />
      ))}
    </>
  )
}
