import {  useAtom } from "jotai";
import { PanelNav } from "./Nav";
import SearchTab from "./tabs/search";
import GalleryTab from "./tabs/gallery";
import RouteTab from "./tabs/route";
import { tabAtom } from "../../utils/atoms";




export default function Panel() {
  const [tab] = useAtom(tabAtom);

  return (
    <div className="w-screen z-50 absolute bottom-0 md:bottom-10 flex justify-center">
      <div className="w-screen sm:w-96 md:w-[32rem] h-64 bg-black rounded-xl py-2 px-3">
        <PanelNav />
        {tab === "search" ? (
          <SearchTab />
        ) : tab === "gallery" ? (
          <GalleryTab />
        ) : (
          <RouteTab />
        )}
      </div>
    </div>
  );
}
