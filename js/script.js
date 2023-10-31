"use strict"

const input = document.getElementById('new'),
      btnAddTask = document.getElementById('add'),
      tasksBox = document.getElementById('tasks');

let tasksArr = [];  

if(localStorage.getItem('todo')) {
    tasksArr = JSON.parse(localStorage.getItem('todo'));
    addTaskToPage(tasksArr);
};

// Получение информации с инпута при клике на кнопку
btnAddTask.addEventListener('click', function(e){
    e.preventDefault();
    let newTaskText = input.value;
    
    if (newTaskText && checkExistenceTask(newTaskText, tasksArr)) {
        addTask(newTaskText, tasksArr);
    }

    addTaskToPage(tasksArr);
    input.value = "";
    localStorage.setItem('todo', JSON.stringify(tasksArr));
});

// Проверяем существование новой задачи на сущестование в массиве
function checkExistenceTask(text, arr) {
    let notExistingTask = true;

    arr.forEach(function(task){
        if(task.text === text) {
            alert('Задача уже существует!!!');
            notExistingTask = false;
        }
    });

    return notExistingTask;
}

// Добавление новой задачи в массив
function addTask(text, arr) {
let taskId = Date.now();
   let task = {
        id: taskId,
        isChecked: false,
        text: text,
    }
    arr.push(task);
}

// Вывод задачи на страницу
function addTaskToPage(arr) {
    let taskListToHtml = '';
    arr.forEach(function(task) {
        const cls = task.isChecked ? 'tasks__task tasks__task-complete' : 'tasks__task',
              checked =  task.isChecked ? 'checked' : '';

        let taskHTMl = `
            <div id="${task.id}" class="${cls}">
                <label class="tasks__checkbox">
                    <input type="checkbox" ${checked}>
                    <div class="tasks__checkbox-div"></div>
                </label>
                <div class="tasks__task-text">${task.text}</div>
                <div class="tasks__task-del"></div>
            </div>    
        `;

        taskListToHtml = taskListToHtml + taskHTMl;
    });

    tasksBox.innerHTML = taskListToHtml;

    updateCounter(arr)
}

//Отслеживаем клик на кастомный селект
tasksBox.addEventListener('click', function(e) {
    const customCheckBox = e.target.classList.contains('tasks__checkbox-div'),
          deleteBtn = e.target.classList.contains('tasks__task-del');
    if(customCheckBox) {
        let taskId = e.target.parentElement.parentElement.getAttribute('id');

        tasksArr.forEach(function(task) {
            if(task.id == taskId) {
                task.isChecked = !task.isChecked;
            }
            addTaskToPage(tasksArr);
        });
    }

    if(deleteBtn) {
        let taskId = e.target.parentElement.getAttribute('id');
        tasksArr.forEach(function(task, i) {
            if(task.id == taskId) {
                tasksArr.splice(i, 1);
            }
            addTaskToPage(tasksArr);
            // updateLocalStorage(tasksArr);
            localStorage.setItem('todo', JSON.stringify(tasksArr));
        });
    }

    localStorage.setItem('todo', JSON.stringify(tasksArr));
});
// счетчик задач
function updateCounter(arr){
    let countAll = document.getElementById('count-all');
    let tasksAll = arr.length;
    let countDone = document.getElementById('count-done');
    let tasksFinished = 0;

    countAll.innerHTML = tasksAll;

    arr.forEach(function(task){
        if(task.isChecked){
            tasksFinished++;
        }
    });
    console.log(tasksFinished);
    
    countDone.innerHTML = tasksFinished;
}



