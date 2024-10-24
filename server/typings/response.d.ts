export type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse;

export type APISuccessResponse<any> = {
  success: boolean;
  status: number;
  message: string;
  data?: any | null;
};

export type APIErrorResponse = {
  success: boolean;
  status: number;
  message: string;
  errors?: Record<string, string[]> | unknown;
};
