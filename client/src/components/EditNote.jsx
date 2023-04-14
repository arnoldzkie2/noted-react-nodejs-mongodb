import React, { useState } from "react";
import { useGlobalContext } from "../Context";
import Save from "./Save";

const EditNote = () => {
  // import necessary values from global context
  const {
    save,setSave,editNoteData,updateNote,setEditNoteData,
    setEditNote,isEditing,setIsEditing,setQuit,
  } = useGlobalContext();

  // handle changes in the edit note data
  const handleEditNote = (e) => {
    setIsEditing(true);
    const { name, value } = e.target;
  setEditNoteData(prevData => ({
    ...prevData,
    [name]: value
  }))
  };

  // check if the user wants to save changes before exiting edit mode
  const checkSave = () => {
    if (isEditing) {
      setQuit(true);
    } else {
      setEditNote(false);
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
          <i className="fa-regular fa-floppy-disk" onClick={updateNote}></i>
          {/* cancel editing button */}
          <i className="fa-solid fa-right-to-bracket" onClick={checkSave}></i>
        </div>
      </div>
      <div className="edit-text">
        <textarea
          value={editNoteData.text}
          onChange={handleEditNote}
          name="text"
          placeholder="Write notes here...."
        />
      </div>
      {/* show confirmation message when note is saved */}
      {save && <Save />}
    </div>
  );
};

export default EditNote;
