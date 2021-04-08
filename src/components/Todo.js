import { useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import { db } from "../firebase";
import { useState } from "react";
import TodoList from "./TodoList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Todo() {
  const inputNotify = () => toast.error("Please Enter a Todo");
  const successNotify = () => toast.success("New Todo Added!");

  const [todoInput, setTodoInput] = useState([]);
  const [todos, setTodos] = useState([]);
  const getTodos = () => {
    db.collection("todos").onSnapshot((snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (todoInput.length === 0) {
      return inputNotify();
    } else {
      db.collection("todos").add({
        inprogress: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: todoInput,
      });
      successNotify();
      setTodoInput([]);
    }
  };

  return (
    <Container>
      <Title>Add a Todo</Title>
      <Form onSubmit={(e) => e.preventDefault()}>
        <TextField
          onChange={(e) => setTodoInput(e.target.value)}
          value={todoInput}
          style={{
            borderTopRightRadius: "0px",
            borderTopLeftRadius: "12px",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "0px",
            outline: "none",
          }}
          required="true"
          placeholder="Add Todo"
        />
        <Button
          type="submit"
          style={{
            borderTopRightRadius: "12px",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "12px",
            borderBottom: "5px black solid",
          }}
          size="large"
          variant="contained"
          onClick={addTodo}
          color="primary"
        >
          ADD
        </Button>
      </Form>
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

      <div style={{ width: "90vw", maxWidth: "500px", marginTop: "24px" }}>
        {/* <Todos> */}
        {todos.map((todo) => (
          <TodoList
            key={todo.id}
            todo={todo.todo}
            inprogress={todo.inprogress}
            id={todo.id}
          />
        ))}
        {/* </Todos> */}
      </div>
    </Container>
  );
}

export default Todo;

const Container = styled.div``;
const Title = styled.h2``;
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextField = styled.input`
  width: 60%;
  padding: 12px;
  //   border: none;

  border: 0.5px solid;
  border-bottom: 7px solid;
  border-radius: 5px;
`;
// const TodoContainer = styled.div``;
// const Todos = styled.ul``;
// const TodoList = styled.p``;
