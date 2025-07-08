import queryPaginatedDatabasePages from "@/shared/notion/api/queryPaginatedDatabasePages";
import { databaseIdBorderCrossings, propertyNameNumber } from "../config/consts";
import { Entry } from "../model/entry/entry";
import { entryFromPage } from "../model/entry/entryFromPage";

export const getLastEntry = async (): Promise<Entry | null> => {
  const entryPages = await queryPaginatedDatabasePages(databaseIdBorderCrossings, {
    limit: 1,
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

  const lastEntryPage = entryPages.at(0);

  if (lastEntryPage === undefined) {
    return null;
  }

  const entry = await entryFromPage(lastEntryPage);

  return entry;
};
