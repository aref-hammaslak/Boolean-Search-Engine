import mongoose from "mongoose"


export const CommentModel = mongoose.model('comments', new mongoose.Schema({
    comment: String,
    index: Number
}))