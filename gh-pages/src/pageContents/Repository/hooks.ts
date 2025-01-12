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

const validator = (dataList: unknown): dataList is RawData[] => {
  if (null === dataList) {
    console.error("dataList is null");
    return false;
  }
  if (typeof dataList !== "object") {
    console.error("dataList is not object");
    return false;
  }
  if (
    !Array.isArray(dataList) ||
    !dataList.every((data: unknown) => {
      if (typeof data !== "object") {
        return false;
      }
      if (!data || !("title" in data) || typeof data.title !== "string") {
        console.error("invalid member: title");
        return false;
      }
      if (
        !("items" in data) ||
        !Array.isArray(data.items) ||
        !data.items.every((item: unknown) => typeof item === "string")
      ) {
        console.error("invalid member: items");
        return false;
      }
      return true;
    })
  ) {
    return false;
  }
  return true;
};

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
    fetchAndParseJson<RawData[]>(configSrc, validator).then(
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
      (error: unknown): never => {
        if (error instanceof Error) {
          console.error(error.message);
        }
        throw error;
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
