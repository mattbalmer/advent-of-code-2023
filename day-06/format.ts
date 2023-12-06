export type Execute = (lines: [string, string]) => number;

export const format = (raw: string): Parameters<Execute> => {
  return [
    raw.split('\n').filter(Boolean) as [string, string]
  ];
}