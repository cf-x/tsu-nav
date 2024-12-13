export interface Floor {
  floor: number;
  building: number;
  image?: string;
  entrances: number[];
  stairs: [number, number][];
  startingPoint: { x: number; y: number };
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
    children: [997, 998, 996], // todo stairs, exit
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
const b1f1_nodes: Node[] = [
  {
    id: 0,
    coo: [580, 690],
    closest: [1, 3],
    children: [111],
  },
  {
    id: 1,
    coo: [870, 690],
    closest: [1],
    children: [105, 104, 103, 102, 101],
  },
  {
    id: 2,
    coo: [50, 690],
    closest: [0, 3],
    children: [117, 118, 119, 120],
  },
  {
    id: 3,
    coo: [50, 135],
    closest: [2],
    children: [121],
  },
];

export const floors: Floor[] = [
  {
    floor: 0,
    building: 1,
    image: "/building-1-floor-0.png",
    entrances: [0, 3], // entrance nodes
    startingPoint: { x: 500, y: 625 },
    stairs: [],
    nodes: b1f0_nodes,
  },
  {
    floor: 1,
    building: 1,
    image: "/building-1-floor-1.png",
    entrances: [0, 1],
    startingPoint: { x: 500, y: 690 },
    stairs: [],
    nodes: b1f1_nodes,
  },
];
