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


// 쿠키값이 일치하는 사용자 정보 조회
router.post('/api/updateUserMakegroup/find', auth, async (req, res) => {
  try {
    const { token } = req.body;

    // 사용자 조회
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: '일치하는 사용자를 찾을 수 없습니다.',
      });
    }

    // 사용자가 가진 Makegroup 및 ingroup 반환
    const { Makegroup, ingroup, _id } = user;
    
    return res.status(200).json({
      success: true,
      user: {
        Makegroup,
        ingroup,
        _id
      },
    });
  } catch (error) {
    console.error('사용자 정보 조회 중 오류:', error);
    return res.status(500).json({
      success: false,
      message: '사용자 정보 조회 중 오류가 발생했습니다.',
      error: error.message,
    });
  }
});


module.exports = router;