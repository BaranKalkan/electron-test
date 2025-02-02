export type BaseResponse<T> = {
    success: true;
    data: T;
  } | {
    success: false;
    error: error;
}

export type User = {
    id: string;
    name: string;
    email: string;
};
  