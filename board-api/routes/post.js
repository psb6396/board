const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { isLoggedIn, isNotLoggedIn } = require('./middleware')

// 게시물 등록
router.post('/', isLoggedIn, async (req, res, next) => {
   const { content, img } = req.body
   try {
   } catch (error) {}
})

module.exports = router
