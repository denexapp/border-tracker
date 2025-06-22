"use server";

import addEntry from "@/entities/entry/api/addEntry";
import encodeUrlParams from "@/shared/lib/url/encodeUrlParams";
import { authActionClient } from "@/shared/api/nextSafeAction";
import { redirect } from "next/navigation";

const addEntryAndRedirect = authActionClient.action(async () => {
  const id = await addEntry();
  redirect(encodeUrlParams`/entries/${id}`);
});

export default addEntryAndRedirect;
