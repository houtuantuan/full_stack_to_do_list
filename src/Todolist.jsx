import React from 'react'
import Todo from './Todo'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './input.css'
import {BASE_URL} from './tools/Constants'


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

      const { data } = await axios.post(`${BASE_URL}/todo/`, {
        todo: e.target.task.value
      })
      console.log(111)
      const newTodos = [...todos, data.data]
      setTodos(newTodos)
      e.target.task.value = ''
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async index => {
    try {
      // console.log(JSON.stringify(todos[index]))
      // console.log(todos[index]._id)
      const { data } = await axios.delete(
        `${BASE_URL}/${todos[index]._id}`
      )
      setTodos(data)
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
      await axios.put(`${BASE_URL}/todo/done/${todos[index]._id}`)

      newTodos[index].isDone = true
      setTodos(newTodos)
      console.log(newTodos)
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
      await axios.put(`${BASE_URL}/todo/${todos[index]._id}`, {
        todo: event.target.previousElementSibling.value
      })
      console.log(todos[index]._id)
      //   newTodos[index] = {
      //     ...newTodos[index],
      //     isEdit: false,
      //     todo:event.target.previousElementSibling.value
      //  }

      newTodos[index].isEdit = false
      newTodos[index].todo = event.target.previousElementSibling.value

      setTodos(newTodos)
      console.log(todos)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-screen flex justify-center items-center flex-col gap-8'>
      <div className='flex justify-center items-center gap-6'>
        <form onSubmit={handleSubmit}>
          <label 
          className='text-blue-600 uppercase font-semibold text-2xl my-10 py-11'
          htmlFor='inputtask'></label>
          <br />
          <input
            className='w-72 border-2  mx-10 rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg'
            type='text'
            name='task'
            id='inputtask'
            placeholder='Enter your tasks'
          />
          <button 
          
          className='h-full px-5 py-2 mx-10 bg-[#0264F6] text-white font-medium rounded-md'>
            Submit
          </button>
        </form>
        
      </div>
      <h1 className='text-blue-600 uppercase font-semibold text-2xl'>
          Task List
        </h1>
      <div style={{width:"50%"}}>
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
