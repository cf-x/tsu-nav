import { MutableRefObject } from "react";

export interface MapCompParams {
  mref: MutableRefObject<L.Map | null>;
  user:
    | {
        x: number;
        y: number;
      }
    | undefined;
}
