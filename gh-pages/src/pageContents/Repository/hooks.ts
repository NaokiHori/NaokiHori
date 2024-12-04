import React from "react";
import { fetchAndParseJson } from "../../utils/fetchAndParseJson";

export interface Category {
  name: string;
  repositoryNames: string[];
}

export interface RepositoryInfo {
  categories: Category[];
}

// original json data type
interface RawData {
  title: string;
  items: string[];
}

export function useRepositoryInfo(): {
  repositoryInfo: RepositoryInfo;
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
          (rawData: RawData) =>
            ({
              name: rawData.title,
              repositoryNames: rawData.items,
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
  return { repositoryInfo };
}
