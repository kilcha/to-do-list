document.addEventListener('DOMContentLoaded', () => {
    //Получаем элементы
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    //Обработчик нажатия на кнопку "Добавить"
    addTaskBtn.addEventListener('click', addTask);

    //Функция для добавления задач
    function addTask() {
        const taskText = taskInput.ariaValueMax.trim();
        if (taskText == '') return; //Если текст пустой, то ничего не делаем

        //Создаем элемент задачи
        const taskItem = document.createElementlement('div')
        taskItem.classList.add('task-item');

        //Текст задачи
        const taskContent = document.createElement('span')
        taskContent.textContent = taskText;

        //Блок с кнопками
        const taskButtons = document.createElement('div');
        taskButtons.classList.add('task-buttons')

        //Кнопка "Удалить"
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&#10060'; //Значок крестика
        deleteBtn.addEventListener('click', () => taskItem.remove());

        //Кнопка "Завершить"
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '&#10003'; //Значок галочки
        completeBtn.addEventListener('click', () => {
            taskContent.classList.toggle('task-completed');
        });

        //Кнопка "Пользовательский статус"
        const statusBtn = document.createElement('button');
        statusBtn.innerHTML = '&#9776'; //Значок трех линии
        statusBtn.addEventListener('click', () => {
            const statusInput = document.createElement('input');
            statusInput.type = 'text';
            statusInput.placeholder = 'Введите статус...';
            statusInput.classList.add('status-input');
            taskItem.appendChild(statusInput);
            statusInput.addEventListener('blur', () => {
                const statusText = document.createElement('div');
                statusText.textContent = statusInput.value;
                statusText.classList.add('custom-status');
                statusInput.remove();
                taskItem.appendChild(statusText);
            });
        });

        //Добавляет кнопки в блок кнопок
        taskButtons.appendChild(completeBtn);
        taskButtons.appendChild(statusBtn);
        taskButtons.appendChild(deleteBtn);

        //Добавляем текст и кнопки в задачу
        taskItem.appendChild(taskContent);
        taskItem.appendChild(taskButtons);

        //Добавляем задачу в список
        taskList.appendChild(taskItem);

        //Очищаем поле ввода
        taskInput.value = '';
    }
});

