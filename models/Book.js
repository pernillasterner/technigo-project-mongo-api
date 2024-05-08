import mongoose from "mongoose";

const { Schema } = mongoose;

// Schema - the blueprint
const bookSchema = new Schema({
  title: String,
  authors: String,
  average_rating: Number,
  // comments: [{ body: String, date: Date }],
  // date: { type: Date, default: Date.now, required: true, min: 0 },
  // hidden: Boolean,
  // meta: {
  //   votes: Number,
  //   favs: Number
  // }
});

// The model
export const Book = mongoose.model("Book", bookSchema);
