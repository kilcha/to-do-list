// //Получаем элементы
// const taskInput = document.getElementById('task-input');
// const addTaskBtn = document.getElementById('add-task-btn');
// const taskList = document.getElementById('task-list');

// //Обработчик нажатия на кнопку "Добавить"
// addTaskBtn.addEventListener('click', addTask);

// function addTaskVisible() {
//     const taskList = document.getElementById("task-list");
//     if (taskList.children.length === 0) {
//         taskList.style.display = "none";
//     } else {
//         taskList.style.display = "block";
//     }
// }


// //Функция для добавления задач
// function addTask() {
//     const taskText = taskInput.value.trim();
//     if (taskText === '') return; //Если текст пустой, то ничего не делаем

//     //Создаем элемент задачи
//     const taskItem = document.createElement('div')
//     taskItem.classList.add('task-item');

//     //Текст задачи
//     const taskContent = document.createElement('span')
//     taskContent.textContent = taskText;

//     //Блок с кнопками
//     const taskButtons = document.createElement('div');
//     taskButtons.classList.add('task-buttons')

//     //Кнопка "Удалить"
//     const deleteBtn = document.createElement('button');
//     deleteBtn.innerHTML = '&#10060'; //Значок крестика
//     deleteBtn.addEventListener('click', () => taskItem.remove());

//     //Кнопка "Завершить"
//     const completeBtn = document.createElement('button');
//     completeBtn.innerHTML = '&#10003'; //Значок галочки
//     completeBtn.addEventListener('click', () => {
//         taskContent.classList.toggle('task-completed');
//     });

//     //Кнопка "Пользовательский статус"
//     const statusBtn = document.createElement('button');
//     statusBtn.innerHTML = '&#9776'; //Значок трех линии
//     statusBtn.addEventListener('click', () => {
//         const statusInput = document.createElement('input');
//         statusInput.type = 'text';
//         statusInput.placeholder = 'Введите статус...';
//         statusInput.classList.add('status-input');
//         taskItem.appendChild(statusInput);
//         statusInput.addEventListener('blur', () => {
//             const statusText = document.createElement('div');
//             statusText.textContent = statusInput.value;
//             statusText.classList.add('custom-status');
//             statusInput.remove();
//             taskItem.appendChild(statusText);
//         });
//     });

//     //Добавляет кнопки в блок кнопок
//     taskButtons.appendChild(completeBtn);
//     taskButtons.appendChild(statusBtn);
//     taskButtons.appendChild(deleteBtn);

//     //Добавляем текст и кнопки в задачу
//     taskItem.appendChild(taskContent);
//     taskItem.appendChild(taskButtons);

//     //Добавляем задачу в список
//     taskList.appendChild(taskItem);
    
//     //Проверяем наличие задач в списке, чтобы вывести их в отдельный блок
//     addTaskVisible();

//     //Очищаем поле ввода
//     taskInput.value = '';
// }


document.getElementById("addTaskBtn").addEventListener("click", function () {
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDate = document.getElementById("taskDate").value;
    const taskTime = document.getElementById("taskTime").value;

    if (taskTitle.trim() !== "" && taskDescription.trim() !== "" && taskDate !== "" && taskTime !== "") {
        const taskList = document.getElementById("task-list");

        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        const titleElement = document.createElement("div");
        titleElement.className = "task-title";
        titleElement.textContent = taskTitle;

        const descriptionElement = document.createElement("div");
        descriptionElement.className = "task-description";
        descriptionElement.textContent = taskDescription;

        const dateTimeElement = document.createElement("div");
        dateTimeElement.className = "task-date-time";
        dateTimeElement.textContent = `Дата: ${taskDate}, Время: ${taskTime}`;

        //Иконки для редактирования, удаления и завершения задач
        const iconsElement = document.createElement("div");
        iconsElement.className = "task-icons";

        const completeIcon = document.createElement("i");
        completeIcon.className = "fas fa-check";
        completeIcon.addEventListener("click", function() {
            taskItem.classList.toggle("completed");
        });

        const editIcon = document.createElement("i");
        editIcon.className = "fas fa-pencil-alt";
        editIcon.addEventListener("click", function() {
            editTask(taskItem, titleElement, descriptionElement, dateTimeElement);
        });

        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-trash";
        deleteIcon.addEventListener("click", function() {
            taskList.removeChild(taskItem);
        });

        iconsElement.appendChild(completeIcon);
        iconsElement.appendChild(editIcon);
        iconsElement.appendChild(deleteIcon);

        taskItem.appendChild(titleElement);
        taskItem.appendChild(descriptionElement);
        taskItem.appendChild(dateTimeElement);
        taskItem.appendChild(iconsElement);

        taskList.appendChild(taskItem);

        document.getElementById("taskTitle").value = "";
        document.getElementById("taskDescription").value = "";
        document.getElementById("taskDate").value = "";
        document.getElementById("taskTime").value = "";

    } else {
        alert("Заполните все поля!");
    }

    function editTask(taskItem, titleElement, descriptionElement, dateTimeElement) {
        const newTitle = prompt("Редактировать заголовок задачи:", titleElement.textContent);
        const newDescription = prompt("Редактировать описание задачи:", descriptionElement.textContent);
        const newDate = prompt("Редактировать дату (формат YYYY-MM-DD):", dateTimeElement.textContent.split(", ")[0].slice(6));
        const newTime = prompt("Редактировать время (формат HH:MM):", dateTimeElement.textContent.split(", ")[1].slice(7));

        if (newTitile !== null && newTitle.trim() !== "") {
            titleElement.textContent = newTitle;
        }

        if (newDescription !== null && newDescription.trim() !== "") {
            descriptionElement.textContent = newDescription;
        }

        if (newDate !== null && newDate.trim() !== "") {
            dateTimeElement.textContent = `Дата: ${newDate}, Время: ${newTime}`
        }

        if (newTime !== null && newTime.trim() !== "") {
            dateTimeElement.textContent = `Дата: ${newDate}, Время: ${newTime}`
        }
    }
});