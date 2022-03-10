const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");



const createUser = async function (req, res) {
  try{
  let data = req.body;
  if(Object.keys(data).length >0){
  let savedData = await userModel.create(data);
  console.log(data)
  res.send({ msg: savedData });
  }
  else
  {
    res.status(400).send({error :"mobile number required"})
  }
}
  catch(error){
    res.status(500).send({status : false,msg:error})
  }
};




const loginUser = async function (req, res) {
  try{
  let userName = req.body.emailId;
  let password = req.body.password;


  
  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });

    

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FUnctionUp",
    },
    "functionup-thorium"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, data: token });
}
catch(error){
  res.status(500).send({msg:error.msg});
}
}


const getUserData = async function (req, res) {
  try{
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(404).send({ status: false, msg: "No such user exists" });
  else
    res.status(200).send({ status: true, data: userDetails });
}
catch(error){
  res.status(500).send({msg:error.msg});
}
}



const updateUser = async function (req, res) {
try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new : true});
  res.status(200).send({ status: "updated", data: updatedUser });
}
catch(error){
  res.status(500).send({msg:error.msg});
}
}



const deleteUser= async function(req,res){
   try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.status.send("No such user exists");
  }
  let deletedUser = await userModel.findOneAndUpdate({_id:userId},{isDeleted:true},{new:true});
  res.status(200).send({ status: "Deleted", data: deletedUser });

}
catch(error){
  res.status(500).send({msg:error.msg});
}
};


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser=deleteUser;

