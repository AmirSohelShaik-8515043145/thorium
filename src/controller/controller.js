const testOne=async function(req,res){
    res.send({msg:" 1st middleware run."})
}

const testTwo=async function(req,res){
res.send({msg:"2nd middleware run."})
}


module.exports.testOne = testOne;
module.exports.testTwo = testTwo;