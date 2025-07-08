import { z } from "zod/v4";

export const directionArrival = "arrival";
export const directionDeparture = "departure";
export const directions = [directionArrival, directionDeparture] as const;
export const Direction = z.literal(directions);
export type Direction = z.infer<typeof Direction>;
