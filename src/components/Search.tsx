import { rooms } from "../data/rooms";
import { Building, buildings } from "../data/buildings";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBook, FaBuilding } from "react-icons/fa6";

export default function Search({
  setQuery,
}: {
  setQuery?: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [input, setInput] = useState<string>("");
  const searchBarRef = useRef(null);
  const [cardPosition, setCardPosition] = useState({ top: "0px" });
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleRoute = (building: Building) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("focus", building.id.toString());
    navigate({
      pathname: "/map",
      search: searchParams.toString(),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (setQuery) setQuery(e.target.value);

    if (searchBarRef.current) {
      // @ts-expect-error false
      const rect = searchBarRef.current.getBoundingClientRect();
      setCardPosition({ top: `${rect.bottom + window.scrollY}px` });
    }
  };

  return (
    <>
      <input
        ref={searchBarRef}
        type="search"
        className="bg-black border-b border-b-blue-400 min-w-44 sm:min-w-64 md:min-w-96 focus:outline-none px-2 h-8"
        onChange={handleInputChange}
        placeholder="ძებნა"
        value={input}
      />
      {input.length > 0 && (
        <div
          className="mt-5 p-3 flex flex-col absolute w-64 md:w-96 border border-blue-400 rounded-md z-50 bg-black"
          style={{ top: cardPosition.top }}
        >
          <div>ძიების შედეგები &apos;{input}&apos;-თვის...</div>

          {filteredBuildings.length > 0 && (
            <ul>
              {filteredBuildings.map((building) => (
                <li
                  key={building.id}
                  className="text-white py-2 hover:text-blue-400 cursor-pointer p-1 flex gap-x-2 items-center"
                  onClick={() => handleRoute(building)}
                >
                  <FaBuilding /> {building.name}
                </li>
              ))}
            </ul>
          )}

          {filteredRooms.length > 0 && (
            <ul>
              {filteredRooms.map((room) => (
                <a
                  key={room.id}
                  className="text-white py-2 hover:text-blue-400 cursor-pointer p-1 flex gap-x-2 items-center"
                  href={`/plan/${room.building}?floor=${room.floor}&room=${room.id}`}
                  onClick={() => {
                    handleRoute(
                      buildings.filter((b) => b.id === room.building)[0]
                    );
                    setInput("");
                  }}
                >
                  <FaBook />
                  {room.name} -{" "}
                  {buildings.filter((b) => b.id === room.building)[0].name}:{" "}
                  {room.description}
                </a>
              ))}
            </ul>
          )}

          {filteredBuildings.length === 0 && filteredRooms.length === 0 && (
            <div className="text-white">
              ვერაფერი მოიძებნა, ცადეთ{" "}
              <a href="/#fs" className="underline text-blue-400">
                სწრაფი ძებნა
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}
