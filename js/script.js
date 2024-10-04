document.getElementById("addTaskBtn").addEventListener("click", function () {
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDate = document.getElementById("taskDate").value;
    const taskTime = document.getElementById("taskTime").value;

    if (taskTitle.trim() !== "" && taskDescription.trim() !== "" && taskDate !== "" && taskTime !== "") {
        const taskList = document.getElementById("task-list");

        //Создание элемента для новой задачи
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        //Заголовок задачи
        const titleElement = document.createElement("div");
        titleElement.className = "task-title";
        titleElement.textContent = taskTitle;

        //Описание задачи
        const descriptionElement = document.createElement("div");
        descriptionElement.className = "task-description";
        descriptionElement.textContent = taskDescription;

        //Дата и время задачи
        const dateTimeElement = document.createElement("div");
        dateTimeElement.className = "task-date-time";
        dateTimeElement.textContent = `Дата: ${taskDate}, Время: ${taskTime}`;

        //Поля для ввода редактирования
        const titleInput = document.createElement("input");
        titleInput.type = "text"
        titleInput.value = taskTitle;

        const descriptionInput = document.createElement("textarea");
        descriptionInput.value = taskDescription;

        const dateInput = document.createElement("input");
        

        //Элемент для пользовательского статуса
        const statusElement = document.createElement("div");
        statusElement.className = "task-status"
        statusElement.textContent = `Статус: Без статуса`

        //Создание элемента для кнопок
        const iconsElement = document.createElement("div");
        iconsElement.className = "task-icons";

        //Кнопка завершения задачи
        const completeIcon = document.createElement("i");
        completeIcon.className = "fas fa-check";
        completeIcon.addEventListener("click", function() {
            taskItem.classList.toggle("completed");
        });

        //Кнопка редактирования задачи
        const editIcon = document.createElement("i");
        editIcon.className = "fas fa-pencil-alt";
        editIcon.addEventListener("click", function() {
            editTask(taskItem, titleElement, descriptionElement, dateTimeElement);
        });

        //Кнопка для удаления задачи
        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-trash";
        deleteIcon.addEventListener("click", function() {
            taskList.removeChild(taskItem);
        });

        //Кнопка редактирования и создания пользовательского статуса
        const statusIcon = document.createElement("i");
        statusIcon.className = "fas fa-bars";
        statusIcon.addEventListener("click", function() {
            const newStatus = prompt("Введите новый статус:", statusElement.textContent.replace("Статус: ", ""));
            if (newStatus !== null && newStatus.trim() !== "") {
                statusElement.textContent = `Статус: ${newStatus}`;
            }
        });

        //Добавление иконок
        iconsElement.appendChild(completeIcon);
        iconsElement.appendChild(editIcon);
        iconsElement.appendChild(deleteIcon);
        iconsElement.appendChild(statusIcon)

        //Добавление элементов в блок задачи
        taskItem.appendChild(titleElement);
        taskItem.appendChild(descriptionElement);
        taskItem.appendChild(dateTimeElement);
        taskItem.appendChild(statusElement);
        taskItem.appendChild(iconsElement);

        //Добавление новой задачи в список
        taskList.appendChild(taskItem);

        //Очистка полей после добавления задачи
        document.getElementById("taskTitle").value = "";
        document.getElementById("taskDescription").value = "";
        document.getElementById("taskDate").value = "";
        document.getElementById("taskTime").value = "";

    } else {
        alert("Заполните все поля!");
    }

    //Функция для редактирования задачи
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