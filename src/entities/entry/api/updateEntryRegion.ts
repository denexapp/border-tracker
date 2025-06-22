import {
  databaseIdBorderCrossings,
  propertyNameRegion,
  propertyNameRegionCode,
  propertyNameRegionName,
} from "@/entities/entry/config/consts";
import { Region } from "@/shared/model/region/region";
import notion from "@/shared/notion/api/client";
import { isNotionEmoji } from "@/shared/notion/lib/isNotionEmoji";

const updateEntryRegion = async (id: string, region: Region) => {
  const borderCrossingDatabase = await notion.databases.retrieve({
    database_id: databaseIdBorderCrossings,
  });

  const regionProperty = borderCrossingDatabase.properties[propertyNameRegion];

  if (regionProperty.type !== "relation") {
    throw new Error(`Property "${propertyNameRegion}" is not a relation`);
  }

  const databaseIdRegions = regionProperty.relation.database_id;

  const { code, emoji, name } = region;

  const databaseRegions = await notion.databases.query({
    database_id: databaseIdRegions,
    filter: {
      property: "ISO 3166-1 Code",
      type: "rich_text",
      rich_text: {
        equals: code,
      },
    },
  });

  let databaseRegion = databaseRegions.results.at(0);

  if (databaseRegion === undefined) {
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
};

export default updateEntryRegion;
