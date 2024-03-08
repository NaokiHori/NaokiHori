// header component at the top of all pages

import React, { JSX } from 'react'
import { Page } from './Page'

function HeaderElement ({ page, setPage }: { page: Page, setPage: React.Dispatch<React.SetStateAction<Page>> }): JSX.Element {
  const [isHovered, setIsHovered] = React.useState(false)
  const handleMouseEnter = (): void => {
    setIsHovered(true)
  }
  const handleMouseLeave = (): void => {
    setIsHovered(false)
  }
  const handleClick = (newPage: Page): void => {
    setPage(newPage)
  }
  const color: string = isHovered ? '#ffff00' : '#aaaaaa'
  const cursor: string = isHovered ? 'pointer' : 'default'
  return (
    <div
      style={{ padding: '10px', color, flex: '1 1 auto', textAlign: 'center', fontSize: '20px', cursor, transition: 'color 0.2s' }}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
      onClick={() => handleClick(page)}
    >
      {page.title}
    </div>
  )
}

export function Header ({ pages, setPage }: { pages: Page[], setPage: React.Dispatch<React.SetStateAction<Page>> }): JSX.Element {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}>
      {pages.map((page: Page, index: number) => (
        <HeaderElement key={index} page={page} setPage={setPage} />
      ))}
    </div>
  )
}
