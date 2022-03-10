const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController");
const { auth, authNew } = require('../middleware/auth');

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",authNew, userController.getUserData)

router.put("/users/:userId",authNew, userController.updateUser)

router.delete("/users/:userId",auth,userController.deleteUser)

router.post("/users/:userId/post",authNew,userController.postMessage)

module.exports = router;