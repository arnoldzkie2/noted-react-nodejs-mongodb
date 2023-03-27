import React, { useEffect } from "react";
import { useGlobalContext } from "../Context";

const EditWarning = () => {
  // Destructure necessary data from the global context using the 'useGlobalContext' hook
  const {
    editWarningMsg,setSave,setQuit,
    setEditNotes,setNotes,editNoteData,setIsEditing,
        } = useGlobalContext();

  // Function to handle the 'No' button click, which closes the edit warning popup without saving the changes
  const checkSave = () => {
    setQuit(false); // Reset the 'Quit' state to false, indicating that the user has chosen not to quit
    setIsEditing(false); // Set the 'IsEditing' state to false, indicating that the user is no longer editing a note
    setEditNotes(false);// Reset the 'EditNotes' state to false, indicating that the user is no longer editing notes
  };

  // Function to handle the 'Yes' button click, which saves the changes made to the note and closes the edit warning popup
  const save = () => {
    // Check if the note title exists in the 'editNoteData' object
    if (editNoteData.title) {
      // If the title exists, update the notes array in the global context with the edited note data
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.map((note) => {
          if (note.id === editNoteData.id) return editNoteData; // If the note id matches the id of the edited note, return the edited note data
          return note; // Otherwise, return the original note data
        });
        setIsEditing(false); // Set the 'IsEditing' state to false, indicating that the user is no longer editing a note
        setEditNotes(false); // Reset the 'EditNotes' state to false, indicating that the user is no longer editing notes
        setQuit(false); // Reset the 'Quit' state to false, indicating that the user has chosen not to quit
        setSave(true); // Set the 'Save' state to true, indicating that the user has saved the changes
        return updatedNotes; // Return the updated notes array
      });
    } else {
      // If the title does not exist in the 'editNoteData' object, show an alert asking the user to add a title
      return alert("Title is required");
    }
  };
  // Render the edit warning popup
  return (
    <div className="pop-warning">
      <p>{editWarningMsg}</p>
      <div className="warning-option">
        <button onClick={checkSave}>No</button>
        <button onClick={save}>Yes</button>
      </div>
    </div>
  );
};

export default EditWarning;
