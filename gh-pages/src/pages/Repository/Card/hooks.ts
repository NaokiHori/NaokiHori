import React from "react";
import { fetchAndParseJson } from "../../../util/fetchAndParseJson";
import { Info } from "./models";

// original data type of json
interface RawData {
  name: string;
  descr: string;
  topics: string[];
  langs: { name: string; size: number; color: string }[];
  nStars: number;
  lastUpdate: number;
}

export function useCard(repositoryName: string): [boolean, Info] {
  const defaultInfo: Info = {
    name: "",
    descr: "",
    topics: [],
    languages: [],
    nStars: 0,
    lastUpdate: null,
  };
  const configSrc = `https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/assets/${repositoryName}.json`;
  const [info, setInfo] = React.useState<Info>(defaultInfo);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    fetchAndParseJson<RawData>(configSrc).then(
      (rawData: RawData): void => {
        setInfo(
          // convert json data to data type of use
          {
            name: rawData.name,
            topics: rawData.topics,
            languages: rawData.langs,
            descr: rawData.descr,
            nStars: rawData.nStars,
            // receive milli-sec string, convert it to Date
            lastUpdate: new Date(rawData.lastUpdate),
          } satisfies Info,
        );
        setIsLoaded(true);
      },
      (error: Error): never => {
        throw new Error(error.message);
      },
    );
    return () => {
      setInfo(defaultInfo);
      setIsLoaded(false);
    };
  }, [configSrc]);
  return [isLoaded, info];
}
