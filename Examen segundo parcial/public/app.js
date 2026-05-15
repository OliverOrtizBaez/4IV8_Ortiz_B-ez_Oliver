// Obtener cada uno de los parámetros del formulario
const formUsuario = document.getElementById('form-usuario');
const inputId = document.getElementById('usuario-id');
const inputNombre = document.getElementById('nombre');
const inputfecha = document.getElementById('fecha_nacimiento');
const formTitulo = document.getElementById('form-titulo');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn-cancelar'); // Corregido el punto por guion
const tbodyUsuarios = document.getElementById('tbody-usuarios');
const tablaUsuarios = document.getElementById('tabla-usuarios');
const mensajeCargar = document.getElementById('mensaje-carga');
const mensajeVacio = document.getElementById('mensaje-vacio');
const notificacionDiv = document.getElementById('notificacion');

const errorNombre = document.getElementById('error-nombre');
const errorFecha = document.getElementById('error-fecha');
const errorNota = document.getElementById('error-nota'); // Corregido: punto y nombre del método

// Asegúrate de tener definida la URL de tu backend
const API_URL = '/api/usuarios'; 

async function cargarUsuarios() {
    try {
        const respuesta = await fetch(API_URL);
        if(!respuesta.ok){
            throw new Error('Error al cargar usuarios');
        }
        const usuarios = await respuesta.json();
        // Llamada a la función para pintar los datos
        renderizarTabla(usuarios);
    } catch(error){
        console.error('Error:', error); // Corregido: coma para concatenar
        mostrarNotificacion('Error al cargar los usuarios', 'error');
    }
}