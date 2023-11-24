const express = require('express')
const router = express.Router();
const app = express()
const { CommunityPost } = require("../../models/Comm_Post");
const { auth } = require('../../middleware/auth')


// 글 작성
router.post('/api/community/posts', auth, async (req, res) => {
    try {
      const { title, content } = req.body;
  
      // 글 작성
      const newPost = new CommunityPost({
        title,
        content,
        author: req.user._id,
        name: req.user.name
      });
      await newPost.save();
  
      return res.status(200).json({
        success: true,
        message: '게시물이 성공적으로 등록되었습니다.',
        post: newPost,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: '글 작성에 실패했습니다.',
        error: err.message,
      });
    }
  });

// 포스트 조회
router.get("/api/community/posts", async (req, res) => {
  try {
    // 모든 커뮤니티 포스트 조회하되, content 필드를 선택하지 않음
    const posts = await CommunityPost.find({}, 'title content author comments createdAt updatedAt images')
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

// 특정 유저의 커뮤니티 포스트에서 title 필드만 조회
app.get("/api/community/user/:userId/posts", async (req, res) => {
  try {
    const posts = await CommunityPost.find(
      { author: req.params.userId },
      "title"
    );

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "글 조회에 실패했습니다.",
      error: err.message,
    });
  }
});

// 특정 포스트 조회
app.get("/api/community/posts/:postId", auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await CommunityPost.findById(postId, 'title content author createdAt updatedAt images name')

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

// 댓글 추가 API 라우트
app.post("/api/community/posts/:postId/comments", auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const { text } = req.body;

    const post = await CommunityPost.findById(postId);

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
        message: "댓글을 추가하려면 로그인이 필요합니다.",
      });
    }

    // 댓글 추가
    post.comments.push({
      text,
      author: req.user._id,
    });

    await post.save();

    return res.status(200).json({
      success: true,
      message: "댓글이 성공적으로 추가되었습니다.",
    });
  } catch (err) {
    // 에러 처리
    return res.status(500).json({
      success: false,
      message: "댓글 추가에 실패했습니다.",
      error: err.message,
    });
  }
});

///////////////////////////////////////////////////////Post 기능 end///////////////////////////////////////////////////////

// 글 수정  http://localhost:5000/api/community/posts/:postId
app.put("/api/community/posts/:postId", auth, async (req, res) => {
  try {
    // 글 수정
    const { title, content } = req.body;
    const updatedPost = await CommunityPost.findByIdAndUpdate(
      req.params.postId,
      { title, content },
      { new: true } // 업데이트된 결과 반환
    );

    return res.status(200).json({
      success: true,
      post: updatedPost,
    });
  } catch (err) {
    // 에러 처리
    return res.status(500).json({
      success: false,
      message: "글 수정에 실패했습니다.",
      error: err.message,
    });
  }
});

// 글 삭제 http://localhost:5000/api/community/posts/:postId 로그인된 사용자만가능
app.delete("/api/community/posts/:postId", auth, async (req, res) => {
  try {
    const postId = req.params.postId;

    // postId에 해당하는 글을 찾고 삭제
    const post = await CommunityPost.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "해당 포스트를 찾을 수 없습니다.",
      });
    }

    // 작성자와 로그인한 사용자가 다른 경우, 권한 없음 반환
    if (req.user && post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "해당 포스트를 삭제할 권한이 없습니다.",
      });
    }

    // 작성자 본인이거나 권한이 있는 경우, 포스트 삭제
    await CommunityPost.findByIdAndDelete(postId);

    return res.status(200).json({
      success: true,
      message: "글이 성공적으로 삭제되었습니다.",
    });
  } catch (err) {
    // 에러 처리
    return res.status(500).json({
      success: false,
      message: "글 삭제에 실패했습니다.",
      error: err.message,
    });
  }
});

module.exports = router;