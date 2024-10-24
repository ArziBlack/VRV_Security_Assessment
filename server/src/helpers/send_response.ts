import { APIResponse, APISuccessResponse } from "../../typings/response";

export const send_response = <T>({
  success,
  status,
  message,
  ...rest
}: APIResponse<APISuccessResponse<T>>): APIResponse<T> => {
  return { ...rest, success, status, message };
};
