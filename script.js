const taskInput = document.getElementById("task");
const dateInput = document.getElementById("date");
const addBtn = document.getElementById("add");
const clearBtn = document.getElementById("clear");
const filterBtn = document.getElementById("filter");
const list = document.getElementById("list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filterMode = "all";

function render() {
  list.innerHTML = "";
  let filtered = todos;

  if (filterMode === "done") filtered = todos.filter(t => t.done);
  else if (filterMode === "pending") filtered = todos.filter(t => !t.done);

  if (filtered.length === 0) {
    list.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
    return;
  }

  filtered.forEach((t, i) => {
    const row = `
      <tr>
        <td>${t.text}</td>
        <td>${t.date || "-"}</td>
        <td>${t.done ? "✅ Done" : "⏳ Pending"}</td>
        <td>
          <button class="action" onclick="toggle(${i})">Toggle</button>
          <button class="action" onclick="removeTask(${i})">Delete</button>
        </td>
      </tr>`;
    list.insertAdjacentHTML("beforeend", row);
  });
}

function add() {
  const text = taskInput.value.trim();
  const date = dateInput.value;

  if (!text) {
    alert("Please enter a task!");
    return;
  }

  todos.push({ text, date, done: false });
  localStorage.setItem("todos", JSON.stringify(todos));
  taskInput.value = "";
  dateInput.value = "";
  render();
}

function toggle(i) {
  todos[i].done = !todos[i].done;
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

function removeTask(i) {
  todos.splice(i, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

function clearAll() {
  if (confirm("Delete all tasks?")) {
    todos = [];
    localStorage.removeItem("todos");
    render();
  }
}

function filterTasks() {
  if (filterMode === "all") filterMode = "pending";
  else if (filterMode === "pending") filterMode = "done";
  else filterMode = "all";

  filterBtn.textContent = `FILTER (${filterMode.toUpperCase()})`;
  render();
}

addBtn.onclick = add;
clearBtn.onclick = clearAll;
filterBtn.onclick = filterTasks;
render();
