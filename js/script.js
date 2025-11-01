function validateDateInput(todo, date) {
  if (todo.trim() === "" || date === "") {
    alert("Please enter a todo item and a date!");
    return false;
  }
  return true;
}

function formatDateToDDMMYYYY(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const dateInput = document.getElementById("todo-date");
  const todoText = todoInput.value;
  const dueDate = dateInput.value;

  if (!validateDateInput(todoText, dueDate)) return;

  const todoList = document.getElementById("todo-list");
  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-gray-50 border p-2 rounded";

  const label = document.createElement("span");
  label.textContent = `${todoText} (Due: ${formatDateToDDMMYYYY(dueDate)})`;
  label.className = "flex-1";

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✓";
  doneBtn.className = "bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600";
  doneBtn.onclick = () => {
    li.classList.toggle("line-through");
    li.dataset.completed = li.dataset.completed === "true" ? "false" : "true";
  };

  const delBtn = document.createElement("button");
  delBtn.textContent = "✕";
  delBtn.className = "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600";
  delBtn.onclick = () => li.remove();

  li.append(label, doneBtn, delBtn);
  li.dataset.completed = "false";
  todoList.appendChild(li);

  todoInput.value = "";
  dateInput.value = "";
}

document.getElementById("clear-todos-btn").onclick = () => {
  const todoList = document.getElementById("todo-list");
  if (todoList.children.length === 0) return alert("No todos to clear!");
  if (confirm("Are you sure you want to clear all todos?")) {
    todoList.innerHTML = "";
  }
};

document.getElementById("filter-todos").onchange = (e) => {
  const filter = e.target.value;
  const todos = document.querySelectorAll("#todo-list li");
  todos.forEach(todo => {
    switch (filter) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.style.display = todo.dataset.completed === "true" ? "flex" : "none";
        break;
      case "uncompleted":
        todo.style.display = todo.dataset.completed === "false" ? "flex" : "none";
        break;
    }
  });
};
