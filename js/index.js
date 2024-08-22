document.addEventListener('DOMContentLoaded', async function () {
    // Variables globales
    const taskList = document.getElementById('taskList');
    const reminderList = document.getElementById('reminderList');
    const timerDisplay = document.getElementById('timerDisplay');
    const workedHours = document.getElementById('workedHours');
    let timerInterval;
    let isRunning = false;
    let startCounter = 0;

    // Cargar datos desde localStorage y JSON
    try {
        const localData = loadFromLocalStorage();
        console.log('Datos desde localStorage:', localData);

        const jsonData = await loadDataFromJSON();
        console.log('Datos desde JSON:', jsonData);

        const data = mergeData(localData, jsonData);
        console.log('Datos fusionados:', data);

        renderTasks(data.tasks);
        renderReminders(data.reminders);
        renderWorkedHours(data.workedHours);

        // Inicializar el calendario con las tareas y recordatorios
        initializeCalendar(data.tasks, data.reminders);

    } catch (error) {
        showAlert('Error al cargar los datos: ' + error.message, 'error');
    }

    // Event listeners para las acciones de la app
    document.getElementById('addTask').addEventListener('click', function () {
        addTask();
    });

    document.getElementById('addReminder').addEventListener('click', function () {
        addReminder();
    });

    document.getElementById('toggleTimer').addEventListener('click', function () {
        toggleTimer();
    });

    document.getElementById('stopTimer').addEventListener('click', function () {
        stopTimer();
    });

    document.getElementById('startNewTimer').addEventListener('click', function () {
        startNewTimer();
    });

    // Funciones de renderizado de tareas, recordatorios y horas trabajadas
    function renderTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList = 'form-check-input';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', function () {
                task.completed = !task.completed;
                saveToLocalStorage({ tasks, reminders: loadFromLocalStorage().reminders, workedHours: loadFromLocalStorage().workedHours });
                showAlert('Tarea actualizada correctamente');
            });

            li.appendChild(checkbox);
            li.classList = 'taskLi';
            li.appendChild(document.createTextNode(`${task.text}`)); 
            if (task.completed) {
                li.classList.add('completed');
            }
            taskList.appendChild(li);
        });
    }

    function renderReminders(reminders) {
        reminderList.innerHTML = '';
        reminders.forEach(reminder => {
            const li = document.createElement('li');
            li.classList = 'reminderLi btn btn-dark mb-2';
            li.appendChild(document.createTextNode(`${reminder.text}`)); 
            li.addEventListener('click', function () {
                reminder.completed = !reminder.completed;
                li.classList.toggle('completed');
                saveToLocalStorage({ tasks: loadFromLocalStorage().tasks, reminders, workedHours: loadFromLocalStorage().workedHours });
                showAlert('Recordatorio actualizado correctamente');
            });
            if (reminder.completed) {
                li.classList.add('completed');
            }
            reminderList.appendChild(li);
        });
    }

    function renderWorkedHours(workedHoursData) {
        workedHours.innerHTML = '';
        workedHoursData.forEach(workedHour => {
            const li = document.createElement('li');
            li.textContent = workedHour;
            workedHours.appendChild(li);
        });
    }

    // Funciones para manejar tareas, recordatorios y el temporizador
    function addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskDateInput = document.getElementById('taskDate');
        const taskText = taskInput.value.trim();
        const taskDate = taskDateInput.value;

        if (taskText !== '' && taskDate !== '') {
            const tasks = loadFromLocalStorage().tasks || [];
            tasks.push({ text: taskText, date: taskDate, completed: false });
            saveToLocalStorage({ tasks, reminders: loadFromLocalStorage().reminders, workedHours: loadFromLocalStorage().workedHours });
            renderTasks(tasks);
            taskInput.value = '';
            taskDateInput.value = ''; 
            showAlert('Tarea agregada correctamente');
        } else {
            showAlert('Por favor, ingrese una tarea y una fecha', 'error');
        }
    }

    // Recordatorios
    function addReminder() {
        const reminderInput = document.getElementById('reminderInput');
        const reminderDateInput = document.getElementById('reminderDate');
        const reminderText = reminderInput.value.trim();
        const reminderDate = reminderDateInput.value;

        if (reminderText !== '' && reminderDate !== '') {
            const reminders = loadFromLocalStorage().reminders || [];
            reminders.push({ text: reminderText, date: reminderDate, completed: false });
            saveToLocalStorage({ tasks: loadFromLocalStorage().tasks, reminders, workedHours: loadFromLocalStorage().workedHours });
            renderReminders(reminders);
            reminderInput.value = '';
            reminderDateInput.value = ''; 
            showAlert('Recordatorio agregado correctamente');
        } else {
            showAlert('Por favor, ingrese un recordatorio y una fecha', 'error');
        }
    }

    // Temporizador
    function toggleTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
        } else {
            timerInterval = setInterval(updateTimer, 1000);
        }
        isRunning = !isRunning;
    }

    function stopTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
        }
        logTime();
        startCounter = 0; 
        timerDisplay.textContent = '00:00:00';
    }

    function startNewTimer() {
        startCounter = 0;
        timerDisplay.textContent = '00:00:00';
    }

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
        const formattedTime =
            (endTime.getHours() < 10 ? '0' : '') + endTime.getHours() + ':' +
            (endTime.getMinutes() < 10 ? '0' : '') + endTime.getMinutes() + ':' +
            (endTime.getSeconds() < 10 ? '0' : '') + endTime.getSeconds();

        const workedHoursData = loadFromLocalStorage().workedHours || [];
        const newWorkedHour = `Terminado a las ${formattedTime} - Tiempo trabajado: ${timerDisplay.textContent}`;
        workedHoursData.push(newWorkedHour);
        saveToLocalStorage({ tasks: loadFromLocalStorage().tasks, reminders: loadFromLocalStorage().reminders, workedHours: workedHoursData });
        renderWorkedHours(workedHoursData);
    }

    // Función para mostrar alertas 
    function showAlert(message, type = 'success') {
        Swal.fire({
            icon: type,
            title: type === 'success' ? '¡Hecho!' : 'Error',
            text: message,
        });
    }

    // Inicializar calendario
    function initializeCalendar(tasks, reminders) {
        const calendarEl = document.getElementById('calendar');

        const events = [
            ...tasks.map(task => ({
                title: task.text,
                start: task.date,
                backgroundColor: '#3788d8',
            })),
            ...reminders.map(reminder => ({
                title: reminder.text,
                start: reminder.date,
                backgroundColor: '#ff9f89',
            }))
        ];

        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: events
        });

        calendar.render();
    }
});
