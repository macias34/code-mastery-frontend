export interface ApiError {
  timestamp: string;
  statusCode: number;
  message: string;
  description: string | null;
}
