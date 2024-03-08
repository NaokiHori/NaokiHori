import React, { JSX } from 'react'
import { createRoot } from 'react-dom/client'
import { Page } from './Page'
import { Header } from './Header'
import { About } from './About'
import { Skill } from './skill/Skill'
import { Repository } from './repository/Repository'
import { Cv } from './cv/Cv'
import { Contact } from './Contact'
import './style.css'

export function App (): JSX.Element {
  const bodyWidth: string = '80%'
  const pages: Page[] = [
    { title: 'About', component: <About /> },
    { title: 'Skill', component: <Skill /> },
    { title: 'Repository', component: <Repository /> },
    { title: 'CV', component: <Cv /> },
    { title: 'Contact', component: <Contact /> }
  ]
  const [currentPage, setPage] = React.useState<Page>(pages[0])
  return (
    <div style={{ margin: 'auto', width: bodyWidth }}>
      <Header pages={pages} setPage={setPage} />
      {pages.map((page: Page, index: number) => {
        if (page.title === currentPage.title) {
          return (
            <React.Fragment key={index}>
              {page.component}
            </React.Fragment>
          )
        } else {
          return <React.Fragment key={index} />
        }
      })}
    </div>
  )
}

const id: string = 'root'
const rootElement: HTMLElement | null = document.getElementById(id)
if (rootElement === null) {
  throw new Error(`The root element "${id}" is not found`)
}
const root = createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
