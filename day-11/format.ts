export type Execute = (lines: string[], EXPANSION_FACTOR: number) => number;

export const format = (raw: string, EXPANSION_FACTOR: number): Parameters<Execute> => {
  return [
    raw.split('\n'),
    EXPANSION_FACTOR
  ];
}