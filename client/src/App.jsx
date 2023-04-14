// Import necessary components and context
import EditNote from "./components/EditNote";
import EditWarning from "./components/EditWarning";
import Home from "./components/Home";
import { useGlobalContext } from "./Context";
// Define App component
function App() {

  // Destructure properties from global context
  const { isEditing, quit } = useGlobalContext();

  // Render components based on state of editNotes and isEditing
  return (
    <>
      {/* If editNotes is true, render EditNote component and conditionally render EditWarning component */}
      {isEditing ? (
        <>
          <EditNote />
          {isEditing && quit && <EditWarning />}
        </>
      ) : (
        // If editNotes is false, render Home component
        <>
          <Home />
        </>
      )}
    </>
  );
}

// Export App component as default
export default App;