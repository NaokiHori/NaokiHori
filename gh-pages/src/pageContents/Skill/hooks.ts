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
    fetchAndParseJson<RawData>(configSrc).then(
      (rawData: RawData): void => {
        setLanguageSkillInfoList(rawData.languages);
        setToolSkillInfoList(rawData.tools);
      },
      (error: Error): never => {
        throw new Error(error.message);
      },
    );
    return () => {
      setLanguageSkillInfoList([]);
      setToolSkillInfoList([]);
    };
  }, [configSrc]);
  return { languageSkillInfoList, toolSkillInfoList };
}
