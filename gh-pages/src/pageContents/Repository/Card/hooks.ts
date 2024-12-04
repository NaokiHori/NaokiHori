import React from "react";
import { fetchAndParseJson } from "../../../utils/fetchAndParseJson";

// original data type of json
interface RawData {
  name: string;
  descr: string;
  topics: string[];
  langs: { name: string; size: number; color: string }[];
  nStars: number;
  lastUpdate: number;
}

export interface CardInfo {
  name: string;
  description: string;
  topics: string[];
  languages: { name: string; size: number; color: string }[];
  nStars: number;
  lastUpdate: Date | null;
}

export function useCardInfo(repositoryName: string): {
  isCardInfoLoaded: boolean;
  cardInfo: CardInfo;
} {
  const defaultCardInfo = {
    name: repositoryName,
    description: "",
    topics: [],
    languages: [],
    nStars: 0,
    lastUpdate: null,
  } satisfies CardInfo;
  const configSrc = `https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/assets/${repositoryName}.json`;
  const [cardInfo, setCardInfo] = React.useState<CardInfo>(defaultCardInfo);
  const [isCardInfoLoaded, setIsCardInfoLoaded] =
    React.useState<boolean>(false);
  React.useEffect(() => {
    fetchAndParseJson<RawData>(configSrc).then(
      (rawData: RawData): void => {
        setCardInfo(
          // convert json data to data type of use
          {
            name: rawData.name,
            topics: rawData.topics,
            languages: rawData.langs,
            description: rawData.descr,
            nStars: rawData.nStars,
            // receive milli-sec string, convert it to Date
            lastUpdate: new Date(rawData.lastUpdate),
          } satisfies CardInfo,
        );
        setIsCardInfoLoaded(true);
      },
      (error: Error): never => {
        throw new Error(error.message);
      },
    );
    return () => {
      setCardInfo(defaultCardInfo);
      setIsCardInfoLoaded(false);
    };
  }, [configSrc]);
  return { isCardInfoLoaded, cardInfo };
}
