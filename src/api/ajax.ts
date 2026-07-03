const OK_STATUSES = [200, 201, 203];

async function request(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(path, {
    mode: 'cors',
    credentials: 'include',
    ...init,
  });
}

export async function doGet(path: string): Promise<Response> {
  return request(path, { method: 'GET' });
}

export async function doPost(path: string, body?: string, headers?: HeadersInit): Promise<Response> {
  return request(path, {
    method: 'POST',
    headers: headers ?? { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  });
}

export async function doPut(path: string, body: unknown): Promise<Response> {
  return request(path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
}

export async function doFormPost(path: string, body: FormData): Promise<Response> {
  return request(path, { method: 'POST', body });
}

export async function doDelete(path: string): Promise<Response> {
  return request(path, { method: 'DELETE' });
}

export function isOkStatus(status: number): boolean {
  return OK_STATUSES.includes(status);
}
