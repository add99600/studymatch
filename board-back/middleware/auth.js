const { User } = require('../models/User')

let auth = (req, res, next) => {
    // 인증 처리

    // 클라이언트에서 쿠키에서 토큰을 가져옴
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후 유저를 찾는다
    User.findByToken(token, (err, user) => {
        if (err) {
            console.error(err);
            return res.json({ isAuth: false, error: true });
        }
        if (!user) {
            console.log('토큰 디코딩 후 사용자를 찾을 수 없음');
            return res.json({ isAuth: false, error: true });
        }

        req.token = token;
        req.user = user;
        next();
    });
}

module.exports = { auth };