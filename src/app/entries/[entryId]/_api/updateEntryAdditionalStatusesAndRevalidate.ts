"use server";

import updateEntryAdditionalStatuses from "@/entities/entry/api/updateEntryAdditionalStatuses";
import { authActionClient, wrapFormAction } from "@/shared/api/nextSafeAction";
import encodeUrlParams from "@/shared/lib/url/encodeUrlParams";
import { revalidatePath } from "next/cache";
import { zfd } from "zod-form-data";
import { z } from "zod/v4";

const inputSchema = zfd.formData(z.record(z.string(), zfd.checkbox()));

const updateEntryAdditionalStatusesAndRevalidateUnwrapped = authActionClient
  .bindArgsSchemas<[id: z.ZodString]>([z.string()])
  .inputSchema(inputSchema)
  .action(async ({ bindArgsParsedInputs: [id], parsedInput }) => {
    console.log(JSON.stringify(parsedInput, null, 2));
    const additionalStatuses = Object.keys(parsedInput);
    await updateEntryAdditionalStatuses(id, additionalStatuses);
    revalidatePath(encodeUrlParams`/entries/${id}`);
  });

const updateEntryAdditionalStatusesAndRevalidate = wrapFormAction(updateEntryAdditionalStatusesAndRevalidateUnwrapped);

export default updateEntryAdditionalStatusesAndRevalidate;
