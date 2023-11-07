const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRound = 10 // 10자리 1salt를 만들어서 암호화

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // dlghdwo5153 @gmail.com 같은 스페이스 없앰
        unique: 1 // 유니크 속성
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0 // 기본 값 0
    },
    image: {
        type: String
    },
    token: {
        type: String
    },
    tokenExp: { // 토큰 유효기간
        type: Number
    }
})

userSchema.pre('save', function(next) {
    var user = this; // userSchema를 가르킴

    // 모델 안 password가 변환 될 때만 bcrypt로 암호화
    if(user.isModified('password')){ 
        // 비밀번호 암호화
        bcrypt.genSalt(saltRound, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }
})

const User = mongoose.model('User', userSchema) // User 모델 정의

// 모델을 다른 파일에서도 사용하도록 export
module.export = { User }