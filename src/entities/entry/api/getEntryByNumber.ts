import queryDatabasePage from "@/shared/notion/api/queryDatabasePage";
import { databaseIdBorderCrossings, propertyNameNumber } from "../config/consts";
import { Entry } from "../model/entry/entry";
import { entryFromPage } from "../model/entry/entryFromPage";

export const getEntryByNumber = async (number: number): Promise<Entry | null> => {
  const entryPage = await queryDatabasePage(databaseIdBorderCrossings, {
    filter: {
      property: propertyNameNumber,
      number: {
        equals: number,
      },
    },
  });

  if (entryPage === null) {
    return null;
  }

  const entry = await entryFromPage(entryPage);

  return entry;
};
