// SELECTORS
const todoInput = document.querySelector(".todo-input")
const todoBtn = document.querySelector(".todo-btn")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", fetchTodos)
todoBtn.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("change", filterTodo)

// FUNCTIONS
function addTodo(e) {
  // Prevent form from submitiing
  e.preventDefault()

  // Create todo div
  const todoDiv = document.createElement("div")
  todoDiv.classList.add("todo")

  // Create Li
  const newTodo = document.createElement("li")
  newTodo.innerText = todoInput.value
  newTodo.classList.add("todo-item")
  // Append newTodo to todo
  todoDiv.appendChild(newTodo)

  //Add newTodo to local storage
  saveLocalTodos(todoInput.value)

  // Check mark button
  const checkBtn = document.createElement("button")
  checkBtn.innerHTML = '<i class="fas fa-check"></i>'
  checkBtn.classList.add("check-btn")
  todoDiv.appendChild(checkBtn)
  // Trash button
  const TrashBtn = document.createElement("button")
  TrashBtn.innerHTML = '<i class="fas fa-trash"></i>'
  TrashBtn.classList.add("trash-btn")
  todoDiv.appendChild(TrashBtn)

  //Append todo div to todoList
  todoList.appendChild(todoDiv)

  // Clear todoInut value
  todoInput.value = ""
}

function deleteCheck(e) {
  const item = e.target
  //DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement
    //Animation
    todo.classList.add("fall")
    deleteTodosFromLocalStorage(todo)
    todo.addEventListener("transitionend", function () {
      todo.remove()
    })
  }

  //CHECK TODO
  if (item.classList[0] === "check-btn") {
    const todo = item.parentElement
    todo.classList.toggle("completed")
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex"
        break
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex"
        } else {
          todo.style.display = "none"
        }
        break
      case "todo":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex"
        } else {
          todo.style.display = "none"
        }
        break
    }
  })
}

function saveLocalTodos(todo) {
  // Check for pre data
  let todos
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }

  todos.push(todo)
  localStorage.setItem("todos", JSON.stringify(todos))
}

function fetchTodos() {
  let todos
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  todos.forEach(function (todo) {
    // Create todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    // Create Li
    const newTodo = document.createElement("li")
    newTodo.innerText = todo
    newTodo.classList.add("todo-item")
    // Append newTodo to todo
    todoDiv.appendChild(newTodo)

    // Check mark button
    const checkBtn = document.createElement("button")
    checkBtn.innerHTML = '<i class="fas fa-check"></i>'
    checkBtn.classList.add("check-btn")
    todoDiv.appendChild(checkBtn)
    // Trash button
    const TrashBtn = document.createElement("button")
    TrashBtn.innerHTML = '<i class="fas fa-trash"></i>'
    TrashBtn.classList.add("trash-btn")
    todoDiv.appendChild(TrashBtn)

    //Append todo div to todoList
    todoList.appendChild(todoDiv)
  })
}

function deleteTodosFromLocalStorage(todo) {
  let todos
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem("todos", JSON.stringify(todos))
}
