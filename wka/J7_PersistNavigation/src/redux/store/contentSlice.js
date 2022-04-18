import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBooksAPI } from "../api";

// Define an async function
const getBooksAsync = createAsyncThunk(
   'content/getBooks',
   async () => {
      const { data } = await getBooksAPI();
      // The value we return becomes the `fulfilled` action payload
      return data;
   }
);


// Part1: Define Slice (including reducers and actions)
const initialState = {
   bookData: [],
   status: 'idle',
};

const contentSlice = createSlice({
   name: 'content',
   initialState,
   extraReducers: (builder) => {
      builder
      .addCase(getBooksAsync.pending, (state) => {
         state.status = 'loading';
      })
      .addCase(getBooksAsync.fulfilled, (state, action) => {
         state.status = 'idle';
         state.bookData = action.payload;
      })
   },
});

// export state to global
export const selectBookData = (state) => state.content.bookData;
export const selectStatus = (state) => state.content.status;

// export async function to global
export { getBooksAsync }

// export reducer to global
export default contentSlice.reducer;
