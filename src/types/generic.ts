export type AppResponse<T = undefined> = {
  success: boolean;
  status: number;
  data?: T;
  error?: string;
  message?: string;
};

export type UpdateResponse = {
  success: boolean;
  changes: number;
  message: string;
};
