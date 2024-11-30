export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static fromError(error: unknown): AppError {
    if (error instanceof AppError) {
      return error;
    }
    if (error instanceof Error) {
      return new AppError(error.message, 'UNKNOWN_ERROR');
    }
    return new AppError('An unexpected error occurred', 'UNKNOWN_ERROR');
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      status: this.status,
      details: this.details,
    };
  }
}

export const handleApiError = (error: unknown): string => {
  const appError = AppError.fromError(error);
  console.error('API Error:', appError.toJSON());
  return appError.message;
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof Error && 
    ['Network Error', 'Failed to fetch'].some(msg => 
      error.message.includes(msg)
    );
};

export type ErrorCode = 
  | 'NETWORK_ERROR'
  | 'RATE_LIMIT'
  | 'API_ERROR'
  | 'INVALID_API_KEY'
  | 'VALIDATION_ERROR'
  | 'UNKNOWN_ERROR';

export class GiphyError extends Error {
  constructor(
    message: string,
    public readonly code: ErrorCode,
    public readonly status?: number
  ) {
    super(message);
    this.name = 'GiphyError';
  }
} 