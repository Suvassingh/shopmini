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
