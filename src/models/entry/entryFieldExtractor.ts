import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type EntryFieldExtractor<T> = (page: PageObjectResponse) => T | null | Promise<T | null>;
