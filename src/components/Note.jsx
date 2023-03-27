import React from "react";
import { useGlobalContext } from "../Context";
import ViewNote from "./ViewNote";

const Note = () => {
  // Destructure values from global context
  const {
     searchNote, notes, viewNotes, toggleOptions,
     deleteNotes, handleEditNotes, handleViewNote, setCreateNotes
       } = useGlobalContext();

  // Filter notes based on search input
  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(searchNote.toLowerCase());
  });

  return (
    <>
      {/* Display notes if there are any */}
      {notes.length > 0 ? (
        <>
          {/* If there are filtered notes to display, show them */}
          {filteredNotes.length > 0 ? (
            <div className="notes-container">
              {filteredNotes.map((note) => {
                return (
                  <div className="notes" key={note.id}>
                    {/* Display note title */}
                    <div className="notes-header">
                      <p>{note.title}</p>
                    </div>
                    {/* Display note content */}
                    <div className="notes-text" 
                    onClick={() => handleEditNotes(note)}>
                      {note.note}
                    </div>
                    {/* Display options for editing, viewing, and deleting note */}
                    {note.showOptions ? (
                      <div className="options">
                        <div className="edit-option">
                          <i className="fa-regular fa-pen-to-square" onClick={() => handleEditNotes(note)}></i>
                          <i className="fa-regular fa-eye" onClick={() => handleViewNote(note)}></i>
                          <i className="fa-regular fa-trash-can" onDoubleClick={() => deleteNotes(note)}></i>
                        </div>
                        <i className="fa-regular fa-x" onClick={() => toggleOptions(note)}></i>
                      </div> ) : (
                      <div className="option">
                        <i className="fa-solid fa-ellipsis" onClick={() => toggleOptions(note)}></i>
                      </div> )}
                    {/* If the user is viewing a note, display it */}
                    {viewNotes && <ViewNote />}
                  </div>
                );
              })}
            </div>
          ) : (
            // If no notes match the search input, display a message
            <div className="notes-container">
              <div className="no-notes-found">No notes found.</div>
            </div>
          )}
        </>
      ) : (
        // If there are no notes, display a message and a button to create a new note
        <div className="notes-container">
          <div className="no-notes">
            <p> You have 0 notes.</p>
            <button onClick={() => setCreateNotes(true)}>
            <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Note;
