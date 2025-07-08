"use server";

import { getEntryDate } from "@/entities/entry/api/getEntryDate";
import updateEntryDirection from "@/entities/entry/api/updateEntryDirection";
import updateEntryDirectionAndTitle from "@/entities/entry/api/updateEntryDirectionAndTitle";
import { createEntryTitle } from "@/entities/entry/lib/createEntryTitle";
import { Direction } from "@/entities/entry/model/direction/direction";
import { authActionClient, wrapFormAction } from "@/shared/api/nextSafeAction";
import encodeUrlParams from "@/shared/lib/url/encodeUrlParams";
import { revalidatePath } from "next/cache";
import { zfd } from "zod-form-data";
import z from "zod/v4";
import { formDataDirectionFieldName } from "../_lib/consts";

const inputSchema = zfd.formData({
  [formDataDirectionFieldName]: zfd.text(Direction),
});

const updateEntryDirectionAndRevalidateUnwrapped = authActionClient
  .bindArgsSchemas<[id: z.ZodString]>([z.string()])
  .inputSchema(inputSchema)
  .action(async ({ bindArgsParsedInputs: [id], parsedInput }) => {
    const direction = parsedInput[formDataDirectionFieldName];
    const date = await getEntryDate(id);

    if (date === null) {
      await updateEntryDirection(id, direction);
    } else {
      const title = createEntryTitle(direction, date);
      await updateEntryDirectionAndTitle(id, direction, title);
    }

    revalidatePath(encodeUrlParams`/entries/${id}/fill`);
  });

const updateEntryDirectionAndRevalidate = wrapFormAction(updateEntryDirectionAndRevalidateUnwrapped);

export default updateEntryDirectionAndRevalidate;
