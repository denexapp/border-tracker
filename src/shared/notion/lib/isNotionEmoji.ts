import { Client } from "@notionhq/client";
import { isFlag } from "../../lib/emoji/isFlag";
import { isEmoji } from "../../lib/emoji/isEmoji";

type NotionEmoji = Exclude<
  Parameters<Client["databases"]["create"]>[0]["icon"],
  undefined | null | { custom_emoji: unknown } | { external: unknown }
>["emoji"];

export const isNotionEmoji = (emoji: string): emoji is NotionEmoji => isFlag(emoji) || isEmoji(emoji);
