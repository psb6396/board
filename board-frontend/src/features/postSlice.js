import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost, deletePost, fetchPosts, getPostById,updatePost } from '../api/snsApi'
// import { create } from '../../../board-api/models/user'

//게시물 등록
export const createPostThunk = createAsyncThunk('post/createPost', async (postData, { rejectWithValue }) => {
   try {
      const response = await createPost(postData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 등록 실패')
   }
})

//게시물 가져오기
export const fetchPostsThunk = createAsyncThunk('post/fetchPosts', async (_, { rejectWithValue }) => {
   try {
      const response = await fetchPosts()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 가져오기 실패')
   }
})

export const fetchPostByIdThunk = createAsyncThunk('post/fetchPostById', async (id,{rejectWithValue})=>{
   try {
      const response = await getPostById(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 불러오기 실패')
   }
})

export const updatePostThunk = createAsyncThunk('post/updatePost', async (data, {rejectWithValue}) => {
      try {
         const {id, postData} = data
         const response = await updatePost(id, postData)
         return response.data.post
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '게시물 등록 실패')
      }
   })

export const deletePostThunk = createAsyncThunk('posts/deletePost', async (id,{rejectWithValue})=>{
   try {
      const response = await deletePost(id)
      return id
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
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
      builder
         .addCase(fetchPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
         })
         .addCase(fetchPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         builder
         .addCase(fetchPostByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload.post
         })
         .addCase(fetchPostByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         builder
         .addCase(updatePostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updatePostThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload.post
         })
         .addCase(updatePostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         builder
         .addCase(deletePostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deletePostThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(deletePostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer
