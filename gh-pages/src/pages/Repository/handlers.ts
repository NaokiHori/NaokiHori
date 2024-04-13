import React from "react";
import { RepositoryInfo, Category } from "./models";

export interface Handlers {
  selectCategory: (categoryIndex: number) => void;
  unselectCategory: () => void;
}

export function useHandlers(
  repositoryInfo: RepositoryInfo,
  setRepositoryInfo: React.Dispatch<React.SetStateAction<RepositoryInfo>>,
): Handlers {
  const selectCategory = (categoryIndex: number): void => {
    const categories: Category[] = repositoryInfo.categories;
    setRepositoryInfo({
      ...repositoryInfo,
      categories: categories.map((category: Category) => {
        const newCategory: Category = {
          ...category,
          isSelected: category.index === categoryIndex,
        };
        return newCategory;
      }),
    });
  };
  const unselectCategory = (): void => {
    const categories: Category[] = repositoryInfo.categories;
    setRepositoryInfo({
      ...repositoryInfo,
      categories: categories.map((category: Category) => {
        const newCategory: Category = {
          ...category,
          isSelected: false,
        };
        return newCategory;
      }),
    });
  };
  return {
    selectCategory,
    unselectCategory,
  };
}
