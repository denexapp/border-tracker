import { locale } from "@/consts";
import { SimpleRegion } from "./simpleRegion";
import { isFlag } from '@/utils/emoji';

const regionDisplayName = new Intl.DisplayNames([locale], { type: "region", fallback: "none" });
const regionCodeRegex = new RegExp("^[A-Z]{2}$");
const emojiFlagUnicodeStartingPosition = 127397;

const simpleRegionFromRegionCode = (code: string): SimpleRegion | null => {
  if (!regionCodeRegex.test(code)) {
    return null;
  }

  const name = regionDisplayName.of(code);

  if (name === undefined) {
    return null;
  }

  // https://github.com/vercel/vercel/blob/main/packages/functions/src/headers.ts
  const emoji = String.fromCodePoint(
    ...code.split("").map((character) => character.charCodeAt(0) + emojiFlagUnicodeStartingPosition)
  );

  if (isFlag(emoji) === false) {
    return null;
  }

  const simpleRegion: SimpleRegion = {
    code,
    name,
    emoji,
  };

  return simpleRegion;
};
export default simpleRegionFromRegionCode;
