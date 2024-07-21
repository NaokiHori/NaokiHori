import React from "react";
import { fetchAndParseJson } from "../../util/fetchAndParseJson";
import { Category, RepositoryInfo } from "./models";

// original data type of json
interface RawData {
  title: string;
  items: string[];
}

export interface Handlers {
  selectCategory: (categoryIndex: number) => void;
  unselectCategory: () => void;
}

const updateRepositoryInfo = (
  repositoryInfo: RepositoryInfo,
  categoryIndex: number | null,
): RepositoryInfo => {
  const categories: Category[] = repositoryInfo.categories;
  return {
    ...repositoryInfo,
    categories: categories.map(
      (category: Category) =>
        ({
          ...category,
          isSelected:
            categoryIndex === null ? false : category.index === categoryIndex,
        }) satisfies Category,
    ),
  } satisfies RepositoryInfo;
};

export function useRepositoryInfo(): {
  repositoryInfo: RepositoryInfo;
  handlers: Handlers;
} {
  const configSrc =
    "https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/scripts/config/repositories.json";
  const defaultCategories = new Array<Category>();
  const [repositoryInfo, setRepositoryInfo] = React.useState<RepositoryInfo>({
    categories: defaultCategories,
  });
  React.useEffect(() => {
    fetchAndParseJson<RawData[]>(configSrc).then(
      (rawDataList: RawData[]): void => {
        // reshape json data (RawData) to data type of use (Category)
        const categories: Category[] = rawDataList.map(
          (rawData: RawData, index: number) =>
            ({
              index,
              name: rawData.title,
              repositoryNames: rawData.items,
              isSelected: false,
            }) satisfies Category,
        );
        setRepositoryInfo({
          categories,
        } satisfies RepositoryInfo);
      },
      (error: Error): never => {
        throw new Error(error.message);
      },
    );
    return () => {
      setRepositoryInfo({
        categories: defaultCategories,
      } satisfies RepositoryInfo);
    };
  }, [configSrc]);
  // prepare event handlers
  const selectCategory = (categoryIndex: number): void => {
    setRepositoryInfo((r: RepositoryInfo) =>
      updateRepositoryInfo(r, categoryIndex),
    );
  };
  const unselectCategory = (): void => {
    setRepositoryInfo((r: RepositoryInfo) => updateRepositoryInfo(r, null));
  };
  const handlers: Handlers = {
    selectCategory,
    unselectCategory,
  };
  return { repositoryInfo, handlers };
}
