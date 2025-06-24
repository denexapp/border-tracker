"use server";

import updateEntryDirection from "@/entities/entry/api/updateEntryDirection";
import { authActionClient } from "@/shared/api/nextSafeAction";
import encodeUrlParams from "@/shared/lib/url/encodeUrlParams";
import { Direction } from "@/entities/entry/model/direction/direction";
import { revalidatePath } from "next/cache";
import z from "zod/v4";

export const updateEntryDirectionAndRevalidate = authActionClient
  .bindArgsSchemas<[id: z.ZodString, direction: typeof Direction]>([z.string(), Direction])
  .action(async ({ bindArgsParsedInputs: [id, direction] }) => {
    await updateEntryDirection(id, direction);
    revalidatePath(encodeUrlParams`/entries/${id}`);
  });

export default updateEntryDirectionAndRevalidate;
