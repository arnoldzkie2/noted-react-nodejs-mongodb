import Note from "../models/notes.js";

const getAllNotes = async (req, res) => {
  try {
    const note = await Note.find();
    if (note.length < 1) {
      return res.status(200).json([]);
    }
    res.status(200).json(note);
  } catch (error) {
    console.log(error);
  }
};

const createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({ note });
  } catch (err) {
    res.status(500).json({ msg: "there was an error" });
  }
};

const getNote = async (req, res) => {
  try {
    const { id: noteID } = req.params;
    const note = await Note.findOne({ _id: noteID });
    if (!note) {
      return res.status(404).json({ msg: `No task with id: ${noteID}` });
    }

    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id: noteID } = req.params;
    const note = await Note.findByIdAndDelete({ _id: noteID });

    if (!note) {
      return res
        .status(404)
        .json({ msg: `No task with id: ${noteID} to delete` });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateNote = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export { getAllNotes, createNote, updateNote, deleteNote, getNote };
