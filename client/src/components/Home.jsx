import React, { useEffect } from "react";
import CreateNote from "./CreateNote";
import Note from "./Note";
import Header from "./Header";
import Save from "./Save";
import { useGlobalContext } from "../Context";

const Home = () => {
  // Destructuring values from the global context
  const { isCreating, save } = useGlobalContext();

  return (
    <div className="container">
      <Header />
      <Note />
      {/* Renders the isCreating component if the 'isCreatings' state is true */}
      {isCreating && <CreateNote />}
      {/* Renders the Save component if the 'save' state is true */}
      {save && <Save />}
    </div>
  );
};

export default Home;
