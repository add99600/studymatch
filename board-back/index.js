const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require("./models/User")
const config = require('./config/key')
const { auth } = require('./middleware/auth')
const mongoose = require('mongoose')
const cors = require('cors')


app.use(cors())

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());


mongoose // 몽고db와 연결
.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

const boardRouter = require('./routes/board/board'); // board.js 파일을 가져옴
app.use('/', boardRouter)

const groupRouter = require('./routes/group/group'); // group.js 파일을 가져옴
app.use('/', groupRouter)

const UserInfoRouter = require('./routes/User/UserInfo'); // group.js 파일을 가져옴
app.use('/', UserInfoRouter)


app.get('/', (req, res) => res.send('hello word'))

// 회원가입
app.post('/api/user/register', async (req, res) => {
    try {
        const user = new User(req.body);
        const userInfo = await user.save();
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false, err });
    }
});

// 로그인
app.post("/api/user/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "잘못된 정보입니다.",
        });
      }
  
      const isMatch = await user.comparePassword(req.body.password);
  
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
  
      await user.generateToken();
  
      res.cookie("x_auth", user.token).status(200).json({
        loginSuccess: true,
        userId: user._id,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("서버 에러");
    }
});

// 사용자 정보
app.get('/api/users/auth', auth ,(req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

// 로그아웃 처리
app.get("/api/users/logout", auth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: "" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, error: "사용자를 찾을 수 없음" });
    }

    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.error("로그아웃 실패:", err);
    return res.status(500).json({ success: false, error: "로그아웃 실패" });
  }
});
  


app.listen(port, () => console.log(`Example app listening on port ${port}!`))