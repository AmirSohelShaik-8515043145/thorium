const booksModel = require("../models/booksModel");
const reviewModel = require("../models/reviewModel")
const validator = require("../validator/validator")


//CREATEREVIEW-

const createReview = async function (req, res) {

    try {
        let data = req.params.bookId
        let review = req.body;
        review.reviewedAt = new Date(review.reviewedAt)
        if (!review) { return res.status(400).send({ status: false, message: "enter data for review" }) }

        let { bookId, reviewedBy, reviewedAt, rating } = review

        if (!validator.isValid(bookId)) {
            return res.status(400).send({ status: false, message: "bookId is required" })
        }
        if (!validator.isValid(reviewedBy)) {
            return res.status(400).send({ status: false, message: "reviewedBy is required" })
        }
        if (!validator.isValid(reviewedAt)) {
            return res.status(400).send({ status: false, message: "reviewedAt is required" })
        }
        if (!validator.isValid(rating)) {
            return res.status(400).send({ status: false, message: "rating is required" })
        }

        id = await booksModel.findOne({ _id: data , isDeleted:false})
        if (!id) {
            return res.status(400).send({ status: false, message: "no book exist with this id" })
        }
        let createData = await reviewModel.create(review);
        return res.send({ status: true, message: "review successfully created", data: createData })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error.message })
    }
}


//UPDATEREVIEW-


const updateReviews = async function (req, res) {
    let getBookId = req.params.bookId;
    let getReviewId = req.params.reviewId
    let data = req.body;
    if (!data) { return res.status(400).send({ status: false, message: "enter data for update" }) }

    let checkBookId = await booksModel.findOne({ _id: getBookId }, { isDeleted: false })
    if (!checkBookId) { return res.status(400).send({ status: false, message: "no book exist with this id" }) }
    let checkReviewId = await reviewModel.findOne({ _id: getReviewId }, { isDeleted: false })
    if (!checkReviewId) { return res.status(400).send({ status: false, message: "no review exist with this id" }) }


    let updateReview = await reviewModel.findOneAndUpdate({ _id: getReviewId, bookId: getBookId },
        { $set: { review: data.review, rating: data.rating, reviewedBy: data.reviewedBy,reviewedAt:Date.now() } }, { new: true })

    return res.status(200).send({ status: true, message: "review updated successfully", data: updateReview })

}

//DELETE REVIEw

const deleteReview = async function(req, res){
    try{
    let reviewId = req.params.reviewId
    let bookId = req.params.bookId

    let book = await booksModel.findOne({bookId:bookId, isDeleted:false});
    if(!book) { return res.status(404).send({ status: false, message: "no book exist with this id" }) }
    let reviwe = await reviewModel.findOne({reviewId:reviewId, bookId:bookId});
    if (reviwe.isDeleted == true) { return res.status(400).send({ status: false, msg: "reviwe has already been deleted" }) }
   
    let deleteRev= await reviewModel.findOneAndUpdate({ _id: reviwe._id, bookId:reviwe.bookId ,  isDeleted: false},
        { $set: { isDeleted: true} })
         let deleted = await  reviewModel.findOne({ _id: reviwe._id, bookId:reviwe.bookId,isDeleted: true })
         const count = await reviewModel.find({ bookId:reviwe.bookId,isDeleted: false })
         return res.status(200).send({ status: true, message: "review deleted successfully", totalReviwe:count.length , data: deleted })
         
} catch (error) {
    return res.status(500).send({ status: false, error: error.message })
}

}

module.exports.createReview = createReview
module.exports.updateReviews = updateReviews
module.exports.deleteReview=deleteReview