const express = require('express')
const router = express.Router()
// const User = require('../models/user')
const { isLoggedIn, isNotLoggedIn } = require('./middleware')
const { Post, Hashtag, User } = require('../models')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { count } = require('console')

try {
   fs.readdirSync('uploads')
} catch (error) {
   console.log('uploads폴더가 없어 uploads 폴더를 생성합니다.')
   fs.mkdirSync('uploads')
}

//이미지 업로드를 위한 multer 설정
const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/')
      },
      filename(req, file, cb) {
         const decodedFileName = decodeURIComponent(file.originalname)
         const ext = path.extname(decodedFileName)
         const basename = path.basename(decodedFileName, ext)

         cb(null, basename + Date.now() + ext)
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 },
})

// 게시물 등록
router.post('/', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      console.log('파일정보:', req.file)
      if (!req.file) {
         return res.status(400).json({ success: false, message: '파일 업로드에 실패했습니다.' })
      }

      //게시물 생성
      const post = await Post.create({
         content: req.body.content,
         img: `/${req.file.filename}`, //이미지 컬럼이 string 이었음 ㅇㅇ
         UserId: req.user.id,
      })

      const hashtags = req.body.hashtags.match(/#[^\s#]*/g)

      if (hashtags) {
         const result = await Promise.all(
            hashtags.map((tag) =>
               Hashtag.findOrCreate({
                  where: { title: tag.slice(1) },
               })
            )
         )
         await post.addHashtags(result.map((r) => r[0]))
      }

      res.json({
         success: true,
         post: {
            id: post.id,
            content: post.content,
            img: post.img,
            UserId: post.UserId,
         },
         message: '게시물이 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 등록 중 오류가 발생했습니다.', error })
   }
})



//전체게시물 불러오기
router.get('/', async (req, res) => {
   try {
      const posts = await Post.findAll({
         order: [['createdAt', 'DESC']],
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'email'],
            },
            {
               model: Hashtag,
               attributes: ['title'],
            },
         ],
      })
      res.json({
         success: true,
         posts,
         message: '전체 게시물 리스트를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 리스트를 불러오는 중 오류가 발생했습니다.', error })
   }
})

//특정 게시물 불러오기
router.get('/:id', async (req,res)=>{
   try {
      const post = await Post.findOne({
         where: {id: req.params.id},
         include: [
            {
               model: User,
               attributes: ['id','nick'],
            },
            {
               model: Hashtag,
               attributes: ['title'],
            },
         ],
      })
      if(!post) {
         return res.status(404).json({success: false, message:'게시물을 찾을 수 없습니다.'})
      }
      res.json({
         success:true,
         post,
         message:'게시물을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물을 불러오는 중 오류가 발생했습니다.', error })
   }
})

//게시물 수정 
router.put('/:id', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      const post = await Post.findOne({ where: {
         id: req.params.id, UserId : req.user.id
      }})
      if(!post) {
         return res.status(404).json({success:false, message: '게시물을 찾을 수 없습니다.'})
      }
      //게시물 수정
      await post.update({
         content: req.body.content,
         img:req.file ? `/${req.file.filename}` : post.img,
      })
      const hashtags = req.body.hashtags.match(/#[^\s#]*/g) // #을 기준으로 해시태그 추출
      if (hashtags) {
         const result = await Promise.all(
            hashtags.map((tag) =>
               Hashtag.findOrCreate({
                  where: { title: tag.slice(1) }, //#을 제외한 문자만
               })
            )
         )

         await post.setHashtags(result.map((r) => r[0])) //기존 해시태그를 새 해시태그로 교체
      }


   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 수정 중 오류가 발생했습니다.', error })
   }
})

module.exports = router
