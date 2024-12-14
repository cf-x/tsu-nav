import { useAtom } from "jotai";
import { selectAtom } from "../../../utils/atoms";
import { useState } from "react";
import { FaBuilding } from "react-icons/fa6";
import { rooms } from "../../../data/rooms";

export default function SearchTab() {
  const [building] = useAtom(selectAtom);
  const [input, setInput] = useState<string>("");
  return (
    <div className="md:max-h-40 relative overflow-hidden">
      <div className="flex justify-between mt-2">
        <input
          type="text"
          placeholder="მოძებნე ოთახები"
          onChange={(e) => setInput(e.target.value)}
          className="bg-black text-white focus:outline-none px-2 py-1 border-b border-white"
        />
        <a href={`/plan/${building?.id}`} className="underline">
          შენობის გეგმა
        </a>
      </div>
      <div className="h-32 overflow-y-auto relative">
        {rooms
          .filter((room) => {
            const searchInput = input.trim().toLowerCase();
            // search results
            return (
              room.building === building?.id &&
              !room.hidden &&
              (searchInput.length === 0 ||
                room.name.toLowerCase().includes(searchInput) ||
                room.description.toLowerCase().includes(searchInput))
            );
          })
          .map((room) => {
            return (
              <a
                href={`/plan/${building?.id}?floor=${room.floor}&room=${
                  room.id
                }`}
                key={`room-${room.id}`}
                className="w-full p-2 border-b hover:bg-white/20 cursor-pointer flex justify-between"
              >
                <div>
                  {room.name} - {room.description}
                </div>
                <div className="flex">
                  {room.floor} <FaBuilding size={20} />
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
}
