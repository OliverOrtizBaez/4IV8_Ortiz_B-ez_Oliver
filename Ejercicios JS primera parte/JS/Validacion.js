function validar(formulario) {
    const regexNumero = /^\d+(\.\d+)?$/; // solo números positivos

    if (formulario.capital.value.trim() === "") {
        alert("Por favor ingrese un capital");
        formulario.capital.focus();
        return false;
    }
    if (!regexNumero.test(formulario.capital.value.trim())) {
        alert("Por favor ingrese solo números en el campo capital");
        formulario.capital.focus();
        return false;
    }
    if (parseFloat(formulario.capital.value) <= 0) {
        alert("El capital debe ser mayor a 0");
        formulario.capital.focus();
        return false;
    }
    if (parseFloat(formulario.capital.value) > 1000000) {
        alert("El capital no puede ser tan grande");
        formulario.capital.focus();
        return false;
    }

    const capital  = parseFloat(formulario.capital.value);
    const ganancia = capital * 0.02;
    const total    = capital + ganancia;

    document.getElementById("resultado-1").innerHTML = `
        <p>Capital invertido: $${capital.toFixed(2)}</p>
        <p>Ganancia (2%): $${ganancia.toFixed(2)}</p>
        <p>Total tras un mes: $${total.toFixed(2)}</p>
    `;

    return false;
}

function validarVentas(formulario) {
    const regexNumero = /^\d+(\.\d+)?$/;

    if (formulario["sueldo-base"].value.trim() === "") {
        alert("Por favor ingrese el sueldo base");
        formulario["sueldo-base"].focus();
        return false;
    }
    if (!regexNumero.test(formulario["sueldo-base"].value.trim())) {
        alert("El sueldo base debe ser un número");
        formulario["sueldo-base"].focus();
        return false;
    }
    if (formulario.venta1.value.trim() === "") {
        alert("Por favor ingrese la Venta 1");
        formulario.venta1.focus();
        return false;
    }
    if (!regexNumero.test(formulario.venta1.value.trim())) {
        alert("La Venta 1 debe ser un número");
        formulario.venta1.focus();
        return false;
    }
    if (formulario.venta2.value.trim() === "") {
        alert("Por favor ingrese la Venta 2");
        formulario.venta2.focus();
        return false;
    }
    if (!regexNumero.test(formulario.venta2.value.trim())) {
        alert("La Venta 2 debe ser un número");
        formulario.venta2.focus();
        return false;
    }
    if (formulario.venta3.value.trim() === "") {
        alert("Por favor ingrese la Venta 3");
        formulario.venta3.focus();
        return false;
    }
    if (!regexNumero.test(formulario.venta3.value.trim())) {
        alert("La Venta 3 debe ser un número");
        formulario.venta3.focus();
        return false;
    }

    const sueldo = parseFloat(formulario["sueldo-base"].value);
    const venta1 = parseFloat(formulario.venta1.value);
    const venta2 = parseFloat(formulario.venta2.value);
    const venta3 = parseFloat(formulario.venta3.value);

    if (sueldo <= 10000) {
        alert("El sueldo base debe ser mayor a $10,000");
        formulario["sueldo-base"].focus();
        return false;
    }
    if (venta1 > 100000) {
        alert("La Venta 1 no puede superar $100,000");
        formulario.venta1.focus();
        return false;
    }
    if (venta2 > 100000) {
        alert("La Venta 2 no puede superar $100,000");
        formulario.venta2.focus();
        return false;
    }
    if (venta3 > 100000) {
        alert("La Venta 3 no puede superar $100,000");
        formulario.venta3.focus();
        return false;
    }

    calcularVentas();
    return false;
}

function validarTienda(formulario) {
    const regexNumero = /^\d+(\.\d+)?$/;

    if (formulario["compra-total"].value.trim() === "") {
        alert("Por favor ingrese la compra total");
        formulario["compra-total"].focus();
        return false;
    }
    if (!regexNumero.test(formulario["compra-total"].value.trim())) {
        alert("La compra total debe ser un número");
        formulario["compra-total"].focus();
        return false;
    }
    if (parseFloat(formulario["compra-total"].value) <= 0) {
        alert("La compra tiene que ser positiva");
        formulario["compra-total"].focus();
        return false;
    }
    if (parseFloat(formulario["compra-total"].value) > 1000000) {
        alert("La compra no puede ser tan grande");
        formulario["compra-total"].focus();
        return false;
    }

    calcularTienda();
    return false;
}

function validarCalificaciones(formulario) {
    const regexCalif = /^(\d+(\.\d+)?)$/;

    if (formulario["p1"].value.trim() === "") {
        alert("Por favor ingrese la calificacion de p1");
        formulario["p1"].focus();
        return false;
    }
    if (!regexCalif.test(formulario["p1"].value.trim()) || parseFloat(formulario["p1"].value) <= 0 || parseFloat(formulario["p1"].value) > 10) {
        alert("P1 debe ser un número entre 0 y 10");
        formulario["p1"].focus();
        return false;
    }
    if (formulario["p2"].value.trim() === "") {
        alert("Por favor ingrese la calificacion de p2");
        formulario["p2"].focus();
        return false;
    }
    if (!regexCalif.test(formulario["p2"].value.trim()) || parseFloat(formulario["p2"].value) <= 0 || parseFloat(formulario["p2"].value) > 10) {
        alert("P2 debe ser un número entre 0 y 10");
        formulario["p2"].focus();
        return false;
    }
    if (formulario["p3"].value.trim() === "") {
        alert("Por favor ingrese la calificacion de p3");
        formulario["p3"].focus();
        return false;
    }
    if (!regexCalif.test(formulario["p3"].value.trim()) || parseFloat(formulario["p3"].value) <= 0 || parseFloat(formulario["p3"].value) > 10) {
        alert("P3 debe ser un número entre 0 y 10");
        formulario["p3"].focus();
        return false;
    }
    if (formulario["examen-final"].value.trim() === "") {
        alert("Por favor ingrese el examen final");
        formulario["examen-final"].focus();
        return false;
    }
    if (!regexCalif.test(formulario["examen-final"].value.trim()) || parseFloat(formulario["examen-final"].value) <= 0 || parseFloat(formulario["examen-final"].value) > 10) {
        alert("Examen final debe ser un número entre 0 y 10");
        formulario["examen-final"].focus();
        return false;
    }
    if (formulario["trabajo-final"].value.trim() === "") {
        alert("Por favor ingrese el trabajo final");
        formulario["trabajo-final"].focus();
        return false;
    }
    if (!regexCalif.test(formulario["trabajo-final"].value.trim()) || parseFloat(formulario["trabajo-final"].value) <= 0 || parseFloat(formulario["trabajo-final"].value) > 10) {
        alert("Trabajo final debe ser un número entre 0 y 10");
        formulario["trabajo-final"].focus();
        return false;
    }

    calcularCalificacion();
    return false;
}

function validarGrupo(formulario) {
    const regexEntero = /^\d+$/; // solo números enteros

    if (formulario["num-hombres"].value.trim() === "") {
        alert("Por favor ingrese el numero de hombres");
        formulario["num-hombres"].focus();
        return false;
    }
    if (!regexEntero.test(formulario["num-hombres"].value.trim())) {
        alert("El número de hombres debe ser un entero");
        formulario["num-hombres"].focus();
        return false;
    }
    if (formulario["num-mujeres"].value.trim() === "") {
        alert("Por favor ingrese el numero de mujeres");
        formulario["num-mujeres"].focus();
        return false;
    }
    if (!regexEntero.test(formulario["num-mujeres"].value.trim())) {
        alert("El número de mujeres debe ser un entero");
        formulario["num-mujeres"].focus();
        return false;
    }

    if (parseFloat(formulario["num-hombres"].value) <= 0) {
        alert("El numero de hombres tiene que ser positivo");
        formulario["num-hombres"].focus();
        return false;
    }
    if (parseFloat(formulario["num-hombres"].value) > 10000) {
        alert("No se puede calcular mas del limite");
        formulario["num-hombres"].focus();
        return false;
    }
    if (parseFloat(formulario["num-mujeres"].value) <= 0) {
        alert("El numero de mujeres tiene que ser positivo");
        formulario["num-mujeres"].focus();
        return false;
    }
    if (parseFloat(formulario["num-mujeres"].value) > 10000) {
        alert("No se puede calcular mas del limite");
        formulario["num-mujeres"].focus();
        return false;
    }

    calcularGrupo();
    return false;
}

function validarEdad(formulario) {
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/; // formato YYYY-MM-DD

    const valor = formulario["fecha-nacimiento"].value.trim();

    if (valor === "") {
        alert("Por favor ingrese su fecha de nacimiento");
        formulario["fecha-nacimiento"].focus();
        return false;
    }
    if (!regexFecha.test(valor)) {
        alert("Por favor ingrese una fecha válida");
        formulario["fecha-nacimiento"].focus();
        return false;
    }

    const fecha = new Date(valor);
    const hoy   = new Date();

    if (isNaN(fecha.getTime())) {
        alert("Por favor ingrese una fecha válida");
        formulario["fecha-nacimiento"].focus();
        return false;
    }
    if (fecha >= hoy) {
        alert("La fecha de nacimiento no puede ser mayor o igual a hoy");
        formulario["fecha-nacimiento"].focus();
        return false;
    }

    const hace120 = new Date();
    hace120.setFullYear(hoy.getFullYear() - 120);
    if (fecha < hace120) {
        alert("La fecha de nacimiento no puede ser tan antigua");
        formulario["fecha-nacimiento"].focus();
        return false;
    }

    calcularEdad();
    return false;
}