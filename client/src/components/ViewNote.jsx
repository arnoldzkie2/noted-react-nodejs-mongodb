import React from "react";
import { useGlobalContext } from "../Context";

const ViewNote = () => {
  // Use the useGlobalContext hook to access global state and actions
  const { setViewNote, viewSingleNote, setViewSingleNote} = useGlobalContext();

  // Define a function that resets the targetNotes and closes the view modal
  const resetView = () => {
    setViewNote(false); // Set the view notes state to false
    setViewSingleNote({}); // Set the target notes state to an empty object
  };

  return (
    <div className="view-modal" onClick={resetView}>
      <div className="view-container">
        <p>{viewSingleNote.title}</p> {/* Display the title of the target note */}
        <div>{viewSingleNote.text}</div> {/* Display the content of the target note */}
      </div>
    </div>
  );
};

export default ViewNote;