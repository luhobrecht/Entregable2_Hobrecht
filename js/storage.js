// Función para guardar datos en localStorage
function saveToLocalStorage(data) {
    localStorage.setItem('tasklyData', JSON.stringify(data));
}

// Función para cargar datos desde localStorage
function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasklyData')) || {};
}

// Función para cargar datos desde un archivo JSON
async function loadDataFromJSON() {
    try {
        const response = await fetch('./js/data.json');
        if (!response.ok) throw new Error('Error al cargar la base de datos');
        return await response.json();
    } catch (error) {
        showAlert('Error al cargar los datos del archivo JSON: ' + error.message, 'error');
        return {};
    }
}

// Función para fusionar los datos de localStorage y JSON
function mergeData(localData, jsonData) {
    return {
        tasks: [...(jsonData.tasks || []), ...(localData.tasks || [])],
        reminders: [...(jsonData.reminders || []), ...(localData.reminders || [])],
        workedHours: [...(jsonData.workedHours || []), ...(localData.workedHours || [])],
    };
}

// Función para mostrar alertas 
function showAlert(message, type = 'success') {
    Swal.fire({
        icon: type,
        title: type === 'success' ? '¡Hecho!' : 'Error',
        text: message,
    });
}