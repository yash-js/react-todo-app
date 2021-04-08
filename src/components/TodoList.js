import { Button, ListItem, ListItemText } from "@material-ui/core";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TodoList.css";

function TodoList({ todo, inprogress, id }) {
  const doneNotify = () => toast.success("Task Completed");
  const progressNotify = () => toast.info("Task In Progress");
  const removeNotify = () => toast.info("Todo Removed");

  const toggleInProgress = (e) => {
    db.collection("todos").doc(id).update({
      inprogress: !inprogress,
    });
    if (inprogress) {
      doneNotify();
    } else {
      progressNotify();
    }
    e.target.value = "Helllo";
  };
  
  const deleteTodo = () => {
    db.collection("todos").doc(id).delete();
    removeNotify();
  };

  return (
    <div className="listContainer">
      <ListItem>
        <ListItemText
          style={{
            // paddingLeft: "100px",
            paddingRight: "0px",
          }}
          primary={todo}
          secondary={inprogress ? "In Progress" : "Completed"}
        />
        <Button
        style={{
            marginRight: "10px !important"
        }}
        variant="contained" color="primary" onClick={toggleInProgress}>
          {inprogress ? "Done" : "Undone"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={deleteTodo}
          title="Delete Todo"

        >
          X
        </Button>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ListItem>
    </div>
  );
}

export default TodoList;
