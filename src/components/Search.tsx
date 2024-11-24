import { Building, buildings, rooms } from "../utils/data";
import { MutableRefObject, useState } from "react";

export default function Search({
  mref,
  select,
}: {
  mref: MutableRefObject<null>;
  select: React.Dispatch<React.SetStateAction<Building | null>>;
}) {
  const [input, setInput] = useState<string>("");

  const filteredBuildings = buildings.filter(
    (building) =>
      building.name.toLowerCase().includes(input.toLowerCase()) ||
      building.keywords.toLowerCase().includes(input.toLowerCase()) ||
      building.description.toLowerCase().includes(input.toLowerCase())
  );

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(input.toLowerCase()) ||
      buildings
        .filter((b) => b.id === room.building)[0]
        .name.includes(input.toLowerCase())
  );

  const focusOnBuilding = (building: Building) => {
    if (mref.current) {
      // @ts-expect-error false
      mref.current.flyTo(building.coordinates, 18);
    }
    select(building);
  };

  return (
    <div className="h-12 py-2 flex justify-center w-full">
      <input
        type="search"
        className="w-64 md:w-96 rounded-md bg-black text-white focus:outline-none px-2 py-1 border-2 border-white"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="Search..."
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
                      focusOnBuilding(building);
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
                  <li
                    key={room.id}
                    className="text-white py-2 hover:bg-white/30 cursor-pointer"
                    onClick={() => {
                      focusOnBuilding(
                        buildings.filter((b) => b.id === room.building)[0]
                      );
                      setInput("");
                    }}
                  >
                    {room.name} -{" "}
                    {buildings.filter((b) => b.id === room.building)[0].name}:{" "}
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
