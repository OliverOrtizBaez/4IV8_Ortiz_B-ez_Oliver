function validar(formulario) {

    // ── VALIDACIÓN DEL NOMBRE ──────────────────────────────────────────────
    // 1. Longitud mínima
    if (formulario.nombre.value.trim().length < 3) {
        alert("Por favor ingrese un nombre mayor de 3 caracteres");
        formulario.nombre.focus();
        return false;
    }

    // 2. Solo letras y espacios
    var abcOK = "QWERTYUIOPASDFGHJKLÑZXCVBNMqwertyuiopasdfghjklñzxcvbnmáéíóúÁÉÍÓÚüÜ ";
    var checkNombre = formulario.nombre.value;

    for (var i = 0; i < checkNombre.length; i++) {
        var char = checkNombre.charAt(i);
        var found = false;
        for (var j = 0; j < abcOK.length; j++) {
            if (char === abcOK.charAt(j)) {
                found = true;
                break;
            }
        }
        if (!found) {
            alert("Por favor escriba únicamente letras en el campo nombre");
            formulario.nombre.focus();
            return false;
        }
    }

    // ── VALIDACIÓN DE LA EDAD ──────────────────────────────────────────────
    var edadVal = formulario.edad.value.trim();

    if (edadVal === "") {
        alert("Por favor ingrese su edad");
        formulario.edad.focus();
        return false;
    }

    var numOK = "1234567890";
    for (var i = 0; i < edadVal.length; i++) {
        var char = edadVal.charAt(i);
        var found = false;
        for (var j = 0; j < numOK.length; j++) {
            if (char === numOK.charAt(j)) {
                found = true;
                break;
            }
        }
        if (!found) {
            alert("Por favor escriba únicamente números en el campo edad");
            formulario.edad.focus();
            return false;
        }
    }

    var edad = parseInt(edadVal, 10);
    if (edad < 1 || edad > 120) {
        alert("Por favor ingrese una edad válida (entre 1 y 120)");
        formulario.edad.focus();
        return false;
    }

    // ── VALIDACIÓN DEL CORREO ELECTRÓNICO ─────────────────────────────────
    var correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var emailVal = formulario.email.value.trim();

    if (emailVal === "") {
        alert("Por favor ingrese su correo electrónico");
        formulario.email.focus();
        return false;
    }

    if (!correoRegex.test(emailVal)) {
        alert("Por favor ingrese un correo electrónico válido");
        formulario.email.focus();
        return false;
    }

    // ── VALIDACIÓN DEL COMENTARIO ──────────────────────────────────────────
    var comentario = formulario.comentario.value.trim();
    if (comentario.length < 10) {
        alert("Por favor ingrese un comentario de al menos 10 caracteres");
        formulario.comentario.focus();
        return false;
    }

    alert("¡Registro enviado correctamente!");
    return true;
}
