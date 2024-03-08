import React from 'react'
import { fetchAndParseJson } from '../fetchAndParseJson'

export interface CategoryType {
  title: string
  items: string[]
}

export function useRepositoryHooks (): CategoryType[] {
  const configSrc: string = 'https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/scripts/config/repositories.json'
  const [categoryType, setCategoryType] = React.useState<CategoryType[]>(new Array<CategoryType>())
  React.useEffect(() => {
    fetchAndParseJson<CategoryType[]>(configSrc).then(
      (data): void => setCategoryType(data),
      (error): never => { throw new Error(error) }
    )
  }, [configSrc])
  return categoryType
}
