import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CounterState } from '../../types';

const initialState: CounterState = {
  value: 0,
  color: 'rgb(243, 244, 246)',
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      const intensity = Math.min(255, 200 + state.value * 5);
      state.color = `rgb(${intensity}, ${Math.max(200, intensity - 50)}, ${Math.max(200, intensity - 50)})`;
    },
    decrement: (state) => {
      state.value -= 1;
      const intensity = Math.min(255, 200 + state.value * 5);
      state.color = `rgb(${intensity}, ${Math.max(200, intensity - 50)}, ${Math.max(200, intensity - 50)})`;
    },
    reset: (state) => {
      state.value = 0;
      state.color = 'rgb(243, 244, 246)';
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;