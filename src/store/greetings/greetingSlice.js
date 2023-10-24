import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRandomGreeting = createAsyncThunk('greetings/fetchRandom', async () => {
  try {
    const response = await fetch('http://127.0.0.1:3000/api/greetings/random');
    if (!response.ok) {
      throw new Error('Failed to fetch greeting');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const initialState = {
  greeting: '',
  error: '',
  loading: false,
};

const greetingSlice = createSlice({
  name: 'greetings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomGreeting.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRandomGreeting.fulfilled, (state, action) => {
        state.greeting = action.payload.message;
        state.loading = false;
      })
      .addCase(fetchRandomGreeting.rejected, (state, action) => {
        state.error = action.error.message || 'Error 404. Failed to fetch';
        state.loading = false;
      });
  },
});

export default greetingSlice.reducer;
