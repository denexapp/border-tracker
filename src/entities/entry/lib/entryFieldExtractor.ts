import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type EntryField<Value, Meta = never> = [Meta] extends [never]
  ? { value: Value; filled: boolean }
  : { value: Value; meta: Meta; filled: boolean };

export type EntryFieldExtractor<T, Meta = never> = (page: PageObjectResponse) => Promise<EntryField<T, Meta>>;
