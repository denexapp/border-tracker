"use server";

import { validateSession } from "@/auth";
import {
  databaseIdBorderCrossings,
  propertyNameRegion,
  propertyNameRegionCode,
  propertyNameRegionName,
} from "@/consts";
import simpleRegionFromRegionCode from "@/models/simpleRegion/simpleRegionFromRegionCode";
import notion from "@/notion/client";
import { isNotionEmoji } from "@/notion/isNotionEmoji";
import encodeUrlParams from "@/utils/encodeUrlParams";
import { revalidatePath } from "next/cache";
import { formDataFieldName } from "./consts";

// todo: properly validate paramaters
const updateEntryRegionAndRevalidate = async (id: string, formData: FormData) => {
  validateSession();

  const regionPageIdFormDataEntry = formData.get(formDataFieldName);

  if (regionPageIdFormDataEntry === null) {
    throw new Error("Incorrect format");
  }

  const regionCode = regionPageIdFormDataEntry.toString();

  const borderCrossingDatabase = await notion.databases.retrieve({
    database_id: databaseIdBorderCrossings,
  });

  const regionProperty = borderCrossingDatabase.properties[propertyNameRegion];

  if (regionProperty.type !== "relation") {
    throw new Error(`Property "${propertyNameRegion}" is not a relation`);
  }

  const databaseIdRegions = regionProperty.relation.database_id;

  const databaseRegions = await notion.databases.query({
    database_id: databaseIdRegions,
    filter: {
      property: "ISO 3166-1 Code",
      type: "rich_text",
      rich_text: {
        equals: regionPageIdFormDataEntry.toString(),
      },
    },
  });

  let databaseRegion = databaseRegions.results.at(0);

  if (databaseRegion === undefined) {
    const simpleRegion = simpleRegionFromRegionCode(regionCode);

    if (simpleRegion === null) {
      throw new Error(`Region with code "${regionCode}" not found`);
    }

    const { code, emoji, name } = simpleRegion;

    if (isNotionEmoji(emoji) === false) {
      throw new Error(`Emoji "${emoji}" is not a valid Notion emoji`);
    }

    databaseRegion = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: databaseIdRegions,
      },
      icon: {
        type: "emoji",
        emoji: emoji,
      },
      properties: {
        [propertyNameRegionCode]: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: code,
              },
            },
          ],
        },
        [propertyNameRegionName]: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: name,
              },
            },
          ],
        },
      },
    });
  }

  await notion.pages.update({
    page_id: id,
    properties: {
      [propertyNameRegion]: {
        type: "relation",
        relation: [
          {
            id: databaseRegion.id,
          },
        ],
      },
    },
  });

  revalidatePath(encodeUrlParams`/entries/${id}`);
};

export default updateEntryRegionAndRevalidate;
