import { Container, Typography, Pagination, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import * as React from 'react'
import Card from '@mui/material/Card'

import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import IconButton from '@mui/material/IconButton'

import { useDispatch, useSelector } from 'react-redux'

import { useState, useEffect } from 'react'
import { fetchPostsThunk } from '../features/postSlice'
import { Link } from 'react-router-dom'

const Home = ({ isAuthenticated, user }) => {
   const { posts, loading, error } = useSelector((state) => state.posts)

   const dispatch = useDispatch()
   const onClickDelete = () => {}

   useEffect(() => {
      dispatch(fetchPostsThunk())
   }, [dispatch])

   return (
      <Container maxWidth="xs">
         <Typography variant="h4" align="center" gutterBottom>
            Home Feed
         </Typography>

         {loading && (
            <Typography variant="body1" align="center">
               로딩 중...
            </Typography>
         )}

         {error && (
            <Typography variant="body1" align="center" color="error">
               에러 발생:
            </Typography>
         )}

         <>
            <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
               {posts.map((post) => (
                  <Card key={post.id} sx={{ maxWidth: 345 }}>
                     <CardMedia component="img" height="194" image={`${process.env.REACT_APP_API_URL}${post.img}`} alt="Paella dish" />
                     <CardContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                           {post.content}
                        </Typography>
                     </CardContent>
                     <CardActions disableSpacing>
                        <Link to={`/posts/edit/${post.id}`}>
                           <IconButton aria-label="edit">
                              <EditIcon fontSize="small" />
                           </IconButton>
                        </Link>
                        <IconButton aria-label="delete" size="small" onClick={() => onClickDelete(post.id)}>
                           <DeleteIcon fontSize="small" />
                        </IconButton>
                     </CardActions>
                  </Card>
               ))}
            </Stack>
         </>

         <Typography variant="body1" align="center">
            게시물이 없습니다.
         </Typography>
      </Container>
   )
}

export default Home
