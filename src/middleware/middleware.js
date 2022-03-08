const middleware=function(req,res,next){
    if(req.headers.isfreeappuser ==undefined){   
        console.log(req.headers)
    res.send({msg :"Request is missing a mandatory header."});
    return;
    }
    next();
}

module.exports.middleware=middleware;