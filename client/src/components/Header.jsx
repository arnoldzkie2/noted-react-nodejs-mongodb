import React, { useState } from "react";
import { useGlobalContext } from "../Context";

const Header = () => {
  // Destructuring values from global context using custom hook 'useGlobalContext'
  const { setIsCreating, isCreating, setTheme, theme, searchNote, setSearchNote } = useGlobalContext();

  // Function to toggle between light and dark mode
  const darkMode = () => {
    if(theme === 'light') {
      // If current theme is light, switch to dark theme and update CSS variables
      setTheme('dark')
      document.documentElement.style.setProperty('--main', '#222');
      document.documentElement.style.setProperty('--main1', '#424242');
      document.documentElement.style.setProperty('--second', '#FFFFFF');
      document.documentElement.style.setProperty('--second1', 'rgb(240,245,245)');
      document.documentElement.style.setProperty('--accent', '#FF9670');
    } else {
      // If current theme is dark, switch to light theme and update CSS variables
      setTheme('light')
      document.documentElement.style.setProperty('--main', 'rgb(240,245,245)');
      document.documentElement.style.setProperty('--main1', '#FFF');
      document.documentElement.style.setProperty('--second', '#222');
      document.documentElement.style.setProperty('--second1', '#424242');
      document.documentElement.style.setProperty('--accent', '#db4e32');
    }
  };

  // Function to create a new note
  const createNewNote = () => {
    setSearchNote('') // Clear search field
    setIsCreating(true)
    console.log(isCreating); // Set 'createNotes' to true to show create note section
  }


  return (
    <div className="header">
      <h1>NOTED</h1>
      <input 
        type="text"
        placeholder="Search Notes"
        value={searchNote}
        onChange={(e) => setSearchNote(e.target.value)}
      />
      <ul className="option">
        {/* Add button to create a new note */}
        <li>
          <i className="fa-solid fa-plus" onClick={createNewNote}></i>
        </li>
        {/* Add button to toggle between light and dark mode */}
        <li>
          {theme === "light" ? 
          (<i className="fa-solid fa-moon" onClick={darkMode}></i>) 
          : 
          (<i className="fa-solid fa-sun" onClick={darkMode}></i>)}
        </li>
      </ul>
    </div>
  );
};

export default Header;
