import { useAtom } from "jotai";
import { mapRefAtom, selectAtom, tabAtom } from "../../utils/atoms";
import { useSearchParams } from "react-router-dom";
import { buildings } from "../../data/buildings";
import {
  FaChevronLeft,
  FaChevronRight,
  FaImage,
  FaRoute,
} from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

export const PanelNav = () => {
  return (
    <>
      <TopNav />
      <BottomNav />
    </>
  );
};

const TopNav = () => {
  const [mref] = useAtom(mapRefAtom);
  const [selected, select] = useAtom(selectAtom);
  const [, setQuery] = useSearchParams();

  // don't display panel if no building is selected
  if (!select) return null;

  // get buildings next to the selected building
  const getNeighbours = () => {
    const index = buildings.findIndex((b) => b.id === selected?.id);
    const prev = buildings[index - 1] || null;
    const next = buildings[index + 1] || null;
    return { prev, next };
  };

  // handle cross building navigation
  const handleBuildingNav = (dir: "prev" | "next") => {
    const { prev, next } = getNeighbours();
    // move to the previous building
    if (dir === "prev" && prev) {
      // update 'focus' param
      setQuery((prevQuery) => {
        const p = new URLSearchParams(prevQuery);
        p.set("focus", prev.id.toString());
        return p;
      });
      select(prev);
      mref!.current?.flyTo(prev.coordinates);
    } // move to the next building
    else if (dir === "next" && next) {
      setQuery((prevQuery) => {
        const p = new URLSearchParams(prevQuery);
        p.set("focus", next.id.toString());
        return p;
      });
      select(next);
      mref!.current?.flyTo(next.coordinates);
    }
  };

  return (
    <div className="flex justify-between my-1 text-lg">
      <div
        className="cursor-pointer hover:text-blue-400"
        onClick={() => mref?.current!.flyTo(selected!.coordinates)}
      >
        {selected?.name}
      </div>
      <div className="flex gap-x-2 items-center">
        {getNeighbours().prev && (
          <FaChevronLeft
            onClick={() => handleBuildingNav("prev")}
            size={28}
            className="hover:bg-white/20 p-1 rounded-md cursor-pointer"
          />
        )}
        {getNeighbours().next && (
          <FaChevronRight
            onClick={() => handleBuildingNav("next")}
            size={28}
            className="hover:bg-white/20 p-1 rounded-md cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

const BottomNav = () => {
  const [, setTab] = useAtom(tabAtom);
  const switchTabClass =
    "flex justify-center w-full hover:bg-white/20 py-1 cursor-pointer rounded-md";

  return (
    <div className="flex justify-between border-y border-white py-2">
      <div className={switchTabClass} onClick={() => setTab("search")}>
        <FaSearch size={20} className="cursor-pointer hover:text-white/80" />
      </div>
      <div
        className={switchTabClass}
        onClick={() => {
          /* setTab("gallery") */
        }}
      >
        <FaImage
          size={20}
          className="cursor-pointer hover:text-white/80 bg-red-400/20"
        />
      </div>
      <div
        className={switchTabClass}
        onClick={() => {
          /* setTab("route") */
        }}
      >
        <FaRoute
          size={20}
          className="cursor-pointer hover:text-white/80 bg-red-400/20"
        />
      </div>
    </div>
  );
};
