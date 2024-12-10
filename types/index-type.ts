export interface ValidationError {
  success: boolean;
  message: string;
  data: {
    [key: string]: string[];
  };
}

export interface ErrorType {
  message: string;
}
