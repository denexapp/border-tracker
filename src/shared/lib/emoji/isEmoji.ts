const emojiRegex = /^\p{Emoji_Presentation}$/v;

export const isEmoji = (emoji: string): boolean => emojiRegex.test(emoji);
