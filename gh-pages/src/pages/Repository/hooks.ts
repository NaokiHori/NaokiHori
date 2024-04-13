import React from "react";
import { fetchAndParseJson } from "../../util/fetchAndParseJson";
import { Category, RepositoryInfo } from "./models";
import { Handlers, useHandlers } from "./handlers";

// original data type of json
interface RawData {
  title: string;
  items: string[];
}

export function useRepositoryInfo(): {
  repositoryInfo: RepositoryInfo;
  handlers: Handlers;
} {
  const configSrc =
    "https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/scripts/config/repositories.json";
  const [repositoryInfo, setRepositoryInfo] = React.useState<RepositoryInfo>({
    categories: new Array<Category>(),
  });
  React.useEffect(() => {
    fetchAndParseJson<RawData[]>(configSrc).then(
      (rawDataList: RawData[]): void => {
        // reshape json data to data type of use
        const categories = new Array<Category>();
        for (const [index, rawData] of rawDataList.entries()) {
          const category: Category = {
            index,
            name: rawData.title,
            repositoryNames: rawData.items,
            isSelected: false,
          };
          categories.push(category);
        }
        const repositoryInfo: RepositoryInfo = {
          categories,
        };
        setRepositoryInfo(repositoryInfo);
      },
      (error: Error): never => {
        throw new Error(error.message);
      },
    );
  }, [configSrc]);
  // prepare event handlers
  const handlers: Handlers = useHandlers(repositoryInfo, setRepositoryInfo);
  return { repositoryInfo, handlers };
}
