export function bytesToStr(byteArray: number[]): string {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
}

export function strToByteStr(str: string): string {
  const bytes: any = [];
  for (let i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i));
  }
  return bytesToStr(bytes);
}

const regex_url = /(\b(((https?|ftp):\/\/)|www.)[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;

export const parseStringUrl = (text: string): string => {
  const urls = regex_url;
  text = text ? String(text).replace(/<[^>]+>/gm, '') : '';

  if (text.match(urls)) {
    text = text.replace(urls, '<a class=\'underline hover:opacity-80\' href="$1" target="_blank">$1</a>');
  }

  return text.replace(/\n\r?/g, '<br />');
};
