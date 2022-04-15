import React from 'react'
import '../index.css'

export default function Todo({ todo, handleRemoveTodo, handleToggleComplete }) {
  return (
    <section style={{ backgroundColor: todo.completed ? '#bfbfbf' : '#909090' }} className="todo-item">
      <p style={{ color: '#505050', textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.name}</p>
      <div className="btn-div">
        <button onClick={() => handleToggleComplete(todo.id)} className={todo.completed ? 'clicked' : ''}>Check</button>
        <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
      </div>
    </section>
  );
}
