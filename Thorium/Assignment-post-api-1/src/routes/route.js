// const express = require('express');
// const router = express.Router();




// router.get('/students/:name', function (req, res) {
//     let studentName = req.params.name
//     console.log(studentName)
//     res.send(studentName)
// })

// router.get("/random", function (req, res) {
//     res.send("hi there")
// })


// router.get("/test-api", function (req, res) {
//     res.send("hi FunctionUp")
// })


// router.get("/test-api-2", function (req, res) {
//     res.send("hi FunctionUp. This is another cool API")
// })


// router.get("/test-api-3", function (req, res) {
//     res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
// })


// router.get("/test-api-4", function (req, res) {
//     res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
// })



// router.get("/test-api-5", function (req, res) {
//     res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
// })

// router.get("/test-api-6", function (req, res) {
//     res.send({ a: 56, b: 45 })
// })

// router.post("/test-post", function (req, res) {
//     res.send([23, 45, 6])
// })


// router.post("/test-post-2", function (req, res) {
//     res.send({ msg: "hi", status: true })
// })

// router.post("/test-post-3", function (req, res) {
//     // let id = req.body.user
//     // let pwd= req.body.password

//     // console.log( id , pwd)

//     console.log(req.body)

//     res.send({ msg: "hi", status: true })
// })



// router.post("/test-post-4", function (req, res) {
//     let arr = [12, "functionup"]
//     let ele = req.body.element
//     arr.push(ele)
//     res.send({ msg: arr, status: true })
// })

// module.exports = router;

const express = require("express");
const router = express.Router();
const players = [
  {
    name: "manish",
    dob: "1/1/1995",
    gender: "male",
    city: "jalandhar",
    sports: ["swimming"],
    bookings: [
      {
        bookingNumber: 1,
        sportId: "",
        centerId: "",
        type: "private",
        slot: "16286598000000",
        bookedOn: "31/08/2021",
        bookedFor: "01/09/2021",
      },
      {
        bookingNumber: 2,
        sportId: "",
        centerId: "",
        type: "private",
        slot: "16286518000000",
        bookedOn: "31/08/2001",
        bookedFor: "01/09/2001",
      },
    ],
  },
  {
    name: "gopal",
    dob: "1/09/1995",
    gender: "male",
    city: "delhi",
    sports: ["soccer"],
    bookings: [],
  },
  {
    name: "lokesh",
    dob: "1/1/1990",
    gender: "male",
    city: "mumbai",
    sports: ["soccer"],
    bookings: [],
  },
];

router.post("/players/:name/:dob/:gender/:city/:sports/:bookings", function (req, res) {
    let newPlayer = {};
    newPlayer.name = req.params.name;
    newPlayer.dob = req.params.dob;
    newPlayer.gender = req.params.gender;
    newPlayer.city = req.params.city;
    newPlayer.sports = [req.params.sports];
    newPlayer.bookings = [req.params.bookings];
    for (let i = 0; i < players.length; i++) {
      if (players[i].name === newPlayer.name) {
        res.send("name already exist");
      }
    }
    players.push(newPlayer);
    console.log(newPlayer);
    res.send(players);
  }
);

router.post("/players/:playerName/bookings/:bookingId", function (req, res) {
  let userName = req.params.playerName;
  let userBookingId = req.params.bookingId;
  let userBookings = req.body;

  for (let i = 0; i < players.length; i++) {
    if (players[i].name == userName) {
      let arr = players[i].bookings;
      if (arr.length === 0) {
        arr.push(userBookings);
        res.send(players);
      } else {
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].bookingNumber == userBookingId) {
            res.send("booking ID already exist");
           break;
          }
          else if(j ===arr.length-1){
            arr.push(userBookings);
            res.send(players);
          }
        }
        
      }
    }
  }
  res.send("name does not exist");
});

module.exports = router;