export type Node = 'string';
export type Connections = [left: Node, right: Node];

export const CHAR_INDEX = 'LR';

export const parseMap = (lines: string[]) => {
  return lines.slice(2).reduce((map, line) => {
    const [id, connections] = line.split(' = ');
    const [left, right] = connections.split(', ');
    return {
      ...map,
      [id]: [left.substring(1), right.substring(0, right.length - 1)]
    }
  }, {} as Record<Node, Connections>);
}