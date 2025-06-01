const flagRegex = /^\p{RGI_Emoji_Flag_Sequence}$/v;

export const isFlag = (value: string): boolean => flagRegex.test(value);

const emojiRegex = /^\p{Emoji_Presentation}$/v;

export const isEmoji = (emoji: string): boolean => emojiRegex.test(emoji);
