const express = require('express')
const router = express.Router();
const { groupPost } = require("../../models/group_Post");
const { auth } = require('../../middleware/auth')


// 그룹 만들기
router.post('/api/group/posts', auth, async (req, res) => {
    try {
      const { title, content } = req.body;
  
      // 글 작성
      const newPost = new groupPost({
        title,
        content,
        author: req.user._id,
      });
      await newPost.save();
  
      return res.status(200).json({
        success: true,
        message: '그룹이 성공적으로 만들어졌습니다.',
        post: newPost,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: '그룹 만들기에 실패했습니다.',
        error: err.message,
      });
    }
});

// 그룹 조회
router.get("/api/group/posts", async (req, res) => {
    try {
      // 모든 커뮤니티 포스트 조회하되, content 필드를 선택하지 않음
      const posts = await groupPost.find({}, 'title content author comments createdAt updatedAt images')
        .populate("author")
        .populate("comments.author");
  
      return res.status(200).json({
        success: true,
        posts,
      });
    } catch (err) {
      // 에러 처리
      return res.status(500).json({
        success: false,
        message: "글 조회에 실패했습니다.",
        error: err.message,
      });
    }
});


module.exports = router;