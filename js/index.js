document.addEventListener('DOMContentLoaded', function () {
    // Variables globales
    const taskList = document.getElementById('taskList');
    const reminderList = document.getElementById('reminderList');
    const timerDisplay = document.getElementById('timerDisplay');
    const workedHours = document.getElementById('workedHours');
    let timerInterval;
    let isRunning = false;
    let startCounter = 0;

    // Cargar datos desde localStorage al iniciar
    loadFromLocalStorage();

    // Función para mostrar alerta
    function showAlert(message) {
        alert(message);
    }

    // Event listener para agregar tarea
    document.getElementById('addTask').addEventListener('click', function () {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList = 'form-check-input';
            checkbox.addEventListener('change', function () {
                li.classList.toggle('completed');
                saveToLocalStorage();
            });
            li.appendChild(checkbox);
            li.classList = 'taskLi';
            li.appendChild(document.createTextNode(taskText));
            taskList.appendChild(li);
            taskInput.value = '';
            saveToLocalStorage();
            showAlert('Tarea agregada correctamente');
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
                saveToLocalStorage();
            });
            li.classList = 'reminderLi btn btn-dark mb-2';
            reminderList.appendChild(li);
            reminderInput.value = '';
            saveToLocalStorage();
            showAlert('Recordatorio agregado correctamente');
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
        startCounter = 0; // Restablecer el contador
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
        const endTime = new Date();
        const hours = endTime.getHours();
        const minutes = endTime.getMinutes();
        const seconds = endTime.getSeconds();
        const formattedTime =
            (hours < 10 ? '0' : '') + hours + ':' +
            (minutes < 10 ? '0' : '') + minutes + ':' +
            (seconds < 10 ? '0' : '') + seconds;

        const li = document.createElement('li');
        li.textContent = `Terminado a las ${formattedTime} - Tiempo trabajado: ${timerDisplay.textContent}`;
        workedHours.appendChild(li);
        saveToLocalStorage();
    }

    // MODALS
    // Event listener para iniciar un nuevo contador desde modal
    document.getElementById('startNewTimer').addEventListener('click', function () {
        startCounter = 0;
        timerDisplay.textContent = '00:00:00';
        const timerModal = bootstrap.Modal.getInstance(document.getElementById('timerModal'));
        timerModal.hide();
    });

    // Event listener para agregar tarea desde modal
    document.getElementById('modalAddTask').addEventListener('click', function () {
        const taskInput = document.getElementById('modalTaskInput');
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList = 'form-check-input';
            checkbox.addEventListener('change', function () {
                li.classList.toggle('completed');
                saveToLocalStorage();
            });
            li.appendChild(checkbox);
            li.classList = 'taskLi';
            li.appendChild(document.createTextNode(taskText));
            taskList.appendChild(li);
            taskInput.value = '';
            // Cerrar el modal
            const taskModal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
            taskModal.hide();
            saveToLocalStorage();
            showAlert('Tarea agregada correctamente');
        }
    });

    // Event listener para agregar recordatorio desde modal
    document.getElementById('modalAddReminder').addEventListener('click', function () {
        const reminderInput = document.getElementById('modalReminderInput');
        const reminderText = reminderInput.value.trim();
        if (reminderText !== '') {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(reminderText));
            li.addEventListener('click', function () {
                li.classList.toggle('completed');
                saveToLocalStorage();
            });
            li.classList = 'reminderLi btn btn-dark mb-2';
            reminderList.appendChild(li);
            reminderInput.value = '';
            // Cerrar el modal
            const reminderModal = bootstrap.Modal.getInstance(document.getElementById('reminderModal'));
            reminderModal.hide();
            saveToLocalStorage();
            showAlert('Recordatorio agregado correctamente');
        }
    });

    // LOCAL STORAGE FUNCTIONS
    // Función para guardar datos en localStorage
    function saveToLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push({ text: task.textContent, completed: task.classList.contains('completed') });
        });
        const reminders = [];
        reminderList.querySelectorAll('li').forEach(reminder => {
            reminders.push({ text: reminder.textContent, completed: reminder.classList.contains('completed') });
        });
        const workedHoursList = [];
        workedHours.querySelectorAll('li').forEach(workedHour => {
            workedHoursList.push(workedHour.textContent);
        });

        const data = {
            tasks: tasks,
            reminders: reminders,
            workedHours: workedHoursList
        };
        localStorage.setItem('tasklyData', JSON.stringify(data));
    }

    // Función para cargar datos desde localStorage
    function loadFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem('tasklyData'));
        if (data) {
            for (const task of data.tasks) {
                const li = document.createElement('li');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.classList = 'form-check-input';
                checkbox.checked = task.completed;
                checkbox.addEventListener('change', function () {
                    li.classList.toggle('completed');
                    saveToLocalStorage();
                });
                li.appendChild(checkbox);
                li.classList = 'taskLi';
                li.appendChild(document.createTextNode(task.text));
                if (task.completed) {
                    li.classList.add('completed');
                }
                taskList.appendChild(li);
            }
            for (const reminder of data.reminders) {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(reminder.text));
                li.addEventListener('click', function () {
                    li.classList.toggle('completed');
                    saveToLocalStorage();
                });
                li.classList = 'reminderLi btn btn-dark mb-2';
                if (reminder.completed) {
                    li.classList.add('completed');
                }
                reminderList.appendChild(li);
            }
            for (const workedHour of data.workedHours) {
                const li = document.createElement('li');
                li.textContent = workedHour;
                workedHours.appendChild(li);
            }
        }
    }
});
