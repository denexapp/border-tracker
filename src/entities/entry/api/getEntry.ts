import retrievePage from "@/shared/notion/api/retrievePage";
import { Entry } from "../model/entry/entry";
import { entryFromPage } from "../model/entry/entryFromPage";

export const getEntry = async (id: string): Promise<Entry> => {
  const page = await retrievePage(id);
  const entry = await entryFromPage(page);

  return entry;
};
