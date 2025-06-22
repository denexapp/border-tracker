const encodeUrlParams = (strings: TemplateStringsArray, ...params: Array<string>): string =>
  strings.slice(1).reduce((result, string, index) => {
    const encodedUrlParam = encodeURIComponent(params[index]);
    return `${result}${encodedUrlParam}${string}`;
  }, strings[0]);

export default encodeUrlParams;
