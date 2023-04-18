import mongoose from "mongoose";
const NoteSchema = new mongoose.Schema({
  notes: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
        text: {
          type: String,
        },
      },
    ],
    require: true,
    default: []
  },
});

const CreateNoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
    }
})
const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model("Note", NoteSchema);
const CreateNote = mongoose.model("CreateNote", CreateNoteSchema);
const User = mongoose.model("Users", UserSchema);
export { Note, User, CreateNote };
