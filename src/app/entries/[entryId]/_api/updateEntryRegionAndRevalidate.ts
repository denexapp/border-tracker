"use server";

import updateEntryRegion from "@/entities/entry/api/updateEntryRegion";
import regionFromRegionCode from "@/shared/model/region/regionFromRegionCode";
import encodeUrlParams from "@/shared/lib/url/encodeUrlParams";
import { authActionClient, wrapFormAction } from "@/shared/api/nextSafeAction";
import { revalidatePath } from "next/cache";
import { zfd } from "zod-form-data";
import { z } from "zod/v4";
import { formDataRegionFieldName } from "../_lib/consts";

const inputSchema = zfd.formData({
  [formDataRegionFieldName]: zfd.text(),
});

const updateEntryRegionAndRevalidateUnwrapped = authActionClient
  .bindArgsSchemas<[id: z.ZodString]>([z.string()])
  .inputSchema(inputSchema)
  .action(async ({ bindArgsParsedInputs: [id], parsedInput }) => {
    const regionCode = parsedInput[formDataRegionFieldName];
    const simpleRegion = regionFromRegionCode(regionCode);

    if (simpleRegion === null) {
      throw new Error(`Region with code "${regionCode}" not found`);
    }

    await updateEntryRegion(id, simpleRegion);
    console.log('Revalidate path from updateEntryRegionAndRevalidate:', encodeUrlParams`/entries/${id}`);
    revalidatePath(encodeUrlParams`/entries/${id}`);
  });

const updateEntryRegionAndRevalidate = wrapFormAction(updateEntryRegionAndRevalidateUnwrapped);

export default updateEntryRegionAndRevalidate;
