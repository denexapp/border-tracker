import { z } from "zod/v4";

export const Direction = z.literal(["arrival", "departure"]);
export type Direction = z.infer<typeof Direction>;
