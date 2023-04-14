import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./Api";
// Create a new context object
const AppContext = React.createContext();
// Create a provider component that passes down state and functions to any component within the component tree
const AppProvider = ({ children }) => {
  // Define state variables using the useState hook
  const [allNotes, setAllNotes] = useState([]),
    [noteForm, setNoteForm] = useState({
      title: "New Note",
      text: "",
    }),
    [isCreating, setIsCreating] = useState(false),
    [viewNote, setViewNote] = useState(false),
    [viewSingleNote, setViewSingleNote] = useState({}),
    [editNoteData, setEditNoteData] = useState({}),
    [editWarningMsg, setEditWarningMsg] = useState("Save?"),
    [quit, setQuit] = useState(false),
    [isEditing, setIsEditing] = useState(false),
    [save, setSave] = useState(false),
    [theme, setTheme] = useState("light"),
    [searchNote, setSearchNote] = useState("");

  useEffect(() => {
    getAllNotes(API_URL);
  }, []);

  const getAllNotes = async (url) => {
    try {
      const response = await axios.get(url);
      setAllNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createNote = async (e, noteForm) => {
    e.preventDefault();
    const { title, text } = noteForm;
    if (!title) return alert("Title requred");
    try {
      const response = await axios.post(API_URL, {
        title: title,
        text: text,
      });
      await getAllNotes(API_URL);
      setNoteForm({});
      setIsCreating(false);
    } catch (error) {
      console.log(error);
    }
    setIsCreating(false);
  };

  const updateNote = async () => {
    if (isEditing) {
      // check if the note or title are empty
      if (!editNoteData.note && !editNoteData.text) {
        return alert("Nothing to be saved");
      }
      if (!editNoteData.text) {
        return alert("Title is required");
      }
      const { _id, title, text } = editNoteData;
      try {
        const response = await axios.patch(`${API_URL}/${_id}`, {
          title: title,
          text: text,
        });
        await getAllNotes(API_URL);
        setEditNoteData({});
        setSave(true);
        setIsEditing(false);
        setTimeout(() => {
          setSave(false);
        }, 700);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      getAllNotes(API_URL);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleOptions = (note) => {
    const updatedNote = {
      ...note,
      showOptions: !note.showOptions,
    };
    const updatedNotes = allNotes.map((n) =>
      n._id === note._id ? updatedNote : n
    );
    setAllNotes(updatedNotes);
  };

  const handleEditNotes = (note) => {
    setSave(false);
    setIsEditing(true);
    setEditNoteData(note);
  };
  const handleViewNote = (note) => {
    setViewNote(true);
    setViewSingleNote(note);
  };

  // Return the context provider component with its value set to the state variables and functions
  return (
    <AppContext.Provider
      value={{
        editNoteData,
        setEditNoteData,
        setNoteForm,
        noteForm,
        createNote,
        updateNote,
        deleteNote,
        quit,
        setQuit,
        theme,
        setTheme,
        save,
        setSave,
        allNotes,
        setAllNotes,
        isCreating,
        setIsCreating,
        viewNote,
        setViewNote,
        viewSingleNote,
        setViewSingleNote,
        editWarningMsg,
        setEditWarningMsg,
        isEditing,
        setIsEditing,
        searchNote,
        setSearchNote,
        toggleOptions,
        handleEditNotes,
        handleViewNote,
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
