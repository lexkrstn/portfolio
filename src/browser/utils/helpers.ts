export function checkFetchResponseStatus(response: Response): Promise<unknown> {
  if (response.status >= 200 && response.status < 300) {
    return response.status === 204 ? null : response.json();
  }
  if (response.status === 401) {
    return Promise.reject({
      message: 'You are not authorized',
      code: 'unauthorized',
    });
  }
  if (response.status === 500) {
    return Promise.reject({
      message: 'Internal server error',
      code: 'internal',
    });
  }
  return response.json().then(json => Promise.reject(json));
}
