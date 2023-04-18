import React from 'react'
import Todo from './Todo'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Todolist ({ todos, setTodos }) {
  //   const [todos, setTodos] = useState([{ content: "buy toilet paper", isDone: false,isEdit:false }]);
  //   function onSubmit (event) {
  //     event.preventDefault()
  //     const newTodos = [...todos, { todo: event.target.task.value }]
  //     setTodos(newTodos)
  //     event.target.task.value = ''
  //   }
  const handleSubmit = async e => {
    try {
      e.preventDefault()

      const { data } = await axios.post('http://localhost:5000/todo/', {
        todo: e.target.task.value
      })
      console.log(111)
      const newTodos = [...todos, { todo: e.target.task.value }]
      setTodos(newTodos)
      e.target.task.value = ''
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async index => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/todo/${todos[index]._id}`
      )
      setTodos(data)
      console.log(2222)
    } catch (e) {
      console.log(e)
    }
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  const handleDone = async index => {
    const newTodos = [...todos]
    try {
      await axios.put(`http://localhost:5000/todo/done/${todos[index]._id}`)

      newTodos[index].isDone = true
      setTodos(newTodos)
    } catch (error) {
      console.log(error)
    }
  }

  function handleEdit (index) {
    const newTodos = [...todos]
    newTodos[index].isEdit = true
    setTodos(newTodos)
  }

  const handleOk = async (event, index) => {
    const newTodos = [...todos]
    try {
      await axios.put(`http://localhost:5000/todo/${todos[index]._id}`, {
        todo: event.target.previousElementSibling.value
      })
      newTodos[index] = { 
        isEdit: false,
        todo:event.target.previousElementSibling.value
     }

      setTodos(newTodos)
    } catch (error) {
      console.log(error)
    }
    console.log(event.target.previousElementSibling.value)

    console.log(newTodos[index])
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='inputtask'>Your Tasks</label>
        <br />
        <input type='text' name='task' id='inputtask' />
        <button>Submit</button>
      </form>
      <div>
        {todos &&
          todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              handleDelete={handleDelete}
              handleDone={handleDone}
              handleEdit={handleEdit}
              handleOk={handleOk}
            />
          ))}
      </div>
    </div>
  )
}
