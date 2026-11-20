export interface ApiResponse<T> {
  success: true
  data: T
  meta?: ApiMeta
}

export interface ApiMeta {
  total?: number
  skip?: number
  limit?: number
  page?: number
  pageSize?: number
  hasNext?: boolean
  [key: string]: unknown
}

export interface ApiErrorBody {
  success?: false
  message: string
  code?: string
  errors?: ValidationIssue[]
  details?: unknown
}
export interface ValidationIssue {
  field: string
  message: string
  code?: string
}
