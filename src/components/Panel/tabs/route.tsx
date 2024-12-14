import { useAtom } from "jotai";
import {
  mapRefAtom,
  pinAtom,
  routeControlAtom,
  selectAtom,
  userLocationAtom,
} from "../../../utils/atoms";

export default function RouteTab() {
  const [building] = useAtom(selectAtom);
  const [mref] = useAtom(mapRefAtom);
  const [user] = useAtom(userLocationAtom);
  const [pinned, pin] = useAtom(pinAtom);
  const [, setRouteControl] = useAtom(routeControlAtom);
  return (
    <div className="flex flex-col gap-y-2 p-2">
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
              // @ts-expect-error comment
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
          pin(building?.coordinates)
          mref!.current!.flyTo(building!.coordinates);
        }}
      >
        {pinned ? "Reset" : "Choose on the Map"}
      </div>
      <div
        onClick={() => {
          if (user) {
            pin([user.x, user.y]);
            mref!.current!.flyTo([user.x, user.y], 15);
          }
        }}
        className={`p-1 border cursor-pointer rounded-md select-none ${
          !user && "text-red-500"
        }`}
      >
        My Location
      </div>
    </div>
  );
}
