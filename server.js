import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/userExamples";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const User = mongoose.model("User", {
  name: String,
});

User.deleteMany().then(() => {
  new User({
    name: "Pernilla",
  }).save();
  new User({
    name: "Arne",
  }).save();
  new User({
    name: "Ebba",
  }).save();
});

// Defining the port
const port = process.env.PORT || 8000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Check if conntection is stable
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "Service unavailable" });
  }
});

// Start defining your routes here
app.get("/", (req, res) => {
  User.find().then((users) => {
    res.json(users);
  });
});

// Fetch individual user and handle errors
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Invalid user id" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid user id" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
