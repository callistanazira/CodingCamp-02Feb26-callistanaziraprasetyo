const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addButton = document.getElementById("addButton");
const filterBtn = document.getElementById("filterBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const todoBody = document.getElementById("todoBody");
const alertBox = document.getElementById("alertBox");
const alertMessage = document.getElementById("alertMessage");

let todos = [];

// ADD
addButton.addEventListener("click", () => {
    const task = taskInput.value.trim();
    const date = dateInput.value;

    if (!task || !date) {
        showAlert("Input tidak boleh kosong");
        return;
    }

    todos.push({ task, date, status: "Pending" });
    render();
    taskInput.value = "";
    dateInput.value = "";
});

// ALERT
function showAlert(message){
    alertMessage.textContent = message;
    alertBox.classList.remove("hidden");
}

function closeAlert(){
    alertBox.classList.add("hidden");
}

// RENDER
function render(data = todos) {
    todoBody.innerHTML = "";

    if (data.length === 0) {
        todoBody.innerHTML = `
            <tr class="empty">
                <td colspan="4">No task found</td>
            </tr>
        `;
        return;
    }

    data.forEach((todo, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${todo.task}</td>
            <td>${todo.date}</td>
            <td>${todo.status}</td>
            <td>
                <button onclick="deleteTodo(${index})">Delete</button>
            </td>
        `;
        todoBody.appendChild(row);
    });
}

// DELETE ONE
function deleteTodo(index) {
    todos.splice(index, 1);
    render();
}

// FILTER (simple: today)
filterBtn.addEventListener("click", () => {
    const today = new Date().toISOString().split("T")[0];
    const filtered = todos.filter(t => t.date === today);
    render(filtered);
});

// DELETE ALL
deleteAllBtn.addEventListener("click", () => {
    todos = [];
    render();
});