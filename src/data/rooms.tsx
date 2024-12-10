export interface Room {
  id: number;
  name: string;
  description: string;
  floor: number;
  coordinates: [number, number];
  hidden?: boolean; // hiddden from searches
  building: number; // id
}

export const rooms: Room[] = [
  /*
    
    Building I
    
    */

  // floor 0
  {
    id: 1,
    name: "ოთახი 001",
    description: "აუდიტორია",
    floor: 0,
    building: 1,
    coordinates: [870, 211],
  },
  {
    id: 2,
    name: "ოთახი 002",
    description: "დისტანციური სწავლების ცენტრი",
    floor: 0,
    building: 1,
    coordinates: [870, 290],
  },
  {
    id: 3,
    name: "ოთახი 003",
    description: "საინფორმაციო ტექნოლოგიების დეპარტამენტი",
    floor: 0,
    building: 1,
    coordinates: [870, 350],
  },
  {
    id: 4,
    name: "ოთახი 004",
    description: "დავის ალტერნატიული გადაწყვეტილებების ნაციონალური ცენტრი",
    floor: 0,
    building: 1,
    coordinates: [870, 470],
  },
  {
    id: 5,
    name: "ოთახი 005",
    description:
      "ინფორმაციული ტექნოლოგიებისა და ოპერაციების მართვის დეპარტმანტი",
    floor: 0,
    building: 1,
    coordinates: [870, 550],
  },
  {
    id: 6,
    name: "ოთახი 006",
    description: "იმიტირებული სასამართლო პროცესის დარბაზი",
    floor: 0,
    building: 1,
    coordinates: [805, 625],
  },
  {
    id: 7,
    name: "ოთახი 007",
    description: "ნატოსა და ევროკავშირის აუდიტორია",
    floor: 0,
    building: 1,
    coordinates: [675, 625],
  },
  {
    id: 15,
    name: "ოთახი 015",
    description: "საგაგმო-საფინანსო განყოფილება",
    floor: 0,
    building: 1,
    coordinates: [320, 625],
  },
  {
    id: 16,
    name: "ოთახი 016",
    description: "შესყიდვების განყოფილება",
    floor: 0,
    building: 1,
    coordinates: [250, 625],
  },
  {
    id: 17,
    name: "ოთახი 017",
    description: "იურიდიული დეპარტმაენტი",
    floor: 0,
    building: 1,
    coordinates: [170, 625],
  },
  {
    id: 18,
    name: "ოთახი 018",
    description: "საფინანსო დეპარტამენტი",
    floor: 0,
    building: 1,
    coordinates: [50, 625],
  },
  {
    id: 19,
    name: "ოთახი 019",
    description: "საფინანსო დეპარმანტეის უფროსის მოადგილე",
    floor: 0,
    building: 1,
    coordinates: [50, 575],
  },
  {
    id: 20,
    name: "ოთახი 020",
    description: "სტუდენთა ფინანსური მომსახურება",
    floor: 0,
    building: 1,
    coordinates: [50, 555],
  },
  {
    id: 21,
    name: "ოთახი 021",
    description: "აუდიტორია",
    floor: 0,
    building: 1,
    coordinates: [50, 445],
  },
  {
    id: 22,
    name: "ოთახი 022",
    description: "აუდიტორია",
    floor: 0,
    building: 1,
    coordinates: [50, 385],
  },
  {
    id: 24,
    name: "ოთახი 024",
    description: "აუდიტორია",
    floor: 0,
    building: 1,
    coordinates: [93, 230],
  },
  {
    id: 999,
    name: "საპირპარეშო",
    description: "საპირპარეშო",
    floor: 0,
    building: 1,
    coordinates: [145, 230],
    hidden: true,
  },
  {
    id: 998,
    name: "ბიბლიოთეკა",
    description: "ბიბლიოთეკა",
    floor: 0,
    building: 1,
    coordinates: [0, 0],
  },
  {
    id: 997,
    name: "კვების სივრცე",
    description: "კვების სივრცე",
    floor: 0,
    building: 1,
    coordinates: [0, 0],
  },

  // floor 1

  // floor 2

  // floor 3
];
