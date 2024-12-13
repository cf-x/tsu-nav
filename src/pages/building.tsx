import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { buildings } from "../data/buildings";
import { useEffect, useRef, useState } from "react";
import { rooms } from "../data/rooms";
import { nodes } from "../utils/path";
import { floors } from "../data/floors";

const Building = () => {
  const [floor, setFloor] = useState<number>(0);
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<number | null>(null);
  const [params] = useSearchParams();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const data = buildings.find((b) => b.id === Number(id));

  useEffect(() => {
    if (data) {
      setFloor(Number(params.get("floor")) || data.floors![0]);
    }
    setTimeout(() => {
      if (params.get("room")) {
        setRoom(Number(params.get("room")));
      }
    }, 500);
  }, [data, params]);

  if (!data) {
    return <Navigate to="/?code=404" replace />;
  }

  const floorsRange = data.floors![1] - data.floors![0] + 1;
  const floorOptions = Array.from(
    { length: floorsRange },
    (_, i) => data.floors![0] + i
  );

  const currentFloors = floors.filter(
    (f) => f.building === data.id && f.floor === floor
  );
  const startingPoint =
    currentFloors.length > 0 ? currentFloors[0].startingPoint : { x: 0, y: 0 };

  const ImageToDevice = (roomCoords: { x: number; y: number }) => {
    if (imageRef.current) {
      const { width, height } = imageRef.current;
      return {
        x: (roomCoords.x / 1000) * width,
        y: (roomCoords.y / 1000) * height,
      };
    }
    return { x: 0, y: 0 };
  };
  const DeviceToImage = ({ x, y }: { x: number; y: number }) => {
    if (imageRef.current) {
      const { width, height } = imageRef.current;

      const rect = imageRef.current.getBoundingClientRect();
      const adjustedX = x - rect.left;
      const adjustedY = y - rect.top;

      return {
        x: Math.round((adjustedX / width) * 1000),
        y: Math.round((adjustedY / height) * 1000),
      };
    }
    return { x, y };
  };

  const drawNodes = (room: number) => {
    const start = ImageToDevice(startingPoint);
    let pathString = `M${start.x},${start.y}`;

    nodes(Number(id), floor, room).forEach((coos) => {
      const { x, y } = ImageToDevice({
        x: coos[0],
        y: coos[1],
      });
      pathString += ` L${x},${y}`;
    });

    const room_coos = rooms.filter(
      (r) => r.building === Number(id) && r.id === room
    )[0].coordinates;
    const { x, y } = ImageToDevice({
      x: room_coos[0],
      y: room_coos[1],
    });
    pathString += ` L${x},${y}`;
    return pathString;
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoom(Number(e.target.value));
  };

  const floorRooms = rooms.filter(
    (r) => r.building === Number(id) && r.floor === floor
  );

  return (
    <>
      <div className="bottom-10 flex justify-center w-full fixed z-40 gap-x-4 md:gap-x-12">
        <select
          name="floor"
          id={`select-floor-${id}`}
          defaultValue={Number(params.get("floor")) || data.floors![0]}
          className="bg-black cursor-pointer p-2 rounded-lg border md:border-none"
          onChange={(e) => {
            setFloor(Number(e.target.value));
            setRoom(null);
          }}
        >
          {floorOptions.map((floorNumber) => (
            <option key={floorNumber} value={floorNumber}>
              სართული {floorNumber}
            </option>
          ))}
        </select>
        <select
          name="room"
          id={`select-room-${id}`}
          value={room || 0}
          className="bg-black cursor-pointer p-2 rounded-lg border md:border-none"
          onChange={handleRoomChange}
        >
          {floorRooms.map((r) => (
            <option key={r.id + r.name} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
      <nav className="flex p-3 md:py-4 justify-between">
        <a href="/" className="z-50 -my-2">
          <img src="/tsu.svg" alt="tsu logo" className="w-12" />
        </a>
        <div>{data.name}</div>
      </nav>

      <div className="relative">
        <img
          ref={imageRef}
          src={`/building-${id}-floor-${floor}.png`}
          alt={`building ${id} floor ${floor} plan`}
          onClick={(e) => {
            console.log(DeviceToImage({ x: e.clientX, y: e.clientY }));
          }}
          className="w-screen"
        />
        {room && (
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none animate-pulse">
            <path
              d={drawNodes(room)}
              stroke="red"
              strokeWidth="4"
              fill="transparent"
            ></path>
          </svg>
        )}
      </div>
    </>
  );
};
export default Building;
