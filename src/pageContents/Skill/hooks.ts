import React from "react";
import { fetchAndParseJson } from "../../utils/fetchAndParseJson";

export interface SkillInfo {
  name: string;
  href: string;
  src: string;
  image: string;
}

interface RawData {
  languages: SkillInfo[];
  tools: SkillInfo[];
}

const validator = (data: unknown): data is RawData => {
  if (null === data) {
    return false;
  }
  if (typeof data !== "object") {
    return false;
  }
  if (
    !("languages" in data) ||
    !Array.isArray(data.languages) ||
    !data.languages.every((language: unknown) => {
      if (!language || typeof language !== "object") {
        return false;
      }
      if (!("name" in language) || typeof language.name !== "string") {
        return false;
      }
      if (!("href" in language) || typeof language.href !== "string") {
        return false;
      }
      if (!("src" in language) || typeof language.src !== "string") {
        return false;
      }
      if (!("image" in language) || typeof language.image !== "string") {
        return false;
      }
      return true;
    })
  ) {
    return false;
  }
  return true;
};

export function useSkillInfo(): {
  languageSkillInfoList: SkillInfo[];
  toolSkillInfoList: SkillInfo[];
} {
  const configSrc =
    "https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/scripts/config/skill.json";
  const [languageSkillInfoList, setLanguageSkillInfoList] = React.useState<
    SkillInfo[]
  >([]);
  const [toolSkillInfoList, setToolSkillInfoList] = React.useState<SkillInfo[]>(
    [],
  );
  React.useEffect(() => {
    fetchAndParseJson<RawData>(configSrc, validator).then(
      (rawData: RawData): void => {
        setLanguageSkillInfoList(rawData.languages);
        setToolSkillInfoList(rawData.tools);
      },
      (error: unknown): never => {
        if (error instanceof Error) {
          console.error(error.message);
        }
        throw error;
      },
    );
    return () => {
      setLanguageSkillInfoList([]);
      setToolSkillInfoList([]);
    };
  }, [configSrc]);
  return { languageSkillInfoList, toolSkillInfoList };
}
