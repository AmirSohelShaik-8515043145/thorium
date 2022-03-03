const { count } = require("console");
const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");
const publisherModel = require("../models/publisherModel");

const createBook = async function (req, res) {
  let data = req.body;
  let ad = data.author;
  let pd = data.publisher;

  let author1 = await authorModel.findById(ad);
  let publisher1 = await publisherModel.findById(pd);

  if (data.hasOwnProperty("author")) {
    if (author1 === null) {
      return res.send({ error: "author is not present" });
    } else {
      if (data.hasOwnProperty("publisher")) {
        if (publisher1 === null) {
          return res.send({ error: "publisher is not present" });
        } else {
          let bookData = await bookModel.create(data);
          return res.send({ book: bookData });
        }
      } else {
        return res.send({ error: "publisher id is required" });
      }
    }
  } else {
    return res.send({ error: "author id is required" });
  }
};

const getBooksData = async function (req, res) {
  let books = await bookModel.find().populate("author").populate("publisher");
  res.send({ data: books });
};

const updateHardCover = async function (req, res) {
  let books = await bookModel.find().populate("publisher").populate("author");
let booksName = [];
  for(i=0;i<books.length;i++){
      if(books[i].publisher.name == "Penguin" || books[i].publisher.name == "HarperCollins"){
        booksName.push(books[i].name);
      }
  }
  let updatedCover = [];
  for (let i = 0; i < booksName.length; i++) {
    let updateData = await bookModel.findOneAndUpdate(
      { name: booksName[i] },
      { $set: req.body },
      { new: true }
    );
    updatedCover.push(updateData);
  }
  res.send({ updatedCover: updatedCover });
};

const updatePrice= async function (req, res) {
  
    let increasePrice = await bookModel.updateMany({ratings:{$gt:3.5}},{$inc : {price: +10}});
    res.send({booksUpdated:increasePrice.modifiedCount})
}

module.exports.createBook = createBook;
module.exports.getBooksData = getBooksData;
module.exports.updateHardCover = updateHardCover;
module.exports.updatePrice = updatePrice;