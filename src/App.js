import "./App.css";
import Todo from "./components/Todo";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
      className="App"
    >
      <h1
        style={{
          borderBottom: "2px solid whitesmoke",
        }}
      >
        Todo App
      </h1>
      <Todo />
    </div>
  );
}

export default App;
