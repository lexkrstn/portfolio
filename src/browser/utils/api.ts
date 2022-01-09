import fetch from 'isomorphic-fetch';
import config from '../config';

type RequestMethod = 'GET' | 'PATCH' | 'POST' | 'PUT';

export interface ErrorRecord {
  code: string;
  message: string;
}

export async function request<P>(method: RequestMethod, uri: string, payload?: P) {
  try {
    const response = await fetch(`${config.apiUrl}/${uri}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method,
      body: !!payload && JSON.stringify(payload),
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw {
          code: 'unauthorized',
          message: 'You are not authorized',
        };
      }
      if (response.status === 403) {
        throw {
          code: 'forbidden',
          message: 'You have no permission',
        };
      }
      if (response.status === 500) {
        throw {
          code: 'internal',
          message: 'Internal server error',
        };
      }
      throw {
        code: 'http',
        message: `Server error: ${response.statusText} (${response.status})`,
      };
    }
    return await response.json();
  } catch (err) {
    throw {
      code: err.code ?? 'internal',
      message: err.message ?? err,
    };
  }
}

export function post<P>(uri: string, payload?: P) {
  return request('POST', uri, payload);
}

export function get<P>(uri: string, payload?: P) {
  return request('GET', uri, payload);
}
