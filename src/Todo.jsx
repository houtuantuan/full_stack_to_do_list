import React, { useState } from 'react'


export default function Todo({ todo, index, handleDelete, handleDone, handleEdit,handleOk }) {

    return (

        <>
            <div>{todo.isDone === true ?
                (<div style={{ textDecorationLine: "line-through" }}>{todo.todo}</div>)
                : (<div>{
                    todo.isEdit === true ? (
                        <div>
                            <input type="text" />
                            <button onClick={(e)=>handleOk(e,index)}>ok </button>
                        </div>

                    ) : (<div>{todo.todo}</div>)
                }</div>)
            }
            </div>

            <div>
                <button onClick={() => handleEdit(index)}>
                    edit</button>
                <button onClick={() => handleDone(index)}>
                    done</button>
                <button onClick={() => handleDelete(index)}>delete</button>
            </div>
        </>
    )
}
