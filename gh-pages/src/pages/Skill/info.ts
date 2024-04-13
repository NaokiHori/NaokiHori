import React from "react";
import { fetchAndParseJson } from "../../util/fetchAndParseJson";

export interface Info {
  name: string;
  href: string;
  src: string;
  image: string;
}

export interface SkillInfo {
  languages: Info[];
  tools: Info[];
}

export function useSkillInfo(): SkillInfo {
  const configSrc =
    "https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/scripts/config/skill.json";
  const [skillInfo, setSkillInfo] = React.useState<SkillInfo>({
    languages: Array<Info>(),
    tools: Array<Info>(),
  });
  React.useEffect(() => {
    fetchAndParseJson<SkillInfo>(configSrc).then(
      (data: SkillInfo): void => {
        setSkillInfo(data);
      },
      (error: Error): never => {
        throw new Error(error.message);
      },
    );
  }, [configSrc]);
  return skillInfo;
}
