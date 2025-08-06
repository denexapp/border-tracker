import queryDatabasePage from "@/shared/notion/api/queryDatabasePage";
import { databaseIdBorderCrossings, propertyNameNumber } from "../config/consts";
import { Entry } from "../model/entry/entry";
import { entryFromPage } from "../model/entry/entryFromPage";

export const getLastEntry = async (): Promise<Entry | null> => {
  const lastEntryPage = await queryDatabasePage(databaseIdBorderCrossings, {
    sorts: [
      {
        property: propertyNameNumber,
        direction: "descending",
      },
      {
        direction: "descending",
        timestamp: "created_time",
      },
    ],
  });

  if (lastEntryPage === null) {
    return null;
  }

  const entry = await entryFromPage(lastEntryPage);

  return entry;
};
