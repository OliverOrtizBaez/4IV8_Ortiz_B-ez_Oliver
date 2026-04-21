/este javascrip sera unicamente para agregar la logica atras de los ejercicios, es decir para que el html cuando se use pueda hacer lo que dice que va a hacer

// =====================
// EJERCICIO 1 - Inversión de Capital
// =====================
function calcularInversion() {
    const cap      = parseFloat(document.getElementById("capital").value);
    const ganancia = cap * 0.02;
    const total    = cap + ganancia;

    document.getElementById("resultado-1").innerHTML = `
        <p>Capital invertido: $${cap.toFixed(2)}</p>
        <p>Ganancia (2%): $${ganancia.toFixed(2)}</p>
        <p>Total tras un mes: $${total.toFixed(2)}</p>
    `;
}
// =====================
// EJERCICIO 2 - Sueldo y Comisiones
// =====================
function calcularVentas() {
    const sueldo      = parseFloat(document.getElementById("sueldo-base").value);
    const venta1      = parseFloat(document.getElementById("venta1").value);
    const venta2      = parseFloat(document.getElementById("venta2").value);
    const venta3      = parseFloat(document.getElementById("venta3").value);
    const totalVentas = venta1 + venta2 + venta3;
    const comision    = totalVentas * 0.10;
    const sueldoFinal = sueldo + comision;

    document.getElementById("resultado-2").innerHTML = `
        <p>Sueldo base: $${sueldo.toFixed(2)}</p>
        <p>Total ventas: $${totalVentas.toFixed(2)}</p>
        <p>Comisión (10%): $${comision.toFixed(2)}</p>
        <p>Sueldo total: $${sueldoFinal.toFixed(2)}</p>
    `;
}
// =====================
// EJERCICIO 3 - Descuento del 15%
// =====================
function calcularTienda() {
    const compra    = parseFloat(document.getElementById("compra-total").value);
    const descuento = compra * 0.15;
    const total     = compra - descuento;

    document.getElementById("resultado-3").innerHTML = `
        <p>Total original: $${compra.toFixed(2)}</p>
        <p>Descuento (15%): $${descuento.toFixed(2)}</p>
        <p>Total a pagar: $${total.toFixed(2)}</p>
    `;
}
// =====================
// EJERCICIO 4 - Calificación Final
// =====================
function calcularCalificacion() {
    const p1           = parseFloat(document.getElementById("p1").value);
    const p2           = parseFloat(document.getElementById("p2").value);
    const p3           = parseFloat(document.getElementById("p3").value);
    const examenFinal  = parseFloat(document.getElementById("examen-final").value);
    const trabajoFinal = parseFloat(document.getElementById("trabajo-final").value);

    const promedioParciales = (p1 + p2 + p3) / 3;
    const calificacionFinal = (promedioParciales * 0.55) + (examenFinal * 0.30) + (trabajoFinal * 0.15);

    document.getElementById("resultado-4").innerHTML = `
        <p>Promedio parciales: ${promedioParciales.toFixed(2)}</p>
        <p>Examen final: ${examenFinal.toFixed(2)}</p>
        <p>Trabajo final: ${trabajoFinal.toFixed(2)}</p>
        <p>Calificación final: ${calificacionFinal.toFixed(2)}</p>
    `;
}
// =====================
// EJERCICIO 5 - Porcentaje de Hombres y Mujeres
// =====================
function calcularGrupo() {
    const hombres = parseFloat(document.getElementById("num-hombres").value);
    const mujeres = parseFloat(document.getElementById("num-mujeres").value);

    const total       = hombres + mujeres;
    const porcentajeH = (hombres / total) * 100;
    const porcentajeM = (mujeres / total) * 100;

    document.getElementById("resultado-5").innerHTML = `
        <p>Total de personas: ${total}</p>
        <p>Hombres: ${hombres} (${porcentajeH.toFixed(2)}%)</p>
        <p>Mujeres: ${mujeres} (${porcentajeM.toFixed(2)}%)</p>
    `;
}

// =====================
// EJERCICIO 6 - Cálculo de Edad
// =====================
function calcularEdad() {
    const fechaNacimiento = new Date(document.getElementById("fecha-nacimiento").value);
    const hoy             = new Date();

    let edad  = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    document.getElementById("resultado-6").innerHTML = `
        <p>Fecha de nacimiento: ${fechaNacimiento.toLocaleDateString("es-MX")}</p>
        <p>Edad: ${edad} años</p>
    `;
}