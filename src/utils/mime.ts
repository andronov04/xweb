import { IPreviewMedia } from '../types/store';
import { urlToIpfs } from './index';

export const mimeMap = {
  'image/png': 'PNG',
  'image/jpeg': 'JPEG',
  'image/jpg': 'JPG',
  'text/html': 'HTML', // change ?
  'model/gltf-binary': 'GLB'
};

export const sortMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'model/gltf-binary', 'text/html'];
export const originalMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'text/html'];
export const downloadMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'model/gltf-binary'];

export const mimeFriendlyName = (mime: string) => {
  let name = 'IMAGE';
  switch (mime) {
    case 'text/html':
      name = 'HTML';
      break;
    case 'model/gltf-binary':
      name = '3D';
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
    case 'model/gltf-binary':
      ext = 'glb';
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
