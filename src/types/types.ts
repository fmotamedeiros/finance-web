export interface UserData {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: 'user' | 'admin' | 'moderator';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface AccountData {
  userId?: number;
  name?: string;
  balance?: number;
}

export interface AccountResponse {
  id: number;
  name: string;
  balance: number;
  userId: number;
}

export interface CategoryData {
  userId: number;
  name: string;
}

export interface CategoryResponse {
  id: number;
  name: string;
}

export interface TransactionData {
  accountId: number;
  categoryId: number;
  date: string;
  description: string;
  value: number;
  type: 'expense' | 'income';
}

export interface TransactionResponse extends TransactionData {
  id: number;
}