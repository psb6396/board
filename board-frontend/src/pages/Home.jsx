import { Container, Typography, Pagination, Stack } from '@mui/material'
import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { useState } from 'react'

const Home = () => {
   return (
      <Container maxWidth="xs">
         <Typography variant="h4" align="center" gutterBottom>
            Home Feed
         </Typography>

         <Typography variant="body1" align="center">
            로딩 중...
         </Typography>

         <Typography variant="body1" align="center" color="error">
            에러 발생:
         </Typography>

         <>
            <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
               <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                     avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                           R
                        </Avatar>
                     }
                     action={
                        <IconButton aria-label="settings">
                           <MoreVertIcon />
                        </IconButton>
                     }
                     title="Shrimp and Chorizo Paella"
                     subheader="September 14, 2016"
                  />
                  <CardMedia component="img" height="194" image="/static/images/cards/paella.jpg" alt="Paella dish" />
                  <CardContent>
                     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                     </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                     <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                     </IconButton>
                     <IconButton aria-label="share">
                        <ShareIcon />
                     </IconButton>
                  </CardActions>
               </Card>
            </Stack>
         </>

         <Typography variant="body1" align="center">
            게시물이 없습니다.
         </Typography>
      </Container>
   )
}

export default Home
