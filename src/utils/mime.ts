import { IPreviewMedia } from '../types/store';
import { urlToIpfs } from './index';

export const mimeMap = {
  'image/png': 'PNG',
  'image/jpeg': 'JPEG',
  'image/jpg': 'JPG',
  'text/html': 'HTML', // change ?
  'model/gltf-binary': 'GLB',
  'image/svg+xml': 'SVG',
  'text/plain': 'TEXT',
  'video/webm': 'WEBM',
  'video/mp4': 'MP4'
};

export const tokenFormats = [
  {
    label: 'IMAGE',
    mimes: ['image/png', 'image/jpeg', 'image/jpg']
  },
  {
    label: 'VIDEO',
    mimes: ['video/webm', 'video/mp4']
  },
  {
    label: 'SVG',
    mimes: ['image/svg+xml']
  },
  {
    label: '3D',
    mimes: ['model/gltf-binary']
  },
  {
    label: 'TEXT',
    mimes: ['text/plain']
  },
  {
    label: 'HTML',
    mimes: ['text/html']
  }
];

export const sortMimeTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'video/webm',
  'video/mp4',
  'image/svg+xml',
  'model/gltf-binary',
  'text/plain',
  'text/html'
];
export const originalMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'video/webm', 'video/mp4', 'text/html', 'image/svg+xml', 'text/plain'];
export const downloadMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'video/webm', 'video/mp4', 'model/gltf-binary', 'image/svg+xml', 'text/plain'];

export const mimeFriendlyName = (mime: string) => {
  let name = 'IMAGE';
  switch (mime) {
    case 'video/webm':
    case 'video/mp4':
      name = 'VIDEO';
      break;
    case 'text/html':
      name = 'HTML';
      break;
    case 'model/gltf-binary':
      name = '3D';
      break;
    case 'text/plain':
      name = 'TEXT';
      break;
    case 'image/svg+xml':
      name = 'SVG';
      break;
  }

  return name;
};

export const getExtByMime = (mime: string) => {
  let ext = 'png';
  //data.data
  switch (mime) {
    case 'image/jpeg':
      ext = 'jpeg';
      break;
    case 'image/jpg':
      ext = 'jpg';
      break;
    case 'text/plain':
      ext = 'txt';
      break;
    case 'model/gltf-binary':
      ext = 'glb';
      break;
    case 'image/svg+xml':
      ext = 'svg';
      break;
    case 'video/webm':
      ext = 'webm';
      break;
    case 'video/mp4':
      ext = 'mp4';
      break;
  }

  return ext;
};

export const setMetaFormats = (data: IPreviewMedia[], opts: any = {}) => {
  const { width, height, cid, hash } = opts;
  let meta: any = [];

  data.forEach((dt) => {
    if (dt.mime.startsWith('image')) {
      meta.push({
        uri: urlToIpfs(dt.cid),
        hash: dt.hash ?? hash,
        mimeType: dt.mime,
        dimensions: {
          value: `${width}x${height}`,
          unit: 'px'
        }
      });
    } else {
      meta.push({
        uri: urlToIpfs(dt.cid),
        hash: dt.hash ?? hash,
        mimeType: dt.mime
      });
    }
  });
  let uri = `${urlToIpfs(cid)}`;
  if (hash) {
    uri += `?hash=${hash}`;
  }

  meta.push({
    uri,
    hash,
    mimeType: 'text/html'
  });
  return meta;
};
