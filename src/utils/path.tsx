import { floors } from "../data/floors";

export function nodes(b: number, fl: number, room: number): [number, number][] {
  const result: [number, number][] = [];
  const history: number[] = [];
  const floor = floors.find(
    (floor) => floor.floor === fl && floor.building === b
  );

  if (!floor) {
    return [];
  }

  const queue: { path: number[]; currentNode: number }[] = [];

  floor.entrances.forEach((entranceIndex) => {
    history.push(entranceIndex);
    queue.push({ path: [entranceIndex], currentNode: entranceIndex });
  });

  while (queue.length > 0) {
    const { path, currentNode } = queue.shift()!;
    const current = floor.nodes[currentNode];

    if (!current) {
      continue;
    }
    if (current.children.includes(room)) {
      console.log(history);
      const i = floor.nodes[currentNode].closest[0];
      if (i) result.push(floor.nodes[i].coo);
      result.push(floor.nodes[currentNode].coo);
      return result;
    }
    current.closest.forEach((neighbor) => {
      if (!history.includes(neighbor)) {
        history.push(neighbor);
        queue.push({ path: [...path, neighbor], currentNode: neighbor });
      }
    });
  }

  return result;
}
