"use server";

import updateEntryDirection from "@/entities/entry/api/updateEntryDirection";
import { authActionClient } from "@/shared/api/nextSafeAction";
import encodeUrlParams from "@/shared/lib/url/encodeUrlParams";
import { Direction } from "@/entities/entry/model/direction/direction";
import { revalidatePath } from "next/cache";
import z from "zod/v4";
import { getEntryDate } from "@/entities/entry/api/getEntryDate";
import { createEntryTitle } from "@/entities/entry/lib/createEntryTitle";
import updateEntryDirectionAndTitle from "@/entities/entry/api/updateEntryDirectionAndTitle";

export const updateEntryDirectionAndRevalidate = authActionClient
  .bindArgsSchemas<[id: z.ZodString, direction: typeof Direction]>([z.string(), Direction])
  .action(async ({ bindArgsParsedInputs: [id, direction] }) => {
    const date = await getEntryDate(id);

    if (date === null) {
      await updateEntryDirection(id, direction);
    } else {
      const title = createEntryTitle(direction, date);
      await updateEntryDirectionAndTitle(id, direction, title);
    }

    revalidatePath(encodeUrlParams`/entries/${id}/fill`);
  });

export default updateEntryDirectionAndRevalidate;
