import React from "react";
import { fetchAndParseJson } from "../../../utils/fetchAndParseJson";
import { getSum, getMax, squashMinorStats } from "./utils";

export interface Info {
  name: string;
  size: number;
  color: string;
}

export interface GlobalStats {
  sumOfSizes: number;
  maxOfSizes: number;
}

export interface LanguageInfo {
  infoList: Info[];
  globalStats: GlobalStats;
}

// original data type of json
interface RawData {
  date: number;
  languages: {
    name: string;
    size: number;
    color: string;
  }[];
}

const validator = (data: unknown): data is RawData => {
  if (null === data || typeof data !== "object") {
    return false;
  }
  if (!("date" in data) || typeof data.date !== "number") {
    return false;
  }
  if (
    !("languages" in data) ||
    !Array.isArray(data.languages) ||
    !data.languages.every((language: unknown) => {
      if (null === language || typeof language !== "object") {
        return false;
      }
      if (!("name" in language) || typeof language.name !== "string") {
        return false;
      }
      if (!("size" in language) || typeof language.size !== "number") {
        return false;
      }
      if (!("color" in language) || typeof language.color !== "string") {
        return false;
      }
      return true;
    })
  ) {
    return false;
  }
  return true;
};

export function useLanguageInfo(): {
  date: Date;
  original: LanguageInfo;
  squashed: LanguageInfo;
} {
  // fetch json file storing information about my language use
  const configSrc =
    "https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/assets/language.json";
  const defaultLanguageInfo: LanguageInfo = {
    infoList: new Array<Info>(),
    globalStats: {
      maxOfSizes: 0,
      sumOfSizes: 0,
    },
  };
  const [date, setDate] = React.useState<Date>(new Date());
  const [originalInfo, setOriginalInfo] =
    React.useState<LanguageInfo>(defaultLanguageInfo);
  const [squashedInfo, setSquashedInfo] =
    React.useState<LanguageInfo>(defaultLanguageInfo);
  React.useEffect(() => {
    fetchAndParseJson<RawData>(configSrc, validator).then(
      (rawData: RawData): void => {
        // from UNIX milli second to Date
        setDate(new Date(rawData.date));
        // convert json data to data type of use
        const originalInfoList = new Array<Info>();
        for (const language of rawData.languages) {
          const originalInfo: Info = {
            name: language.name,
            size: language.size,
            color: language.color,
          };
          originalInfoList.push(originalInfo);
        }
        // sort in descending order just in case
        originalInfoList.sort((a: Info, b: Info) => b.size - a.size);
        // get rid of minor portions
        const squashedInfoList: Info[] = squashMinorStats(originalInfoList);
        // check sum and max of the whole languages
        //   to determine the ratio of each language chart
        const originalGlobalStats: GlobalStats = {
          sumOfSizes: getSum(originalInfoList),
          maxOfSizes: getMax(originalInfoList),
        };
        const squashedGlobalStats: GlobalStats = {
          sumOfSizes: getSum(squashedInfoList),
          maxOfSizes: getMax(squashedInfoList),
        };
        setOriginalInfo({
          infoList: originalInfoList,
          globalStats: originalGlobalStats,
        });
        setSquashedInfo({
          infoList: squashedInfoList,
          globalStats: squashedGlobalStats,
        });
      },
      (error: Error): never => {
        throw new Error(error.message);
      },
    );
    return () => {
      setOriginalInfo(defaultLanguageInfo);
      setSquashedInfo(defaultLanguageInfo);
    };
  }, [configSrc]);
  return { date, original: originalInfo, squashed: squashedInfo };
}
