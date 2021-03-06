import React, { Fragment, useState, useRef, useEffect } from "react";
import { ToDoList, numItems as totalItemsAlias } from "./Components/ToDoList";
import { v4 as uuidV4 } from "uuid";
import * as allToDo from "./Components/ToDoList";
import Expenses from "./Components/Expenses/Expenses";
import NewExpense from "./Components/Expenses/NewExpense/NewExpense";

const KEY = "todoApp.todos";

const dummyExpenses = [
  {
    id: "e1",
    title: "Car Insurance",
    amount: 435.23,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e2",
    title: "Car Insurance2",
    amount: 2115.23,
    date: new Date(2021, 4, 3),
  },
  {
    id: "e3",
    title: "Car Insurance3",
    amount: 777.23,
    date: new Date(2021, 1, 4),
  },
];

///////////////////////////////////
// IMPERATIVE AND DECLARATIVE
// CONTROLED COMPONENT
// STATE LESS  COMPONENTES SIN ESTADO
// STATE FULL  COMPONENTES CON ESTADO
////////////////////////////////////////7

const App = () => {
  const [expenses, setExpenses] = useState(dummyExpenses);

  const [todos, setTodos] = useState([
    { id: 1, task: "tarea 1", completed: true },
  ]);

  // let is used to define a variable
  //   this is a constant variable
  const todoTaskRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  // the arrow funtions resolve the promes for "This" context
  //   This is an Arrow fucntion ES6
  const toggleTodo = (id) => {
    // Spred operator ... copy all the elements in an old array
    // Spred operator works at same for Objects and for Arrays
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  // Array functions , in the follow example is returned a real new array after multiplicate each number of the old array by 2
  //   map()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  // find()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  // findIndex()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  // filter()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  // reduce()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=b
  // concat()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat?v=b
  // slice()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  // splice()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
  const numbers = [1, 2, 3];
  const doubleNumbers = numbers.map((num) => num * 2);


  const handleToAdd = () => {
    const task = todoTaskRef.current.value;

    if (task === "") return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidV4(), task, completed: false }];
    });

    todoTaskRef.current.value = null;
  };

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const addExpenseHandler = (expense) => {
    setExpenses(prevExpenses => {
      return [...prevExpenses,expense];
    });
  };

  return (
    <Fragment>
      <ToDoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
      <button onClick={handleToAdd}>add</button>
      <button onClick={handleClearAll}>delete</button>

      <div>
        te quedan {todos.filter((todo) => !todo.completed).length} tareas por
        terminar
      </div>

      <div>Total of imported items : {totalItemsAlias}</div>
      <div>Variable imported with * option : {allToDo.numTwo}</div>

      <NewExpense onAddExpense={addExpenseHandler} />

      <Expenses  items={expenses} />
    </Fragment>
  );
};

export default App;
