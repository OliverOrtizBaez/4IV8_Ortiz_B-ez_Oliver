// obtener cada uno de los parametros del formulario

const formUsuario = document.getElementById('form-usuario');
const inputId = document.getElementById('usuario-id');
const inputNombre = document.getElementById('nombre');
const inputfecha = document.getElementById('fecha_nacimiento');
const formTitulo = document.getElementById('form-titulo');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn.cancelar');
const tbodyUsuarios = document.getElementById('tbody-usuarios');
const tablaUsuarios = document.getElementById('tabla-usuarios');
const mensajeCargar = document.getElementById('mensaje-carga');
const mensajeVacio = document.getElementById('mensaje-vacio');
const notificacionDiv = document.getElementById('notificacion');

const errorNombre = document.getElementById('error-nombre');
const errorFecha = document.getElementById('error-fecha');
const errorNota = Document-getElementById()


async function cargarUsuarios() {
    try {
        const respuesta = await fetch(API_URL);
        if(!respuesta.ok){
            throw new Error('Error al cargar usuarios');
        }
        const usuarios = await respuesta.json();
        //tenemos que pintar los datos
        renderizarTabla(usuarios);
    } catch(error){
        console.log('Error: ' error);
        mostrarNotificacion('Error al cargar los usuarios,', 'error')
    }
    }
