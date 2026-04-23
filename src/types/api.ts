export type ValidationErrors = {
  [key: string]: string[];
};

export type ApiError = {
  message: string;
  status: number;
  errors?: ValidationErrors;
};
