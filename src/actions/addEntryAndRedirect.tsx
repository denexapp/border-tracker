"use server";

import { validateSession } from "@/auth";
import { databaseIdBorderCrossings } from "@/consts";
import notion from "@/notion";
import encodeUrlParams from "@/utils/encodeUrlParams";
import { redirect } from "next/navigation";

const addEntryAndRedirect = async () => {
  await validateSession();

  const page = await notion.pages.create({
    parent: {
      database_id: databaseIdBorderCrossings,
    },
    properties: {},
  });

  const { id } = page;
  redirect(encodeUrlParams`/entries/${id}`);
};

export default addEntryAndRedirect;
