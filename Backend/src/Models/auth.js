var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
const Admin = require("../Models/Admin.js");
const Doctor = require("../Models/Doctor.js");
const Patient = require("../Models/Patient.js");
const { default: mongoose } = require("mongoose");


 const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
};
  
 

 const createJWT = (username)=>{
    const token = jwt.sign(username,process.env.JWT_SECRET);
    return token;
}


 const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
      res.status(401);
      console.log("not authorized");
      res.json({ message: "not authorized" });
      return;
    }
  
    const [, token] = bearer.split(" ");
  
    if (!token) {
      res.status(401);
      console.log("not valid token");
      res.json({ message: "not valid token" });
      return;
    }
  
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (e) {
      console.error(e);
      res.status(401);
      res.json({ message: "not valid token" });
      return;
    }
};

 const signin = async (req,res)=>{
  const username = req.body.Username
  const password = req.body.Password
  let user = await Patient.findOne({Username:username});
  let isValid
  if(user){
    isValid = comparePassword(password , user.Password)
    if(isValid){
      res.status(200).send(createJWT(username))
    }else{
      res.status(401).send("invalid password")
    }
  }else{
      user = await Doctor.findOne({Username:username})
      if(user){
        isValid = comparePassword(password , user.Password)
       if(isValid){
          res.status(200).send(createJWT(username))
         }else{
           res.status(401).send("invalid password")
        }
    }else{
      user = await Admin.findOne({Username:username})
      if(user){
        isValid = comparePassword(password , user.Password)
       if(isValid){
          res.status(200).send(createJWT(username))
         }else{
           res.status(401).send("invalid password")
        }
    }else{
      res.status(401).send("user not found")
    }
    }
  }
}

module.exports = {signin,comparePassword,createJWT,protect}