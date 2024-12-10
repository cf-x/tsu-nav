export interface Floor {
  floor: number;
  building: number;
  image?: string;
  entrances: number[];
  stairs: [number, number][];
  nodes: Node[];
}

export interface Node {
  id: number;
  coo: [number, number];
  closest: number[]; // closest node ids
  children: number[]; // children rooms
}

const b1f0_nodes: Node[] = [
  {
    id: 0,
    coo: [420, 625],
    closest: [1, 3],
    children: [997], // todo stairs, exit
  },
  {
    id: 1,
    coo: [50, 625],
    closest: [0, 2],
    children: [19, 20, 21, 22],
  },
  {
    id: 2,
    coo: [50, 230],
    closest: [1],
    children: [24, 999], // todo stairs, wc
  },
  {
    id: 3,
    coo: [870, 625],
    closest: [0],
    children: [1, 2, 3, 4, 5], // todo stairs, wc
  },
];

export const floors: Floor[] = [
  {
    floor: 0,
    building: 1,
    image: "/building-1-floor-0.png",
    entrances: [2, 4], // entrance nodes
    stairs: [],
    nodes: b1f0_nodes,
  },
];
