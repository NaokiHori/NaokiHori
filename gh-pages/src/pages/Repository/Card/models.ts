export interface Info {
  name: string;
  descr: string;
  topics: string[];
  languages: { name: string; size: number; color: string }[];
  nStars: number;
  lastUpdate: Date | null;
}
