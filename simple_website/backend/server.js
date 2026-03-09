const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/simpledb")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Schema
const NoteSchema = new mongoose.Schema({
    text: String
});

const Note = mongoose.model("Note", NoteSchema);

// Add note
app.post("/add", async (req, res) => {
    const note = new Note({ text: req.body.text });
    await note.save();
    res.json(note);
});

// Get notes
app.get("/notes", async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});