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
