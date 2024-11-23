"use client";

import { buildings, rooms } from "../utils/data";
import { MutableRefObject, useState } from "react";

export default function Search({ ref }: { ref: MutableRefObject<null> }) {
  const [input, setInput] = useState<string>("");

  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(input.toLowerCase())
  );
  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(input.toLowerCase()) ||
      buildings[room.building - 1].name.includes(input.toLowerCase())
  );

  const focusOnBuilding = (coordinates: [number, number]) => {
    if (ref.current) {
      // @ts-expect-error false
      ref.current.flyTo(coordinates, 18);
    }
  };

  return (
    <div className="h-12 py-2 flex justify-center w-full">
      <input
        type="search"
        className="w-64 md:w-96 rounded-md bg-black text-white focus:outline-none px-2 py-1 border-2 border-white"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
      />
      {input!.length > 0 && (
        <div className="mt-5 p-3 flex flex-col absolute top-10 w-64 md:w-96 border border-white rounded-md z-50 bg-black">
          <div>searching for &apos;{input}&apos;...</div>

          {filteredBuildings.length > 0 && (
            <div>
              <h3 className="text-white font-bold mt-2">Buildings:</h3>
              <ul>
                {filteredBuildings.map((building) => (
                  <li
                    key={building.id}
                    className="text-white py-2 hover:bg-white/30 cursor-pointer"
                    onClick={() => {
                      focusOnBuilding(building.coordinates);
                      setInput("");
                    }}
                  >
                    {building.name} - {building.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {filteredRooms.length > 0 && (
            <div className="mt-2">
              <h3 className="text-white font-bold">Rooms:</h3>
              <ul>
                {filteredRooms.map((room) => (
                  <li key={room.id} className="text-white">
                    {room.name} - {buildings[room.building].name}:{" "}
                    {room.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {filteredBuildings.length === 0 && filteredRooms.length === 0 && (
            <div className="text-white">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}
