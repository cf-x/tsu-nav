import { FaChevronDown, FaChevronUp, FaImage, FaX } from "react-icons/fa6";
import { Building } from "../utils/data";
import { useState } from "react";
import { FaInfoCircle, FaSearch } from "react-icons/fa";

export default function Info({
  selected,
  select,
}: {
  selected: Building | null;
  select: React.Dispatch<React.SetStateAction<Building | null>>;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const [panel, setPanel] = useState<"info" | "gallery" | "search">("info");
  if (!selected) return null;

  return (
    <div className="z-50 absolute md:bottom-10 bottom-0 w-screen">
      <div className="flex justify-center">
        <div
          className={`bg-black ${
            open ? "md:h-64 h-64" : ""
          } md:w-[32rem] sm:w-96 w-screen  rounded-xl py-2 px-3 transition-all duration-150`}
        >
          <div className="flex justify-between gap-x-2">
            <div
              className="hover:bg-white/20 w-full cursor-pointer flex justify-center py-2"
              onClick={() => setOpen((p) => !p)}
            >
              {open ? <FaChevronDown size={16} /> : <FaChevronUp size={16} />}
            </div>
            <FaX
              size={16}
              className="cursor-pointer my-2"
              onClick={() => select(null)}
            />
          </div>
          {open && (
            <div>
              <div className="flex justify-center gap-x-12 border-y border-white py-2">
                <FaInfoCircle
                  size={20}
                  className="cursor-pointer hover:text-white/80"
                  onClick={() => setPanel("info")}
                />
                <FaSearch
                  size={20}
                  className="cursor-pointer hover:text-white/80"
                  onClick={() => setPanel("search")}
                />
                <FaImage
                  size={20}
                  className="cursor-pointer hover:text-white/80"
                  onClick={() => setPanel("gallery")}
                />
              </div>
              {panel === "info" ? (
                <InfoPanel building={selected} />
              ) : panel === "search" ? (
                <SearchPanel building={selected} />
              ) : (
                <GalleryPanel building={selected} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const InfoPanel = ({ building }: { building: Building }) => {
  return <div>information about {building.name}</div>;
};
const SearchPanel = ({ building }: { building: Building }) => {
  return <div>search for the rooms in {building.name}</div>;
};
const GalleryPanel = ({ building }: { building: Building }) => {
  return <div>images of {building.name}</div>;
};
