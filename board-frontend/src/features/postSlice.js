import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost } from '../api/snsApi'

export const createPostThunk = createAsyncThunk('post/createPost', async (postData, { rejectWithValue }) => {
   try {
      const response = await createPost(postData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 등록 실패')
   }
})

const postSlice = createSlice({
   name: 'posts',
   initialState: {
      posts: [],
      post: null,
      pagination: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 게시물 등록
      builder
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createPostThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer
