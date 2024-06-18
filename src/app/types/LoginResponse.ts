export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
  };
  token: string;
}
