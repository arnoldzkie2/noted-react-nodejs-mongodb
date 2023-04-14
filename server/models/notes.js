import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    text: {
        type: String,
    },
})

const Note = mongoose.model('Note', NoteSchema)

export default Note