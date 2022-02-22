const express = require('express');
const router = express.Router();

router.get('/test-me', function(req, res) {

    res.send('my first ever api')
})
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------

//1. This API will fetch all movies from array

router.get('/movies', function(req, res){
    res.send('["wanted","pushpa","dhoom","run","hungama"]')

});

//-----------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

//2. This API will fetch all movie by indexId from array
router.get('/movies/:movieId', function(req, res){

    mov=["wanted","pushpa","dhoom","run","hungama"]
    let value = req.params.movieId;
    if (value>mov.length-1){
        res.send("does not exist")
    }
    else{
        res.send(mov[value])
    }
});



//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------

//3. This API will fetch all movies from array of all objects

router.get('/moviez', function(req, res){
    res.send([ {id: 1,name:'wanted'} , {id: 2,name:'pushpa'} , {id: 3,name:'dhoom'} , {id: 4,name:'run'} , {id: 5,name:'hungama'}])
});


//------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------


//4. This API will fetch all movies from array of objects by indexId

router.get('/films/:filmId', function(req, res){
    let movi =[{id: 1,name:'wanted'} , {id: 2,name:'pushpa'} , {id: 3,name:'dhoom'} , {id: 4,name:'run'} , {id: 5,name:'hungama'}]
     let value = req.params.filmId;

    let found=false;
    for(i=o;i<movi.length;i++)
    {
        if (movi[i].id==value)
            {
                found=true
                res.send(movi[i])
                break
            }

    }
    if (found==false)
    {
        res.send('No movies exists with this id')
    }

});



module.exports = router;
