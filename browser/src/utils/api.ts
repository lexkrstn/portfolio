import fetch from 'isomorphic-fetch';
import config from '../config';

type RequestMethod = 'GET' | 'PATCH' | 'POST' | 'PUT';

export interface ErrorRecord {
  code: string;
  message: string;
}

export class RequestError extends Error {
  public constructor(public code: string, message: string) {
    super(message);
  }
}

export async function request<P>(method: RequestMethod, uri: string, payload?: P) {
  try {
    let queryString = '';
    if (payload && method === 'GET') {
      const params = Object.keys(payload)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent((payload as any)[k])}`)
        .join('&');
      queryString = `?${params}`;
    }
    const response = await fetch(`${config.apiUrl}/${uri}${queryString}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method,
      body: method !== 'GET' ? !!payload && JSON.stringify(payload) : undefined,
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new RequestError('unauthorized', 'You are not authorized');
      }
      if (response.status === 403) {
        throw new RequestError('forbidden', 'You have no permission');
      }
      if (response.status === 500) {
        throw new RequestError('internal', 'Internal server error');
      }
      throw new RequestError('http', `Server error: ${response.statusText} (${response.status})`);
    }
    return await response.json();
  } catch (err) {
    throw new RequestError(err.code ?? 'internal', err.message ?? err);
  }
}

export function post<P>(uri: string, payload?: P) {
  return request('POST', uri, payload);
}

export function get<P>(uri: string, payload?: P) {
  return request('GET', uri, payload);
}
