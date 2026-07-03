export interface UserData {
  avatar?: string;
  username?: string;
  email?: string;
  score?: number;
  games?: number;
  win?: number;
  lose?: number;
}

export interface ApiError {
  data?: string[];
  message?: string;
}

export interface UsersResponse {
  users: UserData[];
  total?: number;
}

export interface RoomResponse {
  id: string;
}
