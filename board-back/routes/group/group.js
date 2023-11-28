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

// 특정 포스트 조회
router.get("/api/group/posts/:postId", auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await groupPost.findById(postId, 'title content author createdAt updatedAt images')

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "포스트를 찾을 수 없습니다.",
      });
    }

    // 작성자와 로그인한 사용자가 다른 경우, 권한 없음 반환
    // if (req.user && post.author.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "해당 포스트를 볼 권한이 없습니다.",
    //   });
    // }

    // 작성자 본인인 경우 content 필드를 포함하여 노출
    return res.status(200).json({
      success: true,
      post,
    });
  } catch (err) {
    // 에러 처리
    return res.status(500).json({
      success: false,
      message: "포스트 조회에 실패했습니다.",
      error: err.message,
    });
  }
});

// 그룹 내 게시판 글 작성
router.post("/api/group/posts/:postId/comments", auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body; // 수정: title과 content를 요청 바디에서 추출

    const post = await groupPost.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "해당 포스트를 찾을 수 없습니다.",
      });
    }

    // 로그인된 사용자만 댓글을 추가할 수 있도록 검증
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "게시물을 추가하려면 로그인이 필요합니다.",
      });
    }

    // 게시물 추가
    post.comments.push({
      title,    // 수정: 게시물 제목(title) 추가
      content,  // 수정: 게시물 내용(content) 추가
      author: req.user._id,
    });

    await post.save();

    return res.status(200).json({
      success: true,
      message: "게시물이 성공적으로 추가되었습니다.",
    });
  } catch (err) {
    // 에러 처리
    return res.status(500).json({
      success: false,
      message: "게시물 추가에 실패했습니다.",
      error: err.message,
    });
  }
});

// 그룹 내 게시판 조회
router.get("/api/group/posts/:postId/comments", auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await groupPost.findById(postId).populate('comments.author', 'email');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "포스트를 찾을 수 없습니다.",
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (err) {
    // 에러 처리
    return res.status(500).json({
      success: false,
      message: "포스트 조회에 실패했습니다.",
      error: err.message,
    });
  }
});

// 그룹 신청
router.post("/api/group/apply/:postId", auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const { additionalField } = req.body;
    const post = await groupPost.findById(postId);

    post.applicants.push({
      userId: req.user._id,
      additionalField,
    });

    await post.save(); 

    return res.status(200).json({
      success: true,
      message: '성공적으로 신청되었습니다.',
      post: post,
    });
  } catch (err) {
      return res.status(500).json({
        success: false,
        message: "신청에 실패했습니다.",
        error: err.message,
      });
  }
})

module.exports = router;