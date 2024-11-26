export interface Building {
  id: number;
  name: string;
  description: string;
  info: string;
  keywords: string;
  coordinates: [number, number];
  images: string[];
}

export interface Room {
  id: number;
  name: string;
  description: string;
  floor: number;
  building: number; // id
}

export const rooms: Room[] = [
  {
    id: 0,
    name: "room 101",
    description: "something room, short description",
    floor: 1,
    building: 1,
  },
  {
    id: 1,
    name: "room 102",
    description: "something room, short description",
    floor: 1,
    building: 1,
  },
  {
    id: 3,
    name: "room 103",
    description: "something room, short description",
    floor: 1,
    building: 1,
  },
  {
    id: 4,
    name: "room 104",
    description: "something room, short description",
    floor: 1,
    building: 1,
  },
];

export const buildings: Building[] = [
  {
    id: 1,
    name: "Building 1",
    description: "This is Building 1 description.",
    coordinates: [41.710021791849755, 44.77798537734414],
    keywords: "pirveli I პირველი",
    info: "long building info",
    images: [],
  },
  {
    id: 2,
    name: "Building 2",
    description: "This is Building 2 description.",
    coordinates: [41.709910097841394, 44.77729715234523],
    keywords: "",
    info: "long building info",
    images: [],
  },
  {
    id: 3,
    name: "Building 3",
    description: "This is Building 3 description.",
    coordinates: [41.70946393443499, 44.77359238248195],
    keywords: "",
    info: "long building info",
    images: [],
  },
  {
    id: 4,
    name: "Building 4",
    description: "This is Building 4 description.",
    coordinates: [41.70912757062065, 44.77633038370778],
    keywords: "",
    info: "long building info",
    images: [],
  },
  {
    id: 5,
    name: "Building 5",
    description: "This is Building 5 description.",
    coordinates: [41.70931554094097, 44.76927962893693],
    keywords: "",
    info: "long building info",
    images: [],
  },
  {
    id: 6,
    name: "Building 6",
    description: "This is Building 6 description.",
    coordinates: [41.709275305476844, 44.77792661567516],
    keywords: "",
    info: "long building info",
    images: [],
  },
  {
    id: 8,
    name: "Building 8",
    description: "This is Building 8 description.",
    coordinates: [41.709397981814796, 44.77135060958289],
    keywords: "",
    info: "long building info",
    images: [],
  },
  {
    id: 10,
    name: "Building 10",
    description: "This is Building 10 description.",
    coordinates: [41.71800695489153, 44.721747765078646],
    keywords: "",
    info: "long building info",
    images: [],
  },
  {
    id: 11,
    name: "Building 11",
    description: "This is Building 11 description.",
    coordinates: [41.71710022096546, 44.72161524648287],
    keywords: "",
    info: "long building info",
    images: [],
  },
  {
    id: 12,
    name: "Library",
    description: "This is the Library.",
    coordinates: [41.716835064875916, 44.72385708935186],
    keywords: "",
    info: "long building info",
    images: [],
  },
];
