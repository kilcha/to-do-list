document.addEventListener("DOMContentLoaded", function () {
    loadTasks();  // Загружаем задачи из localStorage при загрузке страницы

    // Добавление новой задачи
    document.getElementById("addTaskBtn").addEventListener("click", function () {
        const taskTitle = document.getElementById("taskTitle").value;
        const taskDescription = document.getElementById("taskDescription").value;
        const taskDate = document.getElementById("taskDate").value;
        const taskTime = document.getElementById("taskTime").value;

        if (taskTitle.trim() && taskDescription.trim() && taskDate && taskTime) {
            const task = {
                id: getNextTaskId(),
                title: taskTitle,
                description: taskDescription,
                date: taskDate,
                time: taskTime,
                status: "",
                completed: false,
                edited: false
            };

            addTaskToDOM(task);
            saveTaskToLocalStorage(task);

            // Очищаем поля после добавления задачи
            document.getElementById("taskTitle").value = "";
            document.getElementById("taskDescription").value = "";
            document.getElementById("taskDate").value = "";
            document.getElementById("taskTime").value = "";
        } else {
            alert("Заполните все поля!");
        }
    });
});

// Получение следующего ID для задачи
function getNextTaskId() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

// Добавление задачи в DOM
function addTaskToDOM(task) {
    const taskList = document.getElementById("task-list");

    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.dataset.taskId = task.id;

    // Заголовок задачи
    const titleElement = document.createElement("div");
    titleElement.className = "task-title";
    titleElement.textContent = task.title;

    // Описание задачи
    const descriptionElement = document.createElement("div");
    descriptionElement.className = "task-description";
    descriptionElement.textContent = task.description;

    // Дата и время задачи
    const dateTimeElement = document.createElement("div");
    dateTimeElement.className = "task-date-time";
    dateTimeElement.textContent = `Дата: ${task.date}, Время: ${task.time}`;

    // Статус задачи
    const statusElement = document.createElement("div");
    statusElement.className = "task-status";
    statusElement.textContent = `Статус: ${task.status || "Без статуса"}`;

    // Блок иконок для редактирования, завершения, удаления и изменения статуса
    const iconsElement = document.createElement("div");
    iconsElement.className = "task-icons";

    // Иконка завершения задачи
    const completeIcon = document.createElement("i");
    completeIcon.className = "fas fa-check";
    completeIcon.addEventListener("click", function () {
        task.completed = !task.completed;
        if (task.completed) {
            titleElement.style.textDecoration = "line-through";
            descriptionElement.style.textDecoration = "line-through";
        } else {
            titleElement.style.textDecoration = "none";
            descriptionElement.style.textDecoration = "none";
        }
        updateTaskInLocalStorage(task);
    });

    // Иконка редактирования задачи
    const editIcon = document.createElement("i");
    editIcon.className = "fas fa-pencil-alt";
    editIcon.addEventListener("click", function () {
        editTask(task, titleElement, descriptionElement, dateTimeElement, statusElement, taskItem);
    });

    // Иконка удаления задачи
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash";
    deleteIcon.addEventListener("click", function () {
        taskList.removeChild(taskItem);
        removeTaskFromLocalStorage(task.id);
        reorderTasks();
    });

    // Иконка изменения статуса задачи
    const statusIcon = document.createElement("i");
    statusIcon.className = "fas fa-bars";
    statusIcon.addEventListener("click", function () {
        const newStatus = prompt("Введите новый статус задачи:", task.status);
        if (newStatus !== null && newStatus.trim() !== "") {
            task.status = newStatus;
            statusElement.textContent = `Статус: ${newStatus}`;
            updateTaskInLocalStorage(task);
        }
    });

    iconsElement.appendChild(completeIcon);
    iconsElement.appendChild(editIcon);
    iconsElement.appendChild(deleteIcon);
    iconsElement.appendChild(statusIcon);

    taskItem.appendChild(titleElement);
    taskItem.appendChild(descriptionElement);
    taskItem.appendChild(dateTimeElement);
    taskItem.appendChild(statusElement);
    taskItem.appendChild(iconsElement);

    taskList.appendChild(taskItem);
}

// Редактирование задачи
function editTask(task, titleElement, descriptionElement, dateTimeElement, statusElement, taskItem) {
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = task.title;

    const descriptionInput = document.createElement("textarea");
    descriptionInput.value = task.description;

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = task.date;

    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.value = task.time;

    titleElement.textContent = '';
    titleElement.appendChild(titleInput);

    descriptionElement.textContent = '';
    descriptionElement.appendChild(descriptionInput);

    dateTimeElement.textContent = '';
    dateTimeElement.appendChild(dateInput);
    dateTimeElement.appendChild(timeInput);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Сохранить";
    taskItem.appendChild(saveButton);

    saveButton.addEventListener("click", function () {
        task.edited = true;
        task.title = titleInput.value;
        task.description = descriptionInput.value;
        task.date = dateInput.value;
        task.time = timeInput.value;

        titleElement.textContent = task.title;
        descriptionElement.textContent = task.description;
        dateTimeElement.textContent = `Дата: ${task.date}, Время: ${task.time}`;

        updateTaskInLocalStorage(task);
        taskItem.removeChild(saveButton);
    });
}

// Сохранение задачи в localStorage
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Обновление задачи в localStorage
function updateTaskInLocalStorage(updatedTask) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Удаление задачи из localStorage
function removeTaskFromLocalStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Пересчет ID задач после удаления
function reorderTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
        task.id = index + 1;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("task-list").innerHTML = "";
    tasks.forEach(task => addTaskToDOM(task));
}

//Фильтрация задач

// Загрузка задач из localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}
