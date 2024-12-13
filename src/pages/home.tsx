import { useState } from "react";
import { RiEqualizer2Line } from "react-icons/ri";
import { buildings } from "../data/buildings";
import { FaUniversity } from "react-icons/fa";
import Search from "../components/Search";
import { FaInfo } from "react-icons/fa6";

export default function Home() {
  const [isExpanded, expand] = useState<boolean>(false);
  const [type, setType] = useState<"building" | "room" | null>(null);

  return (
    <div>
      <div className="flex flex-col items-center mt-16 md:mt-32 gap-y-8 md:gap-y-12">
        <img src="/tsu.svg" alt="tsu logo" className="w-32" />
        <div className="text-xl md:text-3xl font-bold font-mono -my-4">
          თსუ ნავიგაცია
        </div>
        <div>
          <div className="flex">
            <Search />
            <RiEqualizer2Line
              className="-ml-6 cursor-pointer text-blue-400"
              onClick={() => expand((p) => !p)}
              size={20}
            />
          </div>
          {isExpanded && (
            <div className="flex gap-x-4 flex-wrap py-2">
              <div
                onClick={() => {
                  if (type === "building") {
                    setType(null);
                  } else setType("building");
                }}
                className={`cursor-pointer ${
                  type === "building" && "border-b border-blue-400"
                }`}
              >
                კორპუსი
              </div>
              <div
                onClick={() => {
                  if (type === "room") {
                    setType(null);
                  } else setType("room");
                }}
                className={`cursor-pointer ${
                  type === "room" && "border-b border-blue-400"
                }`}
              >
                ოთახი
              </div>
            </div>
          )}
          <div className="flex justify-center gap-x-6 md:gap-x-8 mt-4">
            <a href="/#fs">სწრაფი ძებნა</a>
            <a href="/map">რუკა</a>
          </div>
        </div>
        <div
          className="flex justify-start text-sm text-gray-300 items-center w-44 sm:w-64 md:w-96 border rounded-md border-blue-400 p-3
        "
        >
          <FaInfo size={20} className="text-blue-400 ml-2 mr-4" /> საიტი beta
          ვერსიაში მუშაობს. ამ ეტაპზე
          ხელმისწავდომია მხოლოდ პირველი კორპუსის ოთახები.
        </div>
      </div>
      <section id="fs" className="flex flex-col items-center mt-96 mb-32">
        <div className="font-semibold md:text-xl text-lg mb-4">
          სწრაფი ძებნა
        </div>
        <div>
          {buildings.map((b) => {
            return (
              <a
                key={`${b.name}-${b.id}`}
                className="flex gap-x-4 w-64 border-b px-1 py-2 hover:text-blue-400 cursor-pointer"
                href={`/map?focus=${b.id}`}
              >
                <FaUniversity /> {b.name}
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
