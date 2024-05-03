import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/books";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const Book = mongoose.model("Book", {
  title: String,
  authors: String,
  average_rating: Number,
});

Book.deleteMany().then(() => {
  new Book({
    title: "Tjena tjea",
    authors: "Pernilla",
    average_rating: 4,
  }).save();
  new Book({ title: "Bye", authors: "Arne", average_rating: 9 }).save();
  new Book({ title: "Blur", authors: "Pill", average_rating: 3 }).save();
});

// Start defining your routes here
app.get("/", (req, res) => {
  Book.find().then((books) => {
    res.json(books);
  });
});

// Find one book
app.get("/:title", (req, res) => {
  Book.findOne({ title: req.params.title }).then((book) => {
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
