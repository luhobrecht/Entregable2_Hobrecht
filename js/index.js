// Aseguramos que el script se ejecute después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Variables globales
    const taskList = document.getElementById('taskList');
    const reminderList = document.getElementById('reminderList');
    const timerDisplay = document.getElementById('timerDisplay');
    const workedHours = document.getElementById('workedHours')
    let timerInterval;
    let isRunning = false;
    let startCounter = 0;

    // Event listener para agregar tarea
    document.getElementById('addTask').addEventListener('click', function () {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList = 'form-check-input'
            checkbox.addEventListener('change', function () {
                li.classList.toggle('completed');
            });
            li.appendChild(checkbox);
            li.classList = 'taskLi'
            li.appendChild(document.createTextNode(taskText));
            taskList.appendChild(li);
            taskInput.value = '';
        }
    });

    // Event listener para agregar recordatorio
    document.getElementById('addReminder').addEventListener('click', function () {
        const reminderInput = document.getElementById('reminderInput');
        const reminderText = reminderInput.value.trim();
        if (reminderText !== '') {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(reminderText));
            li.addEventListener('click', function () {
                li.classList.toggle('completed');
            });
            li.classList = 'reminderLi btn btn-dark mb-2'
            reminderList.appendChild(li);
            reminderInput.value = '';
        }
    });

    // Event listener para iniciar/pausar el temporizador
    document.getElementById('toggleTimer').addEventListener('click', function () {
        if (isRunning) {
            clearInterval(timerInterval);
        } else {
            timerInterval = setInterval(updateTimer, 1000);
        }
        isRunning = !isRunning;
    });

    // Event listener para detener el temporizador
    document.getElementById('stopTimer').addEventListener('click', function () {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
        }
        logTime();
        elapsedTime = 0;
        timerDisplay.textContent = '00:00:00';
    });

    // Función para actualizar el temporizador
    function updateTimer() {
        startCounter++;
        const hours = Math.floor(startCounter / 3600);
        const minutes = Math.floor((startCounter % 3600) / 60);
        const seconds = startCounter % 60;

        timerDisplay.textContent =
            (hours < 10 ? '0' : '') + hours + ':' +
            (minutes < 10 ? '0' : '') + minutes + ':' +
            (seconds < 10 ? '0' : '') + seconds;
    }

    function logTime() {
        const li = document.createElement('li');
        li.textContent = timerDisplay.textContent;
        workedHours.appendChild(li);
    }
});

// Función para agregar tareas desde acceso directo en navbar
document.getElementById('newTask').addEventListener('click', function () {
    const addTask = prompt('Agrega una tarea nueva.')
    taskList += addTask
})