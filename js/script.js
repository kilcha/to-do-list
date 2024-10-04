document.getElementById("addTaskBtn").addEventListener("click", function () {
    //Получаем все элементы
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDate = document.getElementById("taskDate").value;
    const taskTime = document.getElementById("taskTime").value;

    //Создаем условие при котором поля должны быть заполнены, иначе выведет предупреждение
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

        //Поле ввода заголовка
        const titleInput = document.createElement("input");
        titleInput.type = "text"
        titleInput.value = taskTitle;

        //Поле ввода для описания
        const descriptionInput = document.createElement("textarea");
        descriptionInput.value = taskDescription;

        //Поле ввода для даты
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.value = taskDate;

        //Поле ввода для времени
        const timeInput = document.createElement("input");
        timeInput.type = "time";
        timeInput.value = taskTime;

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
            if (taskItem.classList.contains("edit-mode")) {
                titleElement.textContent = titleInput.value;
                descriptionElement.textContent = descriptionInput.value;
                dateTimeElement.textContent = `Дата: ${dateInput.value}, Время: ${timeInput.value}`;
                taskItem.classList.remove("edit-mode");
            } else {
                taskItem.classList.add("edit-mode");
            }
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
        taskItem.appendChild(titleInput);
        taskItem.appendChild(descriptionInput);
        taskItem.appendChild(dateInput);
        taskItem.appendChild(timeInput);
        taskItem.appendChild(statusElement);

        //Добавление новой задачи в список
        taskList.appendChild(taskItem);
        taskList.appendChild(iconsElement); //Чтобы вывести иконки в не рамки задачи, потому что накладывается сам на себяы
        
        //Очистка полей после добавления задачи
        document.getElementById("taskTitle").value = "";
        document.getElementById("taskDescription").value = "";
        document.getElementById("taskDate").value = "";
        document.getElementById("taskTime").value = "";

    } else {
        alert("Заполните все поля!");
    }
});