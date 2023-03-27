import React from "react";
import { useGlobalContext } from "../Context";

const ViewNote = () => {
  // Use the useGlobalContext hook to access global state and actions
  const { setViewNotes, targetNotes, setTargetNotes } = useGlobalContext();

  // Define a function that resets the targetNotes and closes the view modal
  const resetView = () => {
    setViewNotes(false); // Set the view notes state to false
    setTargetNotes({}); // Set the target notes state to an empty object
  };

  return (
    <div className="view-modal" onClick={resetView}>
      <div className="view-container">
        <p>{targetNotes.title}</p> {/* Display the title of the target note */}
        <div>{targetNotes.note}</div> {/* Display the content of the target note */}
      </div>
    </div>
  );
};

export default ViewNote;