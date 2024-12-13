import "leaflet/dist/leaflet.css";
import { MutableRefObject, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import { Building, buildings } from "../data/buildings";
import L, { Marker as LMarker } from "leaflet";
import "leaflet-routing-machine";
import { useSearchParams } from "react-router-dom";
import { useAtom } from "jotai";
import { pinAtom, routeControlAtom, selectAtom } from "../pages/map";

export default function Map({
  mref,
  user,
}: {
  mref: MutableRefObject<null>;
  user:
    | {
        x: number;
        y: number;
      }
    | undefined;
}) {
  const [selected, select] = useAtom<Building | null>(selectAtom);
  const markerRefs = useRef<(LMarker | null)[]>([]);
  const pinRef = useRef(null);
  const [sp] = useSearchParams();
  const pos: [number, number] = [41.7143017651, 44.7494451407];
  const [pinned] = useAtom(pinAtom);
  const [routeControl, setRouteControl] = useAtom(routeControlAtom);
  const zoom = 14;

  useEffect(() => {
    if (!window) return;

    const defIcon = L.icon({
      iconUrl: "/tsu.svg",
      iconSize: [36, 36],
      iconAnchor: [12, 41],
      popupAnchor: [1, -36],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = defIcon;
  }, []);

  setTimeout(() => {
    if (sp.get("focus")) {
      const building = buildings.filter(
        (b) => b.id === Number(sp.get("focus"))
      )[0];

      if (mref.current) {
        // @ts-expect-error false
        mref.current.flyTo(building.coordinates, 18);
      }
      select(building);
    }
  }, 500);

  useEffect(() => {
    if (!pinned) {
      if (routeControl) {
        // @ts-expect-error comment
        routeControl.remove();
      }
      return;
    }

    if (pinned && selected) {
      const selectedIndex = buildings.findIndex(
        (building) => building.id === selected.id
      );
      // @ts-expect-error false
      const pinPosition = pinRef.current?.getLatLng();
      const selectedPosition =
        selectedIndex !== -1
          ? markerRefs.current[selectedIndex]?.getLatLng()
          : null;

      if (routeControl && pinPosition && selectedPosition) {
        // @ts-expect-error comment
        routeControl.setWaypoints([pinPosition, selectedPosition]);
      } else {
        const newRouteControl = L.Routing.control({
          waypoints: [pinPosition, selectedPosition],
          routeWhileDragging: false,
          addWaypoints: false,
          show: false,
        }).addTo(mref.current!);
        // @ts-expect-error comment
        setRouteControl(newRouteControl);
      }
    }
  }, [pinned, selected, mref, routeControl, setRouteControl]);

  const handleMarkerClick = (building: Building) => {
    if (mref.current) {
      // @ts-expect-error false
      mref.current.flyTo(building.coordinates, 18);
      select(building);
    }
  };

  return (
    <MapContainer
      center={pos}
      zoom={zoom}
      className="w-full z-10 h-[90vh]"
      ref={mref}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {user && (
        <Marker
          position={[user.x, user.y]}
          icon={L.divIcon({
            className: "leaflet-div-icon",
            html: `<div style="background-color: red; width: 10px; height: 10px; border-radius: 50%;"></div>`,
          })}
          key="user-location"
        />
      )}
      {buildings.map((building, index) => (
        <Marker
          position={building.coordinates}
          alt={building.name}
          key={building.id}
          ref={(el) => (markerRefs.current[index] = el)}
          eventHandlers={{
            click: () => handleMarkerClick(building),
          }}
        >
          <Tooltip>{building.name}</Tooltip>
          <Popup>
            <strong>{building.name}</strong>
            <br />
            {building.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
