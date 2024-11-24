import "leaflet/dist/leaflet.css";
import { MutableRefObject, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import { Building, buildings } from "../utils/data";
import L, { Marker as LMarker } from "leaflet";

export default function Map({
  mref,
  select,
  pinned,
}: {
  mref: MutableRefObject<null>;
  selected: Building | null;
  select: React.Dispatch<React.SetStateAction<Building | null>>;
  pinned: [number, number] | undefined;
  pin: React.Dispatch<React.SetStateAction<[number, number] | undefined>>;
}) {
  const markerRefs = useRef<(LMarker | null)[]>([]);
  const pos: [number, number] = [41.7143017651, 44.7494451407];
  const zoom = 13;

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
      {pinned && (
        <Marker
          position={pinned}
          icon={L.icon({
            iconUrl: "/pin.svg",
            iconSize: [36, 36],
            iconAnchor: [12, 41],
            popupAnchor: [1, -36],
            shadowSize: [41, 41],
          })}
          alt="location"
          key="location"
          draggable
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
