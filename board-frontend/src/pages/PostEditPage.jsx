import { Container } from '@mui/material'
import PostForm from '../components/post/PostForm'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostByIdThunk, updatePostThunk } from '../features/postSlice'

const PostEditPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { post, loading, error } = useSelector((state) => state.posts)
}

export default PostEditPage
