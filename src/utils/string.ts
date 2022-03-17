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
