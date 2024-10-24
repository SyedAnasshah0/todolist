document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        const items = taskList.getElementsByTagName('li');
        for (let item of items) {
            tasks.push(item.firstChild.textContent);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task));
    }
});
