import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../types';

const loadUserFromStorage = (): UserData | null => {
  const stored = localStorage.getItem('userData');
  return stored ? JSON.parse(stored) : null;
};

const userSlice = createSlice({
  name: 'user',
  initialState: loadUserFromStorage(),
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      localStorage.setItem('userData', JSON.stringify(action.payload));
      return action.payload;
    },
    clearUser: () => {
      localStorage.removeItem('userData');
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;