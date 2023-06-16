import React, { useState } from 'react'

export default function Todo ({
  todo,
  index,
  handleDelete,
  handleDone,
  handleEdit,
  handleOk
}) {
  return (
    <>
      <div className='w-full text-center flex items-center flex-col gap-5'>
        <div className='w-full bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md my-5'>
          <div>
            {todo.isDone === true ? (
              <div style={{ textDecorationLine: 'line-through' }}>
                {todo.todo}
              </div>
            ) : (
              <div>
                {todo.isEdit === true ? (
                  <div className='flex items-center mb-5  '>
                    <input type='text' className='mr-5 h-10 rounded-md w-2/3'/>
                    <button 
                    className='bg-white text-blue-600 px-5 py-2 font-medium rounded-md'
                    onClick={e => handleOk(e, index)}>ok </button>
                  </div>
                ) : (
                  <div className='flex justify-between items-center mb-5 '>
                    <li className='list-none w-full text-left break-normal my-3 mx-10 flex justify-center'>
                      {todo.todo}
                    </li>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='flex gap-5 justify-center mx-10'>
            
              <button
                className='bg-white text-blue-600 px-5 py-2 font-medium rounded-md'
                onClick={() => handleEdit(index)}
              >
                edit
              </button>
              <button
                className='bg-blue-600 text-white px-5 py-2 font-medium rounded-md'
                onClick={() => handleDone(index)}
              >
                done
              </button>
              <button
                className='bg-white text-blue-600 px-5 py-2 font-medium rounded-md'
                onClick={() => handleDelete(index)}
              >
                delete
              </button>
            
          </div>
        </div>
      </div>
    </>
  )
}
