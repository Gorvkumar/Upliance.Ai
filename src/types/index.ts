export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface CounterState {
  value: number;
  color: string;
}

export interface RootState {
  counter: CounterState;
  user: UserData | null;
}