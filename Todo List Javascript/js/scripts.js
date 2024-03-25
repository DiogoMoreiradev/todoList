// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#addTask");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-todo");
const editInput = document.querySelector("#edit-input");
const CancelEditBtn = document.querySelector("#cancel-edit-btn");
const todo = document.getElementsByClassName("todo");

let oldInputValue;

// Funções

//desenhando o elemento dentro do html
const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.id = "todo-id";
  const todoTitle = document.createElement("h4");
  todoTitle.classList.add("title");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);
  const btnFinish = document.createElement("button");
  btnFinish.innerHTML = `<svg class="finish-todo" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
    <path class="finish-todo" d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
  </svg>`;
  btnFinish.classList.add("finish-todo");

  const btnEdit = document.createElement("button");
  btnEdit.innerHTML = `<svg class="edit-todo" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path class="edit-todo" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
  </svg>`;
  btnEdit.classList.add("edit-todo");

  const btnDelete = document.createElement("button");
  btnDelete.innerHTML = `<svg class="remove-todo"xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path class="remove-todo" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
  </svg>`;
  btnDelete.classList.add("remove-todo");

  todo.appendChild(btnFinish);
  todo.appendChild(btnEdit);
  todo.appendChild(btnDelete);
  todoList.appendChild(todo);
};

// Abrir|Fechar o formulario de edição
const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};
const searchTodo = () => {
  let input = document.getElementById("search-input").value;
  const todo = document.querySelectorAll("#todo-id");
  for (i = 0; i < todo.length; i++) {
    if (!todo[i].innerText.toLowerCase().includes(input)) {
      todo[i].style.display = "none";
    } else {
      todo[i].style.display = "flex";
    }
  }
};

const filterTodo = () => {
  const select = document.getElementById("fill-select").value;

  if (select === "done") {
    const todoList = document.querySelectorAll("#todo-id");
    for (var i = 0; i < todoList.length; i++) {
      if (!todoList[i].classList.contains("done")) {
        todoList[i].style.display = "none";
      }
    }
  }
  if (select === "all") {
    const todoList = document.querySelectorAll("#todo-id");
    for (var i = 0; i < todoList.length; i++) {
      todoList[i].style.display = "flex";
    }
  }
};

// passando o texto editado
const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h4");
    todo = todoTitle;
    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
};

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = todoInput.value;
  if (inputValue) {
    saveTodo(inputValue);
    todoInput.value = "";
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;
  if (parentEl && parentEl.querySelector("h4")) {
    todoTitle = parentEl.querySelector("h4").innerText;
  }
  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
  }
  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove();
  }
  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

CancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editedValue = editInput.value;
  if (editedValue) {
    updateTodo(editedValue);
  }

  toggleForms();
});
