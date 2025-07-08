"use server";

import updateEntryAdditionalStatuses from "@/entities/entry/api/updateEntryAdditionalStatuses";
import { authActionClient, wrapFormAction } from "@/shared/api/nextSafeAction";
import encodeUrlParams from "@/shared/lib/url/encodeUrlParams";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { z } from "zod/v4";

const inputSchema = zfd.formData(z.record(z.string(), zfd.checkbox()));

const updateEntryAdditionalStatusesAndRedirectToEntryUnwrapped = authActionClient
  .bindArgsSchemas<[id: z.ZodString]>([z.string()])
  .inputSchema(inputSchema)
  .action(async ({ bindArgsParsedInputs: [id], parsedInput }) => {
    const additionalStatuses = Object.keys(parsedInput);
    await updateEntryAdditionalStatuses(id, additionalStatuses);
    redirect(encodeUrlParams`/entries/${id}`);
  });

const updateEntryAdditionalStatusesAndRedirectToEntry = wrapFormAction(updateEntryAdditionalStatusesAndRedirectToEntryUnwrapped);

export default updateEntryAdditionalStatusesAndRedirectToEntry;
