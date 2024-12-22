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

   useEffect(()=>{
      dispatch(fetchPostByIdThunk(id))
   },[dispatch, id])

   const handleSubmit = useCallback(
      (postdata)=>{
      dispatch(updatePostThunk({id , postdata}))
      .unwrap()
      .then(()=>{
         window.location.href = '/'
      })
      .catch((error)=>{
         console.error('게시물 수정 중 오류 발생:',error)
         alert('게시물 수정에 실패했습니다.')
      })
   },
   [dispatch, id]
)
   
   if(loading) return <p>로딩중</p>
   if(error) return <p>에러발생:{error}</p>

   return (
      <Container>
         <h1>게시물 수정</h1>
         {post && <PostForm onSubmit={handleSubmit} initialValues={post} />}
      </Container>
   )
}

export default PostEditPage
