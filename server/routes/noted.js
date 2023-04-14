import express from 'express'
import { getAllNotes, getNote, deleteNote, updateNote, createNote } from '../controller/noted.js';
const notes = express.Router();

notes.route('/').get(getAllNotes).post(createNote)

notes.route('/:id').get(getNote).patch(updateNote).delete(deleteNote)

export { notes }
