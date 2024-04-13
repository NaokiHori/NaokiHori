export type DisplaySize = "Wide" | "Narrow";

const threshold = 768;

export const WideScreen = `screen and (min-width: ${(threshold + 1).toString()}px)`;
export const NarrowScreen = `screen and (max-width: ${threshold.toString()}px)`;
