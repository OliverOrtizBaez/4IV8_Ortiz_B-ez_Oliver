/**
 * Validacion.js — Validación robusta con expresiones regulares
 * Bloquea entrada inválida en tiempo real (teclado, pegado y arrastrar texto).
 */

// ─── Expresiones regulares centralizadas ────────────────────────────────────
const REGEX = {
    soloDigitos:    /^\d+$/,                      // enteros positivos
    numeroDecimal:  /^\d+(\.\d+)?$/,              // positivos con decimal
    calificacion:   /^(10(\.0+)?|[0-9](\.\d+)?)$/, // 0–10 inclusive
    fecha:          /^\d{4}-\d{2}-\d{2}$/,        // YYYY-MM-DD
    caracterValido: /[^\d.]/g,                    // para limpiar decimales
    caracterEntero: /[^\d]/g,                     // para limpiar enteros
};

// ─── Utilidades ─────────────────────────────────────────────────────────────

/**
 * Bloquea teclas y pegado para un campo numérico (decimal o entero).
 * @param {HTMLInputElement} campo
 * @param {'decimal'|'entero'} tipo
 */
function protegerCampo(campo, tipo) {
    // Bloquear teclas no permitidas
    campo.addEventListener("keydown", function (e) {
        const permitidas = [
            "Backspace","Delete","Tab","Escape","Enter",
            "ArrowLeft","ArrowRight","Home","End",
        ];
        if (permitidas.includes(e.key)) return;

        if (tipo === "decimal") {
            // Permitir dígitos y UN solo punto
            if (e.key === "." && !this.value.includes(".")) return;
            if (/^\d$/.test(e.key)) return;
        } else {
            // Solo dígitos
            if (/^\d$/.test(e.key)) return;
        }
        e.preventDefault();
    });

    // Limpiar cualquier cosa inválida que se pegue o arrastre
    campo.addEventListener("input", function () {
        const pos = this.selectionStart;
        let limpio;
        if (tipo === "decimal") {
            // Eliminar todo excepto dígitos y el primer punto
            limpio = this.value.replace(/[^\d.]/g, "");
            // Si hay más de un punto, quedarse solo con el primero
            const partes = limpio.split(".");
            limpio = partes.shift() + (partes.length ? "." + partes.join("") : "");
        } else {
            limpio = this.value.replace(/[^\d]/g, "");
        }
        if (this.value !== limpio) {
            this.value = limpio;
            // Restaurar la posición del cursor
            this.setSelectionRange(pos - 1, pos - 1);
        }
    });

    // Interceptar pegado explícito (Ctrl+V / menú contextual)
    campo.addEventListener("paste", function (e) {
        e.preventDefault();
        const texto = (e.clipboardData || window.clipboardData).getData("text");
        let limpio;
        if (tipo === "decimal") {
            limpio = texto.replace(/[^\d.]/g, "");
            const partes = limpio.split(".");
            limpio = partes.shift() + (partes.length ? "." + partes.join("") : "");
        } else {
            limpio = texto.replace(/[^\d]/g, "");
        }
        // Insertar en la posición actual del cursor
        const inicio = this.selectionStart;
        const fin    = this.selectionEnd;
        this.value   = this.value.slice(0, inicio) + limpio + this.value.slice(fin);
        const nuevaPos = inicio + limpio.length;
        this.setSelectionRange(nuevaPos, nuevaPos);
    });

    // También bloquear arrastrar texto al campo
    campo.addEventListener("drop", function (e) {
        e.preventDefault();
        const texto = e.dataTransfer.getData("text");
        let limpio;
        if (tipo === "decimal") {
            limpio = texto.replace(/[^\d.]/g, "");
            const partes = limpio.split(".");
            limpio = partes.shift() + (partes.length ? "." + partes.join("") : "");
        } else {
            limpio = texto.replace(/[^\d]/g, "");
        }
        this.value = limpio;
    });
}

// Aplica protegerCampo a todos los campos relevantes al cargar el DOM
document.addEventListener("DOMContentLoaded", function () {
    // Campos decimales
    const decimales = [
        "capital",
        "sueldo-base", "venta1", "venta2", "venta3",
        "compra-total",
        "p1", "p2", "p3", "examen-final", "trabajo-final",
    ];
    decimales.forEach(id => {
        const el = document.getElementById(id);
        if (el) protegerCampo(el, "decimal");
    });

    // Campos enteros
    const enteros = ["num-hombres", "num-mujeres"];
    enteros.forEach(id => {
        const el = document.getElementById(id);
        if (el) protegerCampo(el, "entero");
    });
});

// ─── Función auxiliar de error ───────────────────────────────────────────────
function error(msg, campo) {
    alert(msg);
    if (campo) campo.focus();
    return false;
}

// ─── 1. Inversión de Capital ─────────────────────────────────────────────────
function validar(formulario) {
    const campoCapital = formulario.capital;
    const val          = campoCapital.value.trim();

    if (val === "")
        return error("Por favor ingrese un capital", campoCapital);

    if (!REGEX.numeroDecimal.test(val))
        return error("Por favor ingrese solo números en el campo capital", campoCapital);

    const capital = parseFloat(val);

    if (capital <= 0)
        return error("El capital debe ser mayor a 0", campoCapital);
    if (capital > 1_000_000)
        return error("El capital no puede superar $1,000,000", campoCapital);

    const ganancia = capital * 0.02;
    const total    = capital + ganancia;

    document.getElementById("resultado-1").innerHTML = `
        <p>Capital invertido: $${capital.toFixed(2)}</p>
        <p>Ganancia (2%): $${ganancia.toFixed(2)}</p>
        <p>Total tras un mes: $${total.toFixed(2)}</p>
    `;
    return false;
}

// ─── 2. Sueldo y Comisiones ──────────────────────────────────────────────────
function validarVentas(formulario) {
    const campos = {
        sueldo: formulario["sueldo-base"],
        v1:     formulario.venta1,
        v2:     formulario.venta2,
        v3:     formulario.venta3,
    };

    // Presencia y formato numérico
    const validaciones = [
        [campos.sueldo, "sueldo base"],
        [campos.v1,     "Venta 1"],
        [campos.v2,     "Venta 2"],
        [campos.v3,     "Venta 3"],
    ];

    for (const [campo, nombre] of validaciones) {
        const v = campo.value.trim();
        if (v === "")
            return error(`Por favor ingrese ${nombre}`, campo);
        if (!REGEX.numeroDecimal.test(v))
            return error(`${nombre} debe ser un número válido`, campo);
    }

    const sueldo = parseFloat(campos.sueldo.value);
    const v1     = parseFloat(campos.v1.value);
    const v2     = parseFloat(campos.v2.value);
    const v3     = parseFloat(campos.v3.value);

    if (sueldo <= 10_000)
        return error("El sueldo base debe ser mayor a $10,000", campos.sueldo);
    if (v1 > 100_000)
        return error("La Venta 1 no puede superar $100,000", campos.v1);
    if (v2 > 100_000)
        return error("La Venta 2 no puede superar $100,000", campos.v2);
    if (v3 > 100_000)
        return error("La Venta 3 no puede superar $100,000", campos.v3);

    calcularVentas();
    return false;
}

// ─── 3. Descuento del 15% ────────────────────────────────────────────────────
function validarTienda(formulario) {
    const campo = formulario["compra-total"];
    const val   = campo.value.trim();

    if (val === "")
        return error("Por favor ingrese la compra total", campo);
    if (!REGEX.numeroDecimal.test(val))
        return error("La compra total debe ser un número válido", campo);

    const compra = parseFloat(val);

    if (compra <= 0)
        return error("La compra tiene que ser positiva", campo);
    if (compra > 1_000_000)
        return error("La compra no puede superar $1,000,000", campo);

    calcularTienda();
    return false;
}

// ─── 4. Calificación Final ───────────────────────────────────────────────────
function validarCalificaciones(formulario) {
    const parciales = [
        [formulario["p1"], "Parcial 1"],
        [formulario["p2"], "Parcial 2"],
        [formulario["p3"], "Parcial 3"],
    ];
    const extras = [
        [formulario["examen-final"],   "Examen final"],
        [formulario["trabajo-final"],  "Trabajo final"],
    ];

    for (const [campo, nombre] of [...parciales, ...extras]) {
        const v = campo.value.trim();

        if (v === "")
            return error(`Por favor ingrese ${nombre}`, campo);

        if (!REGEX.numeroDecimal.test(v))
            return error(`${nombre} debe ser un número válido`, campo);

        const num = parseFloat(v);

        if (num < 0)
            return error(`${nombre} no puede ser negativo`, campo);
        if (num > 10)
            return error(`${nombre} debe ser un número entre 0 y 10`, campo);
    }

    calcularCalificacion();
    return false;
}

// ─── 5. Porcentaje de Hombres y Mujeres ─────────────────────────────────────
function validarGrupo(formulario) {
    const campoH = formulario["num-hombres"];
    const campoM = formulario["num-mujeres"];

    const valH = campoH.value.trim();
    const valM = campoM.value.trim();

    if (valH === "")
        return error("Por favor ingrese el número de hombres", campoH);
    if (!REGEX.soloDigitos.test(valH))
        return error("El número de hombres debe ser un entero positivo", campoH);

    if (valM === "")
        return error("Por favor ingrese el número de mujeres", campoM);
    if (!REGEX.soloDigitos.test(valM))
        return error("El número de mujeres debe ser un entero positivo", campoM);

    const hombres = parseInt(valH, 10);
    const mujeres = parseInt(valM, 10);

    if (hombres <= 0)
        return error("El número de hombres debe ser mayor a 0", campoH);
    if (hombres > 10_000)
        return error("El número de hombres no puede superar 10,000", campoH);
    if (mujeres <= 0)
        return error("El número de mujeres debe ser mayor a 0", campoM);
    if (mujeres > 10_000)
        return error("El número de mujeres no puede superar 10,000", campoM);

    calcularGrupo();
    return false;
}

// ─── 6. Cálculo de Edad ──────────────────────────────────────────────────────
function validarEdad(formulario) {
    const campo = formulario["fecha-nacimiento"];
    const valor = campo.value.trim();

    if (valor === "")
        return error("Por favor ingrese su fecha de nacimiento", campo);

    // El input type="date" ya garantiza YYYY-MM-DD, pero validamos igual
    if (!REGEX.fecha.test(valor))
        return error("Por favor ingrese una fecha válida (AAAA-MM-DD)", campo);

    // Validar que los componentes sean fechas reales
    const [anio, mes, dia] = valor.split("-").map(Number);
    const regexMes = /^(0[1-9]|1[0-2])$/;
    const regexDia = /^(0[1-9]|[12]\d|3[01])$/;

    if (!regexMes.test(valor.split("-")[1]))
        return error("El mes ingresado no es válido (01–12)", campo);
    if (!regexDia.test(valor.split("-")[2]))
        return error("El día ingresado no es válido (01–31)", campo);

    const fecha = new Date(valor + "T00:00:00"); // evitar desfase de zona horaria
    const hoy   = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (isNaN(fecha.getTime()))
        return error("Por favor ingrese una fecha válida", campo);
    if (fecha >= hoy)
        return error("La fecha de nacimiento no puede ser igual o posterior a hoy", campo);

    const hace120 = new Date();
    hace120.setFullYear(hoy.getFullYear() - 120);
    if (fecha < hace120)
        return error("La fecha de nacimiento no puede ser tan antigua (más de 120 años)", campo);

    calcularEdad();
    return false;
}