import retrievePageWithProperties from "@/shared/notion/api/retrievePageWithProperties";
import { Entry } from "../model/entry/entry";
import { entryFromPage } from "../model/entry/entryFromPage";

export const getEntry = async (id: string): Promise<Entry> => {
  const page = await retrievePageWithProperties(id);
  const entry = await entryFromPage(page);

  return entry;
};
