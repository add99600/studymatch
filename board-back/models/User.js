const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name:{
      type:String,
      maxlength:50
  },
  email:{
      type:String,
      trim:true,
      unique:1
  },
  password:{
      type:String,
      maxlength:500
  },
  lastname:{
      type: String,
      maxlength:50
  },
  role:{
      type:Number,
      default:0
  },
  image: String,
  token:{
      type:String
  },
  tokenExp:{
      type:Number
  }
})

userSchema.pre("save", function ( next ) {
    var user = this;

    if (user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err) return reject(err);
        resolve(isMatch);
      });
    });
  };


userSchema.methods.generateToken = async function() {
    var user = this;
    // jsonwebtoken을 이용해서 token 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
  
    user.token = token;
  
    // save 메서드는 이제 프로미스를 반환합니다.
    try {
      await user.save();
      return user;
    } catch (err) {
      throw err;
    }
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    jwt.verify(token, "secretToken", function(err, decoded) {
        if (err) return cb(err);

        user.findOne({ "_id": decoded._id, "token": token }).exec()
        .then(user => {
            cb(null, user);
        })
        .catch(err => {
            cb(err);
        });
    });
}

const User = mongoose.model('User', userSchema)

module.exports = { User }