import react from "react";
import { useEffect, useState } from "react";
import Todos from "./Todo";
import Todolist from "./Todolist";

function App() {
  const [todos, setTodos] = useState(null);

  const fetchData = async () => {
    try {console.log(1111)
      const getTodos = await fetch('http://localhost:5000/todo');
      if (!getTodos) throw new Error(`Request failes with a status of ${getTodos.status}`);
      const parseData = await getTodos.json();
      setTodos(parseData.todos);
      
      console.log(parseData)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <>
    <Todolist todos={todos} setTodos={setTodos}/>
    
    </>
  );
}

export default App;
