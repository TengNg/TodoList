import React, { useReducer, useRef, useEffect } from 'react'
import './index.css';
import TodoList from './components/TodoList.js'
import Alert from './components/Alert.js'

const LOCAL_STORAGE_KEY = "todoApp.localTodos";

const ACTIONS = Object.freeze({
  ADD_TODO: "add-todo",
  REMOVE_TODO: "remove-todo",
  TOGGLE_TODO: "toggle-todo",
  REMOVE_COMPLETED_TODOS: "remove-completed-todos",
  GET_LOCAL_TODOS: "get-local-todos",
  NO_INPUT_VALUE: "no-input-value",
  CLOSE_ALERT: "close-alert"
});

const initialState = {
  todos: [],
  isAlertOpen: false,
  alertContent: ''
};

function init() {
  const localTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || initialState;
  return localTodos;
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.GET_LOCAL_TODOS:
      return init();
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        isAlertOpen: true,
        alertContent: 'Todo added',
        todos: [...state.todos, { id: Date.now(), name: action.payload.inputName, completed: false }]
      };
    case ACTIONS.REMOVE_TODO:
      return {
        ...state,
        isAlertOpen: true,
        alertContent: 'Todo removed',
        todos: state.todos.filter(todo => todo.id != action.payload.todoId)
      };
    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => todo.id == action.payload.todoId ? { ...todo, completed: !todo.completed } : todo)
      }
    case ACTIONS.REMOVE_COMPLETED_TODOS:
      return {
        ...state,
        isAlertOpen: true,
        alertContent: 'Remove completed todos',
        todos: state.todos.filter(todo => todo.completed === false)
      };
    case ACTIONS.NO_INPUT_VALUE:
      return {
        ...state,
        isAlertOpen: true,
        alertContent: 'Please enter value'
      }
    case ACTIONS.CLOSE_ALERT:
      return {
        ...state,
        isAlertOpen: false
      }
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const { todos, isAlertOpen, alertContent } = state;

  const inputEl = useRef(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state])

  useEffect(() => {
    dispatch({ type: ACTIONS.GET_LOCAL_TODOS });
  }, [])

  function getNumberOfCompletedTodos() {
    return todos.filter(todo => todo.completed).length;
  }

  function handleAddTodo(e) {
    e.preventDefault();
    if (inputEl.current.value === "") {
      dispatch({ type: ACTIONS.NO_INPUT_VALUE });
      return;
    }
    dispatch({ type: ACTIONS.ADD_TODO, payload: { inputName: inputEl.current.value } });
    inputEl.current.value = "";
  }

  function handleRemoveCompletedTodos(e) {
    e.preventDefault();
    if (getNumberOfCompletedTodos() === 0)
      return;
    dispatch({ type: ACTIONS.REMOVE_COMPLETED_TODOS });
  }

  function handleRemoveTodo(id) {
    dispatch({ type: ACTIONS.REMOVE_TODO, payload: { todoId: id } });
  }
  
  function handleToggleComplete(id) {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { todoId: id } });
  }

  function closeAlert() {
    dispatch({ type: ACTIONS.CLOSE_ALERT });
  }

  return (
    <>
      <div className="main">
        <h2>TODO LIST</h2>
        {/* {isAlertOpen && (<Alert closeAlert={closeAlert} alertContent={alertContent}/>)} */}
        <Alert closeAlert={closeAlert} isAlertOpen={isAlertOpen} alertContent={alertContent} />
        <form className="input-section">
          <input ref={inputEl} type='text' />
          <button onClick={handleAddTodo} type='submit' >+</button>
          <button onClick={handleRemoveCompletedTodos}>-</button>
        </form>
      </div>
      <TodoList
        todos={todos}
        handleRemoveTodo={handleRemoveTodo}
        handleToggleComplete={handleToggleComplete}
      />
      <p style={{ marginTop: '1rem' }}>Todo count: {todos.length - getNumberOfCompletedTodos()}</p>
      <div className='textbox'>
        <p>Press [+] button to add todo</p>
        <p>Press [--] button to remove all completed todos</p>
      </div>
    </>
  );
}

export default App;
