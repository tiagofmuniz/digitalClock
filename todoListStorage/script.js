const button = document.querySelector(".button-add-task");
const input = document.querySelector(".input-task");
const completeList = document.querySelector(".list-tasks");

let myTaskList = [];

function addNewTask() {
  myTaskList.push({
    task: input.value,
    completed: false,
  });

  input.value = "";

  showTasks();
}

function showTasks() {
  let newLi = "";

  myTaskList.forEach((item, position) => {
    newLi =
      newLi +
      `
        <li class="task ${item.completed && "done"}">
            <img src="./img/checked.png" alt="check-in-task" onclick="completeTask(${position})">
            <p>${item.task}</p>
            <img src="./img/trash.png" alt="task-to-trash" onclick="deleteItem(${position})">
        </li>
      `;
  });

  completeList.innerHTML = newLi;

  localStorage.setItem("taskList", JSON.stringify(myTaskList));
}

function completeTask(position) {
  myTaskList[position].completed = !myTaskList[position].completed;

  showTasks();
}

function deleteItem(position) {
  myTaskList.splice(position, 1);

  showTasks();
}

function reloadTasks() {
  const tasksFromLocalStorage = localStorage.getItem("taskList");

  if (tasksFromLocalStorage) {
    myTaskList = JSON.parse(tasksFromLocalStorage);
  }

  showTasks();
}

reloadTasks();

button.addEventListener("click", addNewTask);
