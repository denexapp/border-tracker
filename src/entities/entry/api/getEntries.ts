import queryDatabasePages from "@/shared/notion/api/queryDatabasePages";
import { databaseIdBorderCrossings, propertyNameNumber } from "../config/consts";
import { Entry } from "../model/entry/entry";
import { entryFromPage } from "../model/entry/entryFromPage";

export const getEntries = async (): Promise<Entry[]> => {
  const pages = await queryDatabasePages(databaseIdBorderCrossings, {
    sorts: [
      {
        direction: "descending",
        property: propertyNameNumber,
      },
    ],
  });
  const entries = await Promise.all(pages.map((page) => entryFromPage(page)));

  return entries;
};
