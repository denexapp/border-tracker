"use server";

import updateEntryWay from "@/entities/entry/api/updateEntryWay";
import { authActionClient, wrapFormAction } from "@/shared/api/nextSafeAction";
import encodeUrlParams from "@/shared/lib/url/encodeUrlParams";
import { revalidatePath } from "next/cache";
import { zfd } from "zod-form-data";
import { z } from "zod/v4";
import { formDataWayFieldName } from "../_lib/consts";

const inputSchema = zfd.formData({
  [formDataWayFieldName]: zfd.text(),
});

const updateEntryWayAndRevalidateUnwrapped = authActionClient
  .bindArgsSchemas<[id: z.ZodString]>([z.string()])
  .inputSchema(inputSchema)
  .action(async ({ bindArgsParsedInputs: [id], parsedInput }) => {
    const way = parsedInput[formDataWayFieldName];
    await updateEntryWay(id, way);
    revalidatePath(encodeUrlParams`/entries/${id}/fill`);
  });

const updateEntryWayAndRevalidate = wrapFormAction(updateEntryWayAndRevalidateUnwrapped);

export default updateEntryWayAndRevalidate;
