import Note from "../models/notes.js";
import asyncWrapper from "../middleware/asyncWrapper.js";

const getAllNotes = asyncWrapper( async( req, res) => {
    const note = await Note.find();
    if (note.length < 1) {
      return res.status(200).json([]);
    }
    res.status(200).json(note);
})

const createNote = asyncWrapper( async (req, res) => {
    const note = await Note.create(req.body);
    res.status(201).json({ note });

})

const getNote = asyncWrapper( async (req, res) => {
    const { id: noteID } = req.params;
    const note = await Note.findOne({ _id: noteID });
    if (!note) {
      return res.status(404).json({ msg: `No task with id: ${noteID}` });
    }
    res.status(200).json({ note });
})

const deleteNote = asyncWrapper(async (req, res) => {
    const { id: noteID } = req.params;
    const note = await Note.findByIdAndDelete({ _id: noteID });
    if (!note) {
      return res
        .status(404)
        .json({ msg: `No task with id: ${noteID} to delete` });
    }
    res.status(200).json({ success: true });
})

const updateNote = asyncWrapper(async (req, res) => {
    const { id: noteID } = req.params;
    const note = await Note.findByIdAndUpdate({ _id: noteID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) {
      return res
        .status(404)
        .json({ msg: `No task with id: ${noteID} to update` });
    }
    res.status(200).json(note);
})

export { getAllNotes, createNote, updateNote, deleteNote, getNote };
