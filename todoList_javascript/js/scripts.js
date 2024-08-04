"use strict";

// Variaveis
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const editForm = document.getElementById("edit-form");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const todo = document.getElementById("todo");
const finishBtn = document.querySelector(".finish-todo");
const toolbar = document.getElementById("toolbar");
const editInput = document.getElementById("edit-input");
const searchInput = document.getElementById("search-input");
const eraseBtn = document.getElementById("erase-btn");
const filterBtn = document.getElementById("filter-select");

let oldInputValue;

// Funções
const addTodo = (text, done = 0, save = 1) => {
  const todoList = document.createElement("div");
  todoList.classList.add("todo-list");

  const todoTitle = document.createElement("h3");
  todoTitle.textContent = text;
  todoList.appendChild(todoTitle);

  const finishTodo = document.createElement("button");
  finishTodo.classList.add("finish-todo");
  finishTodo.innerHTML = `<i class="fa-solid fa-check"></i>`;
  todoList.appendChild(finishTodo);

  const editTodo = document.createElement("button");
  editTodo.classList.add("edit-todo");
  editTodo.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  todoList.appendChild(editTodo);

  const removeTodo = document.createElement("button");
  removeTodo.classList.add("remove-todo");
  removeTodo.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  todoList.appendChild(removeTodo);

  todo.appendChild(todoList);

  // LocalStorage
  if (done) {
    todoList.classList.add("done");
  }
  if (save) {
    saveTodoLocalStorage({ text, done });
  }
};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todo.classList.toggle("hide");
  toolbar.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo-list");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      updateTodoLocalStorage(todoTitle.innerText);
    }
  });
};

const getSearchTodos = (search) => {
  const todos = document.querySelectorAll(".todo-list");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    let normalizeSearch = search.toLowerCase();

    todo.style.display = "flex";

    if (!todoTitle.includes(normalizeSearch)) {
      todo.style.display = "none";
    }
  });
};

const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll(".todo-list");
  switch (filterValue) {
    case "all":
      todos.forEach((todo) => {
        todo.style.display = "flex";
      });
      break;
    case "done":
      todos.forEach((todo) => {
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
      });
      break;
    case "todo":
      todos.forEach((todo) => {
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
      });
      break;

    default:
      break;
  }
};

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value;
  todoInput.value = "";
  todoInput.focus();

  if (text == "") {
    return;
  }

  addTodo(text);
});

document.addEventListener("click", (e) => {
  const myTarget = e.target;
  const parentEl = myTarget.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (myTarget.classList.contains("finish-todo")) {
    todoTitle = parentEl.querySelector("h3").innerText;
    parentEl.classList.toggle("done");

    updateTodoLocalStorageStatus(todoTitle);
  }
  if (myTarget.classList.contains("remove-todo")) {
    parentEl.remove();
    let todoRemoved = parentEl.querySelector("h3").innerText;

    removeTodoLocalStorage(todoRemoved);
  }
  if (myTarget.classList.contains("edit-todo")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todo.classList.toggle("hide");
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let editedInputValue = editInput.value;

  if (editedInputValue) {
    updateTodo(editedInputValue);
  }

  toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
  let search = e.target.value;

  getSearchTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";

  searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
  let filteredValue = e.target.value;

  filterTodos(filteredValue);
});

// Salvando dados no LocalStorage
const getTodoLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  return todos;
};

const saveTodoLocalStorage = (todo) => {
  const todos = getTodoLocalStorage();

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodos = () => {
  const todos = getTodoLocalStorage();

  todos.forEach((todo) => {
    addTodo(todo.text, todo.done, 0);
  });
};

const removeTodoLocalStorage = (todoText) => {
  const todos = getTodoLocalStorage();

  const filteredTodos = todos.filter((todo) => todo.text !== todoText);

  localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

loadTodos();

const updateTodoLocalStorageStatus = (todoText) => {
  const todos = getTodoLocalStorage();

  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (text) => {
  const todos = getTodoLocalStorage();

  todos.map((todo) => (todo.text !== text ? (todo.text = text) : null));

  localStorage.setItem("todos", JSON.stringify(todos));
};
