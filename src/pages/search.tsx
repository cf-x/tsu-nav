import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Select = ({
  title,
  options,
  setState,
}: {
  title: string;
  options: [string, string | null][];
  setState: React.Dispatch<React.SetStateAction<string | null>>;
  default?: string;
}) => {
  const [isOpen, open] = useState<boolean>(false);
  return (
    <div>
      <div onClick={() => open((s) => !s)}>{title}</div>
      {isOpen && (
        <div>
          {options.map((opt) => {
            return <div onClick={() => setState(opt[1])}>{opt[0]}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default function SearchPage() {
  const [params] = useSearchParams();
  const [, setQuery] = useState<string>();
  const [, setType] = useState<string | null>(null);

  function search() {}

  return (
    <>
      <nav className="flex fixed p-3 justify-start items-center gap-x-4">
        <img src="/tsu.svg" alt="tsu logo" className="w-12" />
        <input
          type="search"
          name="tsu"
          className="bg-black border-b border-b-blue-400 min-w-64 md:min-w-96 focus:outline-none px-2 h-8"
          placeholder="ძიება"
          onChange={(e) => setQuery(e.target.value)}
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
        />
      </nav>
      <div className="pt-16">
        query: {params.get("q")}, type: {params.get("t")}
        <div>
          <Select
            title="ტიპი"
            options={[
              ["კორპუსი", "building"],
              ["ოთახი", "room"],
            ]}
            setState={setType}
          />
        </div>
      </div>
    </>
  );
}
