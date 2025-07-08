"use server";

import addEntry from "@/entities/entry/api/addEntry";
import { getLastEntry } from "@/entities/entry/api/getLastEntry";
import { authActionClient } from "@/shared/api/nextSafeAction";
import encodeUrlParams from "@/shared/lib/url/encodeUrlParams";
import { redirect } from "next/navigation";
import { startingEntryNumber } from "../entries/[entryId]/fill/_lib/consts";

const addEntryAndRedirect = authActionClient.action(async () => {
  const lastEntry = await getLastEntry();
  const lastEntryNumber = lastEntry?.fillableFields.number.value ?? null;
  const defaultValue = lastEntryNumber !== null ? lastEntryNumber + 1 : startingEntryNumber;
  const id = await addEntry(defaultValue);
  redirect(encodeUrlParams`/entries/${id}/fill`);
});

export default addEntryAndRedirect;
