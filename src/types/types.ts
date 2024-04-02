export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserData;
}

export interface UserData {
  id?: number;
  name: string;
  email: string;
  role?: 'user' | 'admin' | 'moderator';
}

export interface AccountData {
  id?:number;
  userId: number;
  name: string;
  balance: number;
}

export interface CategoryData {
  id?: number;
  userId: number;
  name: string;
}

export interface TransactionData {
  id?: number;
  accountId: number;
  categoryId: number;
  date: string;
  description: string;
  value: number;
  type: 'expense' | 'income';
}