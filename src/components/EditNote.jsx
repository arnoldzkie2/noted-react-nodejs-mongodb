import React, { useState } from "react";
import { useGlobalContext } from "../Context";
import Save from "./Save";

const EditNote = () => {
  // import necessary values from global context
  const {
    save,setSave,setNotes,editNoteData,setEditNoteData,
    setEditNotes,isEditing,setIsEditing,setQuit,
  } = useGlobalContext();

  // handle changes in the edit note data
  const handleEditNote = (e) => {
    setIsEditing(true);
    const { name, value } = e.target;
    // update the specified key with the new value
    setEditNoteData((prevNoteData) => ({
      ...prevNoteData,
      [name]: value,
    }));
  };

  // save the edited note
  const saveEditedNotes = () => {
    if (isEditing) {
      // check if the note or title are empty
      if (!editNoteData.note && !editNoteData.title) {
        return alert("Nothing to be saved");
      }
      if (!editNoteData.title) {
        return alert("Title is required");
      }
      // update the notes array in global context
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.map((note) => {
          if (note.id === editNoteData.id) {
            return editNoteData;
          } 
          return note;
        });
        return updatedNotes;
      });
      // show a confirmation message that the note was saved
      setSave(true);
      setIsEditing(false);
      setTimeout(() => {
        setSave(false);
      },700)
    }
  };

  // check if the user wants to save changes before exiting edit mode
  const checkSave = () => {
    if (isEditing) {
      setQuit(true);
    } else {
      setEditNotes(false);
      setSave(false);
    }
  };

  return (
    <div className="edit-note">
      <div className="edit-left">
        <input
          type="text"
          value={editNoteData.title}
          onChange={handleEditNote}
          name="title"
          placeholder="Title"
        />
        <div className="edit-options">
          {/* save changes button */}
          <i className="fa-regular fa-floppy-disk" onClick={saveEditedNotes}></i>
          {/* cancel editing button */}
          <i className="fa-solid fa-right-to-bracket" onClick={checkSave}></i>
        </div>
      </div>
      <div className="edit-text">
        <textarea
          value={editNoteData.note}
          onChange={handleEditNote}
          name="note"
          placeholder="Write notes here...."
        />
      </div>
      {/* show confirmation message when note is saved */}
      {save && <Save />}
    </div>
  );
};

export default EditNote;
