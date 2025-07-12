type ActionResponse<T> = (data: T) => Promise<{
  message: string;
  status: number;
}>;
