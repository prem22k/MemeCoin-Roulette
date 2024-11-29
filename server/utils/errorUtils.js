export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const handleApiError = (error) => {
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data.message || 'External API error';
    return new ApiError(status, message);
  }
  
  if (error.request) {
    return new ApiError(503, 'Service unavailable');
  }
  
  return new ApiError(500, 'Internal server error');
};