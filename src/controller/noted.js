import { Note, CreateNote } from "../models/notes.js";
import asyncWrapper from "../middleware/asyncWrapper.js";

//working
const getAllNotes = asyncWrapper(async (req, res) => {
  const { id: userID } = req.params;
  const notes = await Note.find({_id: userID });
  if(!notes){
    return res.status(404).json({msg: "no user found"})
  }
  res.status(200).json(notes[0]);
});

//working
const createNote = asyncWrapper(async (req, res) => {
  const { id: userID } = req.params;
  const user = await Note.findOne({ _id: userID });
  if (!user) {
    return res.status(200).json({ msg: "no user founds" });
  }
  const newNote = await CreateNote.create(req.body);
  user.notes.push(newNote);
  await user.save();
  await CreateNote.deleteMany()
  res.status(201).json({ newNote });
});

const deleteNote = asyncWrapper(async (req, res) => {
  const { noteID: noteID, id: userID } = req.params;
  const user = await Note.findOne({ _id: userID });
  if (!user) {
    return res.status(404).json({ msg: "No user found" });
  }
  const note = user.notes.find(note => note._id.toString() === noteID)
  if (note === -1) {
    return res.status(404).json({msg: "No notes found"})
  }
  user.notes.splice(note, 1);
  await user.save()
  res.status(200).json({ deletedNote: {note} });
});

//working
const getNote = asyncWrapper(async (req, res) => {
  const { noteID: noteID, id: userID } = req.params;
  const user = await Note.findOne({ _id: userID });
  if(!user){
    return res.status(404).json({msg: 'No user found'})
  }
  const note = user.notes.find(note => note._id.toString() === noteID)
  if (!note) {
    return res.status(404).json({ msg: `"No notes found` });
  }
  res.status(200).json({ note });
});

//working
const updateNote = asyncWrapper(async (req, res) => {
  const { noteID: noteID, id: userID } = req.params;
  const user = await Note.findOne({ _id: userID });
  if (!user) {
    return res.status(404).json({ msg: "No user found" });
  }
  const findNote = user.notes.findIndex(note => note._id.toString() === noteID);
  if (findNote === -1) {
    return res.status(404).json({ msg: "No notes found" });
  }
  user.notes[findNote].title = req.body.title || user.notes[findNote].title;
  user.notes[findNote].text = req.body.text || user.notes[findNote].text;
  await user.save();
  res.status(200).json(user.notes);
});

export { getAllNotes, createNote, updateNote, deleteNote, getNote };
