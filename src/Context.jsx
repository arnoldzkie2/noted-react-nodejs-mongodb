import React, { useContext, useState, useEffect } from "react";

// Create a new context object
const AppContext = React.createContext();

// Create a provider component that passes down state and functions to any component within the component tree
const AppProvider = ({ children }) => {
  // Define state variables using the useState hook
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [createNotes, setCreateNotes] = useState(false);
  const [targetNotes, setTargetNotes] = useState({});
  const [viewNotes, setViewNotes] = useState(false);
  const [editNotes, setEditNotes] = useState(false);
  const [editNoteData, setEditNoteData] = useState({});
  const [editWarningMsg, setEditWarningMsg] = useState("Save?");
  const [quit, setQuit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [noteCount, setNoteCount] = useState(0);
  const [save, setSave] = useState(false);
  const [theme, setTheme] = useState("light");
  const [searchNote, setSearchNote] = useState("");

  // Define functions that modify state
  const toggleOptions = (note) => {
    const updatedNote = {
      ...note,
      showOptions: !note.showOptions,
    };
    const updatedNotes = notes.map((n) => (n.id === note.id ? updatedNote : n));
    setNotes(updatedNotes);
  };

  const deleteNotes = (note) => {
    const updatedNotes = notes.filter((n) => note.id !== n.id);
    setNotes(updatedNotes);
  };

  const handleEditNotes = (note) => {
    setSave(false);
    setEditNotes(true);
    setEditNoteData(note);
  };

  const handleViewNote = (note) => {
    setViewNotes(true);
    setTargetNotes(note);
  };

  useEffect(() => {
    // Check if the length of notes array is decreasing and update noteCount accordingly
    let isDecreasing = true;
    for (let i = 1; i < notes.length; i++) {
      if (notes[i].length > notes[i - 1].length) {
        isDecreasing = false;
        break;
      }
    }
    if (isDecreasing) {
      setNoteCount(notes.length);
    }
  }, [notes]);

  // Return the context provider component with its value set to the state variables and functions
  return (
    <AppContext.Provider
      value={{
        quit,setQuit,
        theme,setTheme,
        save,setSave,
        notes,setNotes,
        noteCount,setNoteCount,
        createNotes,setCreateNotes,
        targetNotes,setTargetNotes,
        viewNotes,setViewNotes,
        editNotes,setEditNotes,
        editNoteData,setEditNoteData,
        editWarningMsg,setEditWarningMsg,
        isEditing,setIsEditing,
        searchNote,setSearchNote,
        toggleOptions,deleteNotes,
        handleEditNotes,handleViewNote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Export the useGlobalContext hook to access the context from any component in the component tree
export const useGlobalContext = () => {
  return useContext(AppContext);
};

// Export the AppContext and AppProvider
export { AppContext, AppProvider };
