"use server";

import updateEntryDate from "@/entities/entry/api/updateEntryDate";
import simpleDateFromDateString from "@/shared/model/simpleDate/simpleDateFromDateString";
import encodeUrlParams from "@/shared/lib/url/encodeUrlParams";
import { authActionClient, wrapFormAction } from "@/shared/api/nextSafeAction";
import { revalidatePath } from "next/cache";
import { zfd } from "zod-form-data";
import z from "zod/v4";
import { formDataDateFieldName } from "../_lib/consts";
import { getEntryDirection } from "@/entities/entry/api/getEntryDirection";
import updateEntryDateAndTitle from "@/entities/entry/api/updateEntryDateAndTitle";
import { createEntryTitle } from "@/entities/entry/lib/createEntryTitle";

const inputSchema = zfd.formData({
  [formDataDateFieldName]: zfd.text(z.iso.date()),
});

const updateEntryDateAndRevalidateUnwrapped = authActionClient
  .bindArgsSchemas<[id: z.ZodString]>([z.string()])
  .inputSchema(inputSchema)
  .action(async ({ bindArgsParsedInputs: [id], parsedInput }) => {
    const date = simpleDateFromDateString(parsedInput[formDataDateFieldName]);
    const direction = await getEntryDirection(id);

    if (direction === null) {
      await updateEntryDate(id, date);
    } else {
      const title = createEntryTitle(direction, date);
      await updateEntryDateAndTitle(id, date, title);
    }

    revalidatePath(encodeUrlParams`/entries/${id}/fill`);
  });

const updateEntryDateAndRevalidate = wrapFormAction(updateEntryDateAndRevalidateUnwrapped);

export default updateEntryDateAndRevalidate;
