const express = require('express')
const router = express.Router();
const { User } = require("../../models/User");
const { auth } = require('../../middleware/auth')


// 사용자 정보 업데이트
router.post('/api/updateUserMakegroup', auth, async (req, res) => {
  try {
    const { groupId } = req.body;
    const user = req.user;

    // 사용자의 Makegroup 필드에 그룹 ID 할당
    user.Makegroup.push(groupId);

    await user.save();

    return res.status(200).json({
      success: true,
      message: '사용자 정보가 성공적으로 업데이트되었습니다.',
    });
  } catch (error) {
    console.error('사용자 정보 업데이트 중 오류:', error);
    return res.status(500).json({
      success: false,
      message: '사용자 정보 업데이트 중 오류가 발생했습니다.',
      error: error.message,
    });
  }
});

module.exports = router;