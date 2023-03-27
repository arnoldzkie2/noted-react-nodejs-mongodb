import React, { useState } from "react";
import { useGlobalContext } from "../Context";
import { nanoid } from "nanoid";

const CreateNote = () => {
  // Using context to access state values and functions from the provider component
  const { setCreateNotes, notes, noteCount, setNoteCount } = useGlobalContext();

  // Initializing state values using useState hook
  const [noteForm, setNoteForm] = useState({
    title: `New Note ${noteCount}`,
    note: "",
    id: nanoid(),
    showOptions: false,
  });

  // Handling input changes in the form
  const handleForm = (e) => {
    const { name, value } = e.target;
    setNoteForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  // Creating a new note and adding it to the list of notes
  const createNewNotes = (e) => {
    e.preventDefault();
    const { title, note } = noteForm;
    if (!title) return alert("Title requred");
    notes.push(noteForm);
    setCreateNotes(false);
    setNoteCount(noteCount + 1);
  };

  // Cancelling the creation of a new note
  const cancelNote = () => {
    setCreateNotes(false);
  };

  return (
    <div className="new-note-modal">
      <form className="new-container" onSubmit={createNewNotes}>
        <p>Create New Note</p>
        {/* Input field for note title */}
        <input
          type="text"
          placeholder="Title"
          className="new-title"
          onChange={handleForm}
          name="title"
          value={noteForm.title}
        />

        {/* Textarea for note content */}
        <textarea
          className="new-textarea"
          placeholder="Write notes here.."
          onChange={handleForm}
          name="note"
          value={noteForm.note}
        />
        {/* Buttons to create or cancel note creation */}
        <div className="new-button">
          <button className="new-cancel" onClick={cancelNote} type="button">
            Cancel
          </button>
          <button className="new-create">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
