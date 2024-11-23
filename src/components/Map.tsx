"use client";
import "leaflet/dist/leaflet.css";
import { MutableRefObject, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import { buildings } from "../utils/data";
import L from "leaflet";

export default function Map({ ref }: { ref: MutableRefObject<null> }) {
  useEffect(() => {
    if (!window) return;

    const defIcon = L.icon({
      iconUrl: "/tsu.svg",
      iconSize: [36, 36],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = defIcon;
  }, []);

  const pos: [number, number] = [41.7143017651, 44.7494451407];
  const zoom = 13;

  return (
    <MapContainer
      center={pos}
      zoom={zoom}
      className="w-full z-10 h-[90vh]"
      ref={ref}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {buildings.map((building) => (
        <Marker position={building.coordinates} key={building.id}>
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
