console.log("Hello World");

// ✅ Validasi input (todo & date)
function validateDateInput(todo, date) {
  if (todo.trim() === "" || date === "") {
    alert("Please enter a todo item and a date!");
    return false;
  }
  return true;
}

// ✅ Format tanggal ke DD/MM/YYYY
function formatDateToDDMMYYYY(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// ✅ Tambah todo dari form
function addTodo() {
  const todoInput = document.getElementById('todo-input');
  const dateInput = document.getElementById('todo-date');
  const todoText = todoInput.value;
  const dueDate = dateInput.value;

  if (!validateDateInput(todoText, dueDate)) return;

  addTodoItem(todoText, dueDate);

  // Kosongkan input setelah menambah
  todoInput.value = "";
  dateInput.value = "";
}

// ✅ Tambah todo ke daftar
function addTodoItem(todoText, dueDate) {
  const todoList = document.getElementById('todo-list');
}