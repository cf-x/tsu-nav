import { atom } from "jotai";
import { RefObject } from "react";
import { Building } from "../data/buildings";
import L from "leaflet";

export type tabs = "search" | "gallery" | "route";
export const tabAtom = atom<tabs>("search");
export const selectAtom = atom<Building | null>(null);
export const pinAtom = atom<[number, number]>();
export const routeControlAtom = atom<[L.Routing.Control]>();
export const mapRefAtom = atom<RefObject<L.Map | null>>();
export const userLocationAtom = atom<{ x: number; y: number }>();
