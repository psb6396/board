import React from 'react'
// import { Box } from '@mui/material'
import { TextField, Button, Box } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const PostCreatePage = () => {
   const [content, setContent] = useState('')
   const [hashtags, setHashtags] = useState('')
   const handleSubmit = (e) => {
      e.preventDefault()
   }
   return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} encType="multipart/form-data">
         {/* 이미지 업로드 필드 */}
         <Button variant="contained" component="label">
            이미지 업로드
            <input type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />
         </Button>

         {imgUrl && (
            <Box mt={2}>
               <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '400px' }} />
            </Box>
         )}

         {/* 게시물 내용 입력 필드 */}
         <TextField label="게시물 내용" variant="outlined" fullWidth multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} sx={{ mt: 2 }} />

         {/* 해시태그 입력 필드 */}
         <TextField label="해시태그 (# 구분)" variant="outlined" fullWidth value={hashtags} onChange={(e) => setHashtags(e.target.value)} placeholder="예: #여행 #음식 #일상" sx={{ mt: 2 }} />

         {/* 등록 / 수정 버튼 */}
         <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            {/* {submitButtonLabel} */}
            등록하기
         </Button>
      </Box>
   )
}

export default PostCreatePage
