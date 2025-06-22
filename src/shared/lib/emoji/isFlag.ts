const flagRegex = /^\p{RGI_Emoji_Flag_Sequence}$/v;

export const isFlag = (value: string): boolean => flagRegex.test(value);
