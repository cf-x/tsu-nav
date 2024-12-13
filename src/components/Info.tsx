import { FaBuilding, FaImage, FaRoute } from "react-icons/fa6";
import { rooms } from "../data/rooms";
import { Building } from "../data/buildings";
import { MutableRefObject, useState } from "react";
import { FaSearch } from "react-icons/fa";
import L from "leaflet";

export default function Info({
  selected,
  mref,
  pin,
  pinned,
  setRouteControl,
  user,
}: {
  selected: Building | null;
  select: React.Dispatch<React.SetStateAction<Building | null>>;
  mref: MutableRefObject<null>;
  pin: React.Dispatch<React.SetStateAction<[number, number] | undefined>>;
  pinned: [number, number] | undefined;
  setRouteControl: React.Dispatch<
    React.SetStateAction<L.Routing.Control | null>
  >;
  user:
    | {
        x: number;
        y: number;
      }
    | undefined;
}) {
  const [panel, setPanel] = useState<"gallery" | "search" | "route">("search");
  if (!selected) return null;

  return (
    <div className="z-50 absolute md:bottom-10 bottom-0 w-screen">
      <div className="flex justify-center">
        <div
          className={`bg-black md:h-64 h-64 md:w-[32rem] sm:w-96 w-screen  rounded-xl py-2 px-3 transition-all duration-150`}
        >
          <div>
            <div className="text-center my-1 text-lg">{selected.name}</div>
            <div className="flex justify-between border-y border-white py-2">
              <div
                className="flex justify-center w-full hover:bg-white/20 py-1 cursor-pointer rounded-md"
                onClick={() => setPanel("search")}
              >
                <FaSearch
                  size={20}
                  className="cursor-pointer hover:text-white/80"
                />
              </div>
              <div
                className="flex justify-center w-full hover:bg-white/20 py-1 cursor-pointer rounded-md bg-red-400/20"
                onClick={() => {
                  // beta:   setPanel("gallery")
                }}
              >
                <FaImage
                  size={20}
                  className="cursor-pointer hover:text-white/80"
                />
              </div>
              <div
                className="flex justify-center w-full hover:bg-white/20 py-1 cursor-pointer rounded-md bg-red-400/20"
                onClick={() => {
                  // setPanel("route");
                }}
              >
                <FaRoute
                  size={20}
                  className="cursor-pointer hover:text-white/80"
                />
              </div>
            </div>
            {panel === "search" ? (
              <SearchPanel building={selected} />
            ) : panel === "gallery" ? (
              <GalleryPanel building={selected} />
            ) : (
              <RoutePanel
                mref={mref}
                building={selected}
                pin={pin}
                pinned={pinned}
                user={user}
                setRouteControl={setRouteControl}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const SearchPanel = ({ building }: { building: Building }) => {
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
        <a href={`/plan/${building.id}`} className="underline">
          შენობის გეგმა
        </a>
      </div>
      <div className="h-32 overflow-y-auto relative">
        {rooms
          .filter((room) => {
            const searchInput = input.trim().toLowerCase();
            return (
              room.building === building.id &&
              !room.hidden &&
              (searchInput.length === 0 ||
                room.name.toLowerCase().includes(searchInput) ||
                room.description.toLowerCase().includes(searchInput))
            );
          })
          .map((room) => {
            return (
              <a
                href={`/plan/${building.id}?floor=${room.floor}&room=${room.id}`}
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
};

const GalleryPanel = ({ building }: { building: Building }) => {
  return <div>{!building.images && "No images found"}</div>;
};

const RoutePanel = ({
  building,
  mref,
  pin,
  pinned,
  setRouteControl,
  user,
}: {
  building: Building;
  mref: MutableRefObject<null>;
  pin: React.Dispatch<React.SetStateAction<[number, number] | undefined>>;
  pinned: [number, number] | undefined;
  setRouteControl: React.Dispatch<
    React.SetStateAction<L.Routing.Control | null>
  >;
  user:
    | {
        x: number;
        y: number;
      }
    | undefined;
}) => {
  return (
    <div className="p-2">
      <div className="flex flex-col gap-y-2">
        Find the route from:
        {pinned && (
          <div className="flex justify-between">
            <div className="cursor-pointer underline" onClick={() => {}}>
              Calculate the Route
            </div>
            <div
              className="cursor-pointer underline"
              onClick={() => {
                pin(undefined);
                setRouteControl(null);
              }}
            >
              Reset the Location
            </div>
          </div>
        )}
        <div
          className="p-1 border hover:bg-white/20 cursor-pointer rounded-md"
          onClick={() => {
            pin(building.coordinates);
            // @ts-expect-error false
            mref.current!.flyTo(building.coordinates);
          }}
        >
          {pinned ? "Reset" : "Choose on the Map"}
        </div>
        <div
          onClick={() => {
            if (user) {
              pin([user.x, user.y]);
              // @ts-expect-error false
              mref.current!.flyTo([user.x, user.y], 15);
            }
          }}
          className={`p-1 border cursor-pointer rounded-md select-none ${
            !user && "text-red-500"
          }`}
        >
          My Location
        </div>
      </div>
    </div>
  );
};
