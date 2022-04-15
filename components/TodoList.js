import React from 'react'
import Todo from './Todo.js'

export default function TodoList({ todos, handleRemoveTodo, handleToggleComplete }) {
  return (
    <div className="todo-list">
      {todos.map(todo => {
        return <Todo
          key={todo.id}
          todo={todo}
          handleRemoveTodo={handleRemoveTodo}
          handleToggleComplete={handleToggleComplete}
        />
      })}
    </div>
  );
}
