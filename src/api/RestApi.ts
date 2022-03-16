export const postFetch = async (url: string, body) => {
  return await fetch(url, {
    method: 'POST',
    // mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache',
    // credentials: 'same-origin',
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // },
    body
  });
};
