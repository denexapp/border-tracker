"use server";

import updateEntryDate from "@/entities/entry/api/updateEntryDate";
import simpleDateFromDateString from "@/shared/model/simpleDate/simpleDateFromDateString";
import encodeUrlParams from "@/shared/lib/url/encodeUrlParams";
import { authActionClient, wrapFormAction } from "@/shared/api/nextSafeAction";
import { revalidatePath } from "next/cache";
import { zfd } from "zod-form-data";
import z from "zod/v4";
import { formDataDateFieldName } from "../_lib/consts";

const inputSchema = zfd.formData({
  [formDataDateFieldName]: zfd.text(z.iso.date()),
});

const updateEntryDateAndRevalidateUnwrapped = authActionClient
  .bindArgsSchemas<[id: z.ZodString]>([z.string()])
  .inputSchema(inputSchema)
  .action(async ({ bindArgsParsedInputs: [id], parsedInput }) => {
    const date = simpleDateFromDateString(parsedInput[formDataDateFieldName]);
    await updateEntryDate(id, date);
    revalidatePath(encodeUrlParams`/entries/${id}`);
  });

const updateEntryDateAndRevalidate = wrapFormAction(updateEntryDateAndRevalidateUnwrapped);

export default updateEntryDateAndRevalidate;
