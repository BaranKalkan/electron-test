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
};
  
export type DataService = {
    getUsers: () => Promise<BaseResponse<User[]>>;
    addUser: (user: Omit<User, 'id'>) => Promise<BaseResponse<User>>;
};
  