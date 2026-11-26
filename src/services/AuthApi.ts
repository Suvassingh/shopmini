import { http } from '../api/client'

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
  return http.post<LoginResponse>('/auth/login', body)
}

export async function logout(): Promise<void> {
  await http.post('/auth/logout')
}

export async function getMe(): Promise<{ id: number; username: string }> {
  return http.get('/auth/me')
}
