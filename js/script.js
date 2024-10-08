// document.addEventListener("DOMContentLoaded", function () {
//     // Загружаем задачи из localStorage при загрузке страницы
//     loadTasks();

//     // Добавление новой задачи
//     document.getElementById("addTaskBtn").addEventListener("click", function () {
//         const taskTitle = document.getElementById("taskTitle").value;
//         const taskDescription = document.getElementById("taskDescription").value;
//         const taskDate = document.getElementById("taskDate").value;
//         const taskTime = document.getElementById("taskTime").value;

//         if (taskTitle.trim() && taskDescription.trim() && taskDate && taskTime) {
//             const task = {
//                 id: Date.now(),
//                 title: taskTitle,
//                 description: taskDescription,
//                 date: taskDate,
//                 time: taskTime,
//                 status: "",
//                 completed: false
//             };

//             addTaskToDOM(task);
//             saveTaskToLocalStorage(task);

//             // Очищаем поля после добавления задачи
//             document.getElementById("taskTitle").value = "";
//             document.getElementById("taskDescription").value = "";
//             document.getElementById("taskDate").value = "";
//             document.getElementById("taskTime").value = "";
//         } else {
//             alert("Заполните все поля!");
//         }
//     });
// });

// function addTaskToDOM(task) {
//     const taskList = document.getElementById("task-list");

//     // Создаем элемент для новой задачи
//     const taskItem = document.createElement("div");
//     taskItem.className = "task-item";
//     taskItem.dataset.taskId = task.id;
//     taskItem.dataset.completed = task.completed;

//     // Заголовок задачи
//     const titleElement = document.createElement("div");
//     titleElement.className = "task-title";
//     titleElement.textContent = task.title;

//     // Описание задачи
//     const descriptionElement = document.createElement("div");
//     descriptionElement.className = "task-description";
//     descriptionElement.textContent = task.description;

//     // Дата и время задачи
//     const dateTimeElement = document.createElement("div");
//     dateTimeElement.className = "task-date-time";
//     dateTimeElement.textContent = `Дата: ${task.date}, Время: ${task.time}`;

//     // Элемент для пользовательского статуса
//     const statusElement = document.createElement("div");
//     statusElement.className = "task-status";
//     statusElement.textContent = `Статус: ${task.status || "Без статуса"}`;
//     statusElement.style.color = "darkred";

//     // Блок с иконками
//     const iconsElement = document.createElement("div");
//     iconsElement.className = "task-icons";

//     const completeIcon = document.createElement("i");
//     completeIcon.className = "fas fa-check";
//     completeIcon.addEventListener("click", function () {
//         taskItem.classList.toggle("completed");
//         task.completed = taskItem.classList.contains("completed");
//         updateTaskInLocalStorage(task);
//     });

//     const editIcon = document.createElement("i");
//     editIcon.className = "fas fa-pencil-alt";
//     editIcon.addEventListener("click", function () {
//         // Открываем редактирование задачи
//         openEditTaskFields(task, taskItem, titleElement, descriptionElement, dateTimeElement, statusElement);
//     });

//     const deleteIcon = document.createElement("i");
//     deleteIcon.className = "fas fa-trash";
//     deleteIcon.addEventListener("click", function () {
//         taskList.removeChild(taskItem);
//         removeTaskFromLocalStorage(task.id);
//     });

//     const statusIcon = document.createElement("i");
//     statusIcon.className = "fas fa-bars";
//     statusIcon.addEventListener("click", function () {
//         const newStatus = prompt("Введите новый статус задачи:", task.status);
//         if (newStatus !== null && newStatus.trim() !== "") {
//             task.status = newStatus;
//             statusElement.textContent = `Статус: ${newStatus}`;
//             updateTaskInLocalStorage(task);
//         }
//     });

//     // Добавляем иконки в блок иконок
//     iconsElement.appendChild(completeIcon);
//     iconsElement.appendChild(editIcon);
//     iconsElement.appendChild(deleteIcon);
//     iconsElement.appendChild(statusIcon);

//     // Добавляем элементы в блок задачи
//     taskItem.appendChild(titleElement);
//     taskItem.appendChild(descriptionElement);
//     taskItem.appendChild(dateTimeElement);
//     taskItem.appendChild(statusElement);
//     taskItem.appendChild(iconsElement);

//     // Добавляем новую задачу в список
//     taskList.appendChild(taskItem);
// }

// // Логика редактирования задачи
// function openEditTaskFields(task, taskItem, titleElement, descriptionElement, dateTimeElement, statusElement) {
//     // Открытие полей редактирования
//     const titleInput = document.createElement("input");
//     titleInput.type = "text";
//     titleInput.value = task.title;
//     titleElement.textContent = '';
//     titleElement.appendChild(titleInput);

//     const descriptionInput = document.createElement("textarea");
//     descriptionInput.value = task.description;
//     descriptionElement.textContent = '';
//     descriptionElement.appendChild(descriptionInput);

//     const dateInput = document.createElement("input");
//     dateInput.type = "date";
//     dateInput.value = task.date;
//     const timeInput = document.createElement("input");
//     timeInput.type = "time";
//     timeInput.value = task.time;
//     dateTimeElement.textContent = '';
//     dateTimeElement.appendChild(dateInput);
//     dateTimeElement.appendChild(timeInput);

//     const saveButton = document.createElement("button");
//     saveButton.textContent = "Сохранить";
//     taskItem.appendChild(saveButton);

//     saveButton.addEventListener("click", function () {
//         // Обновление значений задачи
//         task.title = titleInput.value;
//         task.description = descriptionInput.value;
//         task.date = dateInput.value;
//         task.time = timeInput.value;

//         // Сохраняем обновленные данные
//         titleElement.textContent = task.title;
//         descriptionElement.textContent = task.description;
//         dateTimeElement.textContent = `Дата: ${task.date}, Время: ${task.time}`;

//         // Удаляем кнопку сохранения
//         taskItem.removeChild(saveButton);

//         // Обновляем задачу в localStorage
//         updateTaskInLocalStorage(task);
//     });
// }

// // Сохранение задачи в localStorage
// function saveTaskToLocalStorage(task) {
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     tasks.push(task);
//     localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// // Обновление задачи в localStorage
// function updateTaskInLocalStorage(updatedTask) {
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
//     localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// // Удаление задачи из localStorage
// function removeTaskFromLocalStorage(taskId) {
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     tasks = tasks.filter(task => task.id !== taskId);
//     localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// // Загрузка задач из localStorage
// function loadTasks() {
//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     tasks.forEach(task => addTaskToDOM(task));
// }

document.addEventListener("DOMContentLoaded", function () {
    loadTasks();

    document.getElementById("addTaskBtn").addEventListener("click", function () {
        const taskTitle = document.getElementById("taskTitle").value;
        const taskDescription = document.getElementById("taskDescription").value;
        const taskDate = document.getElementById("taskDate").value;
        const taskTime = document.getElementById("taskTime").value;

        if (taskTitle.trim() && taskDescription.trim() && taskDate && taskTime) {
            const task = {
                id: Date.now(),
                title: taskTitle,
                description: taskDescription,
                date: taskDate,
                time: taskTime,
                status: "",
                completed: false
            };

            addTaskToDOM(task);
            saveTaskToLocalStorage(task);

            document.getElementById("taskTitle").value = "";
            document.getElementById("taskDescription").value = "";
            document.getElementById("taskDate").value = "";
            document.getElementById("taskTime").value = "";
        } else {
            alert("Заполните все поля!");
        }
    });
});

function addTaskToDOM(task) {
    const taskList = document.getElementById("task-list");

    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.dataset.taskId = task.id;
    taskItem.dataset.completed = task.completed;

    const titleElement = document.createElement("div");
    titleElement.className = "task-title";
    titleElement.textContent = task.title;

    const descriptionElement = document.createElement("div");
    descriptionElement.className = "task-description";
    descriptionElement.textContent = task.description;

    const dateTimeElement = document.createElement("div");
    dateTimeElement.className = "task-date-time";
    dateTimeElement.textContent = `Дата: ${task.date}, Время: ${task.time};`

    const statusElement = document.createElement("div");
    statusElement.className = "task-status";
    statusElement.textContent = `Статус: ${task.status || "Без статуса"}`;
    statusElement.style.color = "darkred";

    const iconsElement = document.createElement("div");
    iconsElement.className = "task-icons";

    const completeIcon = document.createElement("i");
    completeIcon.className = "fas fa-check";
    completeIcon.addEventListener("click", function () {
        taskItem.classList.toggle("completed");
        task.completed = taskItem.classList.contains("completed");
        updateTaskInLocalStorage(task);
    });

    const editIcon = document.createElement("i");
    editIcon.className = "fas fa-pencil-alt";
    editIcon.addEventListener("click", function () {
        openEditTaskFields(task, taskItem, titleElement, descriptionElement, dateTimeElement, statusElement);
    });

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash";
    deleteIcon.addEventListener("click", function () {
        taskList.removeChild(taskItem);
        removeTaskFromLocalStorage(task.id);
    });

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

function openEditTaskFields(task, taskItem, titleElement, descriptionElement, dateTimeElement, statusElement) {
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = task.title;
    titleElement.textContent = '';
    titleElement.appendChild(titleInput);

    const descriptionInput = document.createElement("textarea");
    descriptionInput.value = task.description;
    descriptionElement.textContent = '';
    descriptionElement.appendChild(descriptionInput);

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = task.date;
    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.value = task.time;
    dateTimeElement.textContent = '';
    dateTimeElement.appendChild(dateInput);
    dateTimeElement.appendChild(timeInput);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Сохранить";
    taskItem.appendChild(saveButton);

    saveButton.addEventListener("click", function () {
        task.title = titleInput.value;
        task.description = descriptionInput.value;
        task.date = dateInput.value;
        task.time = timeInput.value;

        titleElement.textContent = task.title;
        descriptionElement.textContent = task.description;
        dateTimeElement.textContent = `Дата: ${task.date}, Время: ${task.time}`;

        taskItem.removeChild(saveButton);

        updateTaskInLocalStorage(task);
    });
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskInLocalStorage(updatedTask) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}