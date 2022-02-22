function printDate(){
   console.log("Today's date is : 22-02-22")
}

function printMonth(){
    console.log("Current month is February")
}

function getbatchinfo(){
    console.log("Thorium, W3D1, the topic for today is Nodejs module system ")
    console.log("----------------------------------")
}

module.exports.printDate=printDate;
module.exports.printMonth=printMonth;
module.exports.getbatchinfo=getbatchinfo;