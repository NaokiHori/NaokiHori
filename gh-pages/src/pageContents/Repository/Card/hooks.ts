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

const validator = (data: unknown): data is RawData => {
  if (null === data) {
    console.error("data is null");
    return false;
  }
  if (typeof data !== "object") {
    console.error("data is not object");
    return false;
  }
  if (!("name" in data) || typeof data.name !== "string") {
    console.error("invalid member: name");
    return false;
  }
  if (!("descr" in data) || typeof data.descr !== "string") {
    console.error("invalid member: descr");
    return false;
  }
  if (
    !("topics" in data) ||
    !Array.isArray(data.topics) ||
    !data.topics.every((topic: unknown) => typeof topic === "string")
  ) {
    console.error("invalid member: topics");
    return false;
  }
  if (
    !("langs" in data) ||
    !Array.isArray(data.langs) ||
    !data.langs.every((lang: unknown) => {
      if (lang === null || typeof lang !== "object") {
        return false;
      }
      if (!("name" in lang) || typeof lang.name !== "string") {
        return false;
      }
      if (!("size" in lang) || typeof lang.size !== "number") {
        return false;
      }
      if (!("color" in lang) || typeof lang.name !== "string") {
        return false;
      }
      return true;
    })
  ) {
    console.error("invalid member: langs");
    return false;
  }
  if (!("nStars" in data) || typeof data.nStars !== "number") {
    console.error("invalid member: nStars");
    return false;
  }
  if (!("lastUpdate" in data) || typeof data.lastUpdate !== "number") {
    console.error("invalid member: lastUpdate");
    return false;
  }
  return true;
};

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
    fetchAndParseJson<RawData>(configSrc, validator).then(
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
      (error: unknown): never => {
        if (error instanceof Error) {
          console.error(error.message);
        }
        throw error;
      },
    );
    return () => {
      setCardInfo(defaultCardInfo);
      setIsCardInfoLoaded(false);
    };
  }, [configSrc]);
  return { isCardInfoLoaded, cardInfo };
}
