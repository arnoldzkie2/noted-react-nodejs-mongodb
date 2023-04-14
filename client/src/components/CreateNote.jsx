import React, { useState } from "react";
import { useGlobalContext } from "../Context";

const CreateNote = () => {
  // Using context to access state values and functions from the provider component
  const { setIsCreating, allNotes ,createNote, setNoteForm, noteForm} = useGlobalContext();
  // Initializing state values using useState hook

  // Handling input changes in the form
  const handleForm = (e) => {
    const { name, value } = e.target;
    setNoteForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };
  const cancelNote = () => {
    setIsCreating(false);
    setNoteForm({
      title: "New Note",
      text: ""
    })
  };

  return (
    <div className="new-note-modal">
      <form className="new-container" onSubmit={(e) => createNote(e, noteForm)}>
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
          name="text"
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
