//firebase imports
import pushToCollection from "./firebaseFunctions";

function App() {
  return (
    <>
      {/* handle the button ui  */}
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        // handle the click, this creates a collection "testCollection1" in the firebase database, with key "name" and value "gabriel"
        onClick={() =>
          pushToCollection("testCollection1", { name: "gabriel" })
        }>
        {/* name on the button */}
        Test Firebase Button
      </button>
    </>
  );
}

export default App;
