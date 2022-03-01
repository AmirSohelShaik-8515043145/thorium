const { count } = require("console")
const BookModel= require("../models/bookModel")

//problem 1 : Create new entry , atleast 11

const createBook = async (request, response)=>{
    const data = request.body; 
    const dataRes = await BookModel.create(data); 
    response.send({
        msg: dataRes
    }); 
}


//problem 2 : gives all the books- their bookName and authorName only

const bookList = async (request, response)=>{
    const dataRes = await BookModel.find().select({
        'bookName': 1,
        'authorName': 1,
        '_id': 0
    }); 
    response.send({
        msg: dataRes
    }); 
}

//problem 3 : get all the books by year

const getBooksInYear = async (request, response)=>{
    const year = request.body.year; 
    const dataRes = await BookModel.find({
        'year': year
    }).select({
        'bookName': 1,
        '_id': 0
    }); 
    response.send({
        msg: dataRes
    });
}

//problem 4 : get particuler book by name or year

const getParticularBooks = async (request, response)=>{
    const data = request.body; 
    const dataRes = await BookModel.find(data).select({
        'bookName': 1,
        '_id': 0
    }); 
    response.send({
        msg: dataRes
    });
}

//problem 5 : get all the books by pricetag

const getXINRBooks = async (request, response)=>{
    const dataRes = await BookModel.find({
        $or: [
            {
                "prices.indianPrice": "100 INR"
            },
            {
                "prices.indianPrice": "200 INR"
            },
            {
                "prices.indianPrice": "500 INR"
            },
        ]
    }); 
    response.send({
        msg: dataRes
    });
}

//problem 6 : get all the books by available stock and total number of pages

const getRandomBooks = async (request, response)=>{
    const dataRes = await BookModel.find({
        $and: [
            {
                'totalPages':{
                    $gt: 500
                }
            },
            {
                'stockAvailable': true
            }
        ]
    }); 
    response.send({
        msg: dataRes
    });
}



module.exports.createBook=createBook,
module.exports.bookList=bookList,
module.exports.getBooksInYear=getBooksInYear,
module.exports.getParticularBooks=getParticularBooks,
module.exports.getXINRBooks=getXINRBooks,
module.exports.getRandomBooks=getRandomBooks