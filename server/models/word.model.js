
import mongoose from "mongoose"

export const WordModel = mongoose.model('words', new mongoose.Schema({
    word: String,
    index: Number,
    presentAt: mongoose.Schema.Types.Array
}))