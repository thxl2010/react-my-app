import { DatePicker } from 'antd';
import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import VisibilityFilters from './components/VisibilityFilters';
import './styles.css';

function onChange(date, dateString) {
  console.log(date, dateString);
}

export default function TodoApp() {
  return (
    <div className="todo-app">
      <DatePicker onChange={onChange} />
      <h1>Todo List</h1>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}
