import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoItem from './components/TodoItem/TodoItem';
import { useState } from 'react';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem('todos');
    items && setTodos(JSON.parse(items));
  }, [])

  const addTodo = () => {
    const createTodo = {
      name:newTodo,
      isActive:true,
      id:todos.length+1
    }
    const newTodos = [...todos, createTodo];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setNewTodo('')
  };

  const removeTodo = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos)
  };

  const doneTodo = id => {
    const newTodos = todos.map(todo => {
      if(todo.id === id){
        todo.isActive = false;
      }
      return todo
    });
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos)
  }

  return (
       <div className="col-md-4 mx-auto px-2">
        <div className="todo justify-content-center mt-5">
          <div class="input-group mb-2 mr-sm-2">
            <input type="text" name="todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}
              className="form-control" />
            <div class="input-group-append">
              <button className="btn btn-secondary" onClick={addTodo}>Add todo</button>
            </div>
          </div>
        </div>
        <div className="todo-container mt-4">
          <ul className="list-group">
            {
              todos.map(todo => <TodoItem todo={todo} removeTodo={removeTodo} doneTodo={doneTodo}></TodoItem>)
            }
          </ul>
      </div>
      </div>
  );
}

export default App;
