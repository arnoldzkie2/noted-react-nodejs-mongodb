import express from 'express'
import { getAllNotes, getNote, deleteNote, updateNote, createNote } from '../controller/noted.js';
const notes = express.Router();

notes.route('/:id').get(getAllNotes).post(createNote)
notes.route('/:id/:noteID').get(getNote).delete(deleteNote).patch(updateNote)
export { notes }