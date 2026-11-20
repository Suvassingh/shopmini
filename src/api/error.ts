import { AxiosError } from 'axios'
import type { ApiErrorBody, ValidationIssue } from './types'

export class ApiError extends Error {
  readonly status: number | null
  readonly code: string
  readonly isNetworkError: boolean
  readonly isTimeout: boolean
  readonly issues: ValidationIssue[]
  readonly raw: unknown
  constructor(
    message: string,
    opts: {
      status?: number | null
      code: string
      isNetworkError?: boolean
      isTimeout?: boolean
      issues?: ValidationIssue[]
      raw?: unknown
    },
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = opts.status ?? null
    this.code = opts.code
    this.isNetworkError = opts.isNetworkError ?? false
    this.isTimeout = opts.isTimeout ?? false
    this.issues = opts.issues ?? []
    this.raw = opts.raw
  }

  get isClientError(): boolean {
    return this.status !== null && this.status >= 400 && this.status < 500
  }
  get isServerError(): boolean {
    return this.status !== null && this.status >= 500
  }
}

export function normalizeError(error: AxiosError): ApiError {
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return new ApiError('The request timed out. Please try again.', {
      code: 'TIMEOUT',
      isTimeout: true,
      raw: error,
    })
  }

  if (!error.response) {
    return new ApiError('Network error. Check your connection and try again.', {
      code: 'NETWORK_ERROR',
      isNetworkError: true,
      raw: error,
    })
  }

  const { status, data } = error.response
  const body = data as Partial<ApiErrorBody> | undefined

  return new ApiError(body?.message ?? error.message ?? `Request failed (${status})`, {
    status,
    code: body?.code ?? statusToCode(status),
    issues: Array.isArray(body?.errors) ? body.errors : [],
    raw: error,
  })
}

function statusToCode(status: number): string {
  switch (status) {
    case 400:
      return 'BAD_REQUEST'
    case 401:
      return 'UNAUTHORIZED'
    case 403:
      return 'FORBIDDEN'
    case 404:
      return 'NOT_FOUND'
    case 409:
      return 'CONFLICT'
    case 422:
      return 'VALIDATION_ERROR'
    case 429:
      return 'RATE_LIMITED'
    default:
      return status >= 500 ? 'SERVER_ERROR' : 'UNKNOWN_ERROR'
  }
}
