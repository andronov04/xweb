export const postFetch = async (url: string, body, headers = {}) => {
  return await fetch(url, {
    method: 'POST',
    // mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache',
    // credentials: 'same-origin',
    headers: headers,
    body
  });
};

export const postDataFetch = async (url: string, body) => {
  return await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });
};
