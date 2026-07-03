import { doDelete, doFormPost, doGet, doPost, doPut, isOkStatus } from './ajax';
import type { ApiError, RoomResponse, UserData, UsersResponse } from './types';
import { HOST, HOST_MULTIPLAYER } from '../config';

export class ApiErrorResponse extends Error {
  constructor(public readonly error: ApiError) {
    super(error.message ?? 'API error');
  }
}

export async function signIn(login: string, password: string): Promise<void> {
  const response = await doPost(
    `${HOST}/api/session`,
    JSON.stringify({ login, password }),
  );
  if (!isOkStatus(response.status)) {
    const error = (await response.json()) as ApiError;
    throw new ApiErrorResponse(error);
  }
}

export async function isAuth(): Promise<void> {
  const response = await doGet(`${HOST}/api/session`);
  if (!isOkStatus(response.status)) {
    throw response;
  }
}

export async function logout(): Promise<void> {
  const response = await doDelete(`${HOST}/api/session`);
  if (!isOkStatus(response.status)) {
    const error = (await response.json()) as ApiError;
    throw new ApiErrorResponse(error);
  }
}

export async function getUsers(limit = 5, page = 1): Promise<UsersResponse> {
  const response = await doGet(`${HOST}/api/users?limit=${limit}&page=${page}`);
  if (!isOkStatus(response.status)) {
    const error = (await response.json()) as ApiError;
    throw new ApiErrorResponse(error);
  }
  return response.json() as Promise<UsersResponse>;
}

export async function getUser(): Promise<UserData> {
  const response = await doGet(`${HOST}/api/user`);
  if (!isOkStatus(response.status)) {
    const error = (await response.json()) as ApiError;
    throw new ApiErrorResponse(error);
  }
  const data = (await response.json()) as { data: UserData };
  return data.data;
}

export async function signUp(params: {
  email: string;
  password: string;
  username: string;
  avatar?: string;
}): Promise<void> {
  const response = await doPost(
    `${HOST}/api/user`,
    JSON.stringify(params),
  );
  if (!isOkStatus(response.status)) {
    const error = (await response.json()) as ApiError;
    throw new ApiErrorResponse(error);
  }
}

export async function updateUser(params: { email?: string; username?: string }): Promise<string> {
  const response = await doPut(`${HOST}/api/user`, params);
  if (!isOkStatus(response.status)) {
    const error = (await response.json()) as ApiError;
    throw new ApiErrorResponse(error);
  }
  return params.username ?? '';
}

export async function updatePassword(newPassword: string, passwordConfirm: string): Promise<void> {
  const response = await doPut(`${HOST}/api/password`, {
    new_password: newPassword,
    password_confirm: passwordConfirm,
  });
  if (!isOkStatus(response.status)) {
    const error = (await response.json()) as ApiError;
    throw new ApiErrorResponse(error);
  }
}

export async function uploadAvatar(avatar: FormData): Promise<{ avatar?: string }> {
  const response = await doFormPost(`${HOST}/api/avatar`, avatar);
  if (!isOkStatus(response.status)) {
    const error = (await response.json()) as ApiError;
    throw new ApiErrorResponse(error);
  }
  return response.json() as Promise<{ avatar?: string }>;
}

export async function deleteUser(): Promise<void> {
  await doDelete(`${HOST}/api/user`);
}

export async function getRoomUrl(): Promise<RoomResponse> {
  const response = await doGet(`${HOST_MULTIPLAYER}/new_room`);
  if (!isOkStatus(response.status)) {
    throw response;
  }
  return response.json() as Promise<RoomResponse>;
}
