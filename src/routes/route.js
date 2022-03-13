const express = require('express');
const router = express.Router();
const cowinController= require("../controllers/cowinController")
const weatherController=require("../controllers/weatherController")
const memesController=require("../controllers/memesController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", cowinController.getStates)
router.get("/cowin/districtsInState/:stateId", cowinController.getDistricts)
router.get("/cowin/getByPin", cowinController.getByPin)
router.post("/cowin/getOtp", cowinController.getOtp)
router.get("/getSessionsByDistrict",cowinController.getSessionsByDistrict);


router.get("/getWeather",weatherController.getWeather);
router.get("/tempOfLondon",weatherController.tempOfLondon);
router.get("/tempOfCities",weatherController.tempOfCities);


router.get("/getMemes",memesController.getMemes)
router.post("/createMemes",memesController.createMemes)


// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;