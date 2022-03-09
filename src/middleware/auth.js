const jwt = require("jsonwebtoken");
const auth = function(req,res,next){
let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  if (!token) return res.send({ status: false, msg: "token must be present." });
  let decodedToken = jwt.verify(token, "functionup-thorium");
  console.log(decodedToken);
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid." });
    next();
}

const authNew = function(req,res,next){
  let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
  
    if (!token) return res.send({ status: false, msg: "token must be present." });
    let decodedToken = jwt.verify(token, "functionup-thorium");
    if (!decodedToken || decodedToken.userId != req.params.userId)
      return res.send({ status: false, msg: "token is invalid." });
    next();
  }

module.exports.auth=auth;
module.exports.authNew = authNew;