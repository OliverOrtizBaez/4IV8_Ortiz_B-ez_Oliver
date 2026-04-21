/**
 * validarformulario.js — Validación robusta con expresiones regulares
 * Bloquea entrada inválida en tiempo real (teclado, pegado y arrastrar texto).
 */

// ─── Expresiones regulares centralizadas ────────────────────────────────────
const REGEX = {
    soloLetras: /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/,       // letras, tildes, espacios
    soloEntero: /^\d+$/,                               // solo dígitos enteros
    correo:     /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,      // email básico robusto
    caracterLetra:  /[^A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]/g,    // para limpiar nombre
    caracterEntero: /[^\d]/g,                          // para limpiar edad
};

// ─── Protección de campo: nombre (solo letras) ───────────────────────────────
function protegerNombre(campo) {
    campo.addEventListener("keydown", function (e) {
        const permitidas = [
            "Backspace","Delete","Tab","Escape","Enter",
            "ArrowLeft","ArrowRight","Home","End",
        ];
        if (permitidas.includes(e.key)) return;
        // Permite letras, tildes, ñ y espacio
        if (/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ ]$/.test(e.key)) return;
        e.preventDefault();
    });

    campo.addEventListener("input", function () {
        const pos    = this.selectionStart;
        const limpio = this.value.replace(REGEX.caracterLetra, "");
        if (this.value !== limpio) {
            this.value = limpio;
            this.setSelectionRange(pos - 1, pos - 1);
        }
    });

    campo.addEventListener("paste", function (e) {
        e.preventDefault();
        const texto  = (e.clipboardData || window.clipboardData).getData("text");
        const limpio = texto.replace(REGEX.caracterLetra, "");
        const inicio = this.selectionStart;
        const fin    = this.selectionEnd;
        this.value   = this.value.slice(0, inicio) + limpio + this.value.slice(fin);
        const pos    = inicio + limpio.length;
        this.setSelectionRange(pos, pos);
    });

    campo.addEventListener("drop", function (e) {
        e.preventDefault();
        this.value = e.dataTransfer.getData("text").replace(REGEX.caracterLetra, "");
    });
}

// ─── Protección de campo: edad (solo enteros) ────────────────────────────────
function protegerEntero(campo) {
    campo.addEventListener("keydown", function (e) {
        const permitidas = [
            "Backspace","Delete","Tab","Escape","Enter",
            "ArrowLeft","ArrowRight","Home","End",
        ];
        if (permitidas.includes(e.key)) return;
        if (/^\d$/.test(e.key)) return;
        e.preventDefault();
    });

    campo.addEventListener("input", function () {
        const pos    = this.selectionStart;
        const limpio = this.value.replace(REGEX.caracterEntero, "");
        if (this.value !== limpio) {
            this.value = limpio;
            this.setSelectionRange(pos - 1, pos - 1);
        }
    });

    campo.addEventListener("paste", function (e) {
        e.preventDefault();
        const texto  = (e.clipboardData || window.clipboardData).getData("text");
        const limpio = texto.replace(REGEX.caracterEntero, "");
        const inicio = this.selectionStart;
        const fin    = this.selectionEnd;
        this.value   = this.value.slice(0, inicio) + limpio + this.value.slice(fin);
        const pos    = inicio + limpio.length;
        this.setSelectionRange(pos, pos);
    });

    campo.addEventListener("drop", function (e) {
        e.preventDefault();
        this.value = e.dataTransfer.getData("text").replace(REGEX.caracterEntero, "");
    });
}

// ─── Aplicar protecciones al cargar el DOM ───────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
    const nombre = document.getElementById("nombre");
    const edad   = document.getElementById("edad");

    if (nombre) protegerNombre(nombre);
    if (edad)   protegerEntero(edad);
});

// ─── Utilidad: mostrar error y enfocar campo ─────────────────────────────────
function error(msg, campo) {
    alert(msg);
    if (campo) campo.focus();
    return false;
}

// ─── Función principal de validación ────────────────────────────────────────
function validar(formulario) {

    // ── NOMBRE ───────────────────────────────────────────────────────────────
    const nombreVal = formulario.nombre.value.trim();

    if (nombreVal === "")
        return error("Por favor ingrese su nombre completo", formulario.nombre);

    if (nombreVal.length < 3)
        return error("El nombre debe tener al menos 3 caracteres", formulario.nombre);

    if (!REGEX.soloLetras.test(nombreVal))
        return error("Por favor escriba únicamente letras en el campo nombre", formulario.nombre);

    // Evitar nombres con solo espacios (ya cubierto por trim, pero doble seguro)
    if (/^\s+$/.test(nombreVal))
        return error("El nombre no puede estar compuesto solo de espacios", formulario.nombre);

    // ── EDAD ─────────────────────────────────────────────────────────────────
    const edadVal = formulario.edad.value.trim();

    if (edadVal === "")
        return error("Por favor ingrese su edad", formulario.edad);

    if (!REGEX.soloEntero.test(edadVal))
        return error("Por favor ingrese únicamente números enteros en el campo edad", formulario.edad);

    const edad = parseInt(edadVal, 10);

    if (edad < 1 || edad > 120)
        return error("Por favor ingrese una edad válida (entre 1 y 120)", formulario.edad);

    // ── CORREO ────────────────────────────────────────────────────────────────
    const emailVal = formulario.email.value.trim();

    if (emailVal === "")
        return error("Por favor ingrese su correo electrónico", formulario.email);

    if (!REGEX.correo.test(emailVal))
        return error("Por favor ingrese un correo electrónico válido (Ej. correo@dominio.com)", formulario.email);

    // ── COMENTARIO ────────────────────────────────────────────────────────────
    const comentario = formulario.comentario.value.trim();

    if (comentario === "")
        return error("Por favor ingrese un comentario", formulario.comentario);

    if (comentario.length < 10)
        return error("El comentario debe tener al menos 10 caracteres", formulario.comentario);

    // ── ÉXITO ─────────────────────────────────────────────────────────────────
    alert("¡Registro enviado correctamente!");
    return true;
}