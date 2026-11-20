import { api } from '../api/client'

export interface LoginRequest {
  userName: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  id: number
  username: string
}
export async function login(body: LoginRequest): Promise<LoginResponse> {
  return api.post<LoginResponse>('/auth/login', body)
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout')
}

export async function getMe(): Promise<{ id: number; username: string }> {
  return api.get('/auth/me')
}
