//firebase imports
import pushToCollection from "./firebaseFunctions";

function App() {
  return (
    <>
      <div className='card'>
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
          onClick={() =>
            pushToCollection("testCollection1", { name: "gabriel" })
          }>
          Test Firebase Button
        </button>
      </div>
    </>
  );
}

export default App;
