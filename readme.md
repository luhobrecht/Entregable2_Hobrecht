# Taskly - Simulador Interactivo de Gestión de Tareas y Recordatorios

## Descripción del Proyecto

Taskly es un simulador interactivo desarrollado para gestionar tareas y recordatorios, además de registrar las horas trabajadas. La aplicación simula una base de datos utilizando un archivo JSON y permite al usuario visualizar sus tareas y recordatorios en un calendario integrado.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- **index.html**: Documento principal HTML.
- **css/style.css**: Archivo CSS que define los estilos de la aplicación, incluyendo la integración con Bootstrap.
- **js/app.js**: Archivo JavaScript principal que maneja la lógica de la aplicación, como el manejo de eventos y la interacción con el DOM.
- **js/storage.js**: Archivo JavaScript que maneja las operaciones relacionadas con `localStorage` y la carga de datos desde el archivo JSON.
- **js/data.json**: Archivo JSON que simula la base de datos de tareas, recordatorios y horas trabajadas.
- **img**: Carpeta que contiene imágenes y otros recursos multimedia necesarios para la funcionalidad de la aplicación.

## Guía de Uso

1. **Inicio de la Aplicación**: Al cargar `index.html` en un navegador, se cargarán las tareas, recordatorios y horas trabajadas almacenadas en `localStorage` y en el archivo `data.json`.

2. **Agregar Tareas**:
   - En la sección de Tareas, ingresa la descripción de la tarea y selecciona una fecha utilizando el campo de fecha.
   - Haz clic en `+` para agregarla a la lista.

3. **Agregar Recordatorios**:
   - En la sección de Recordatorios, ingresa la descripción del recordatorio y selecciona una fecha utilizando el campo de fecha.
   - Haz clic en `+` para agregarlo a la lista.

4. **Registrar Horas Trabajadas**:
   - Usa los botones `Iniciar/Pausar` y `Detener` para controlar el temporizador.
   - Las horas trabajadas se registrarán automáticamente y aparecerán en la lista de horas trabajadas, cada vez que presiones el botón `Detener`.

5. **Ver el Calendario**:
   - En la sección de Calendario, puedes visualizar todas las tareas y recordatorios en un formato de calendario.
   - Los eventos del calendario están codificados por color para diferenciar tareas y recordatorios.

## Configuración y Dependencias

Para utilizar la aplicación:

1. Clona el repositorio o descarga el código.
2. Abre `index.html` en tu navegador para comenzar a usar la aplicación.

### Dependencias

- [Bootstrap 5.3.3](https://getbootstrap.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [FullCalendar](https://fullcalendar.io/)

## Consideraciones Técnicas

- **Almacenamiento de Datos**: Los datos se almacenan en `localStorage` y se cargan desde un archivo JSON cuando la aplicación se inicia por primera vez.
- **Servidor Local**: Para cargar datos desde el archivo JSON, es recomendable servir la aplicación desde un servidor local (por ejemplo, usando Live Server en Visual Studio Code).

