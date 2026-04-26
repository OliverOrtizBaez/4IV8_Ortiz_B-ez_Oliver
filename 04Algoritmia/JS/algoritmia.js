function problema1() {
    var LetOK = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz ";
    var todo_p1 = document.querySelector("#p1-input").value;
 
    if (todo_p1.trim() === "" || /^\s+$/.test(todo_p1)) {
        document.querySelector('#p1-output').textContent = "Formato no válido o campo vacío.";
        return;
    }
 
    var normalizado = todo_p1.replace(/\s+/g, " ").trim();
 
    var esValido = true;
    for (var i = 0; i < normalizado.length; i++) {
        if (LetOK.indexOf(normalizado.charAt(i)) === -1) {
            esValido = false;
            break;
        }
    }
 
    if (!/[A-Za-záéíóúÁÉÍÓÚñÑ]/.test(normalizado)) {
        esValido = false;
    }
 
    if (esValido) {
        var texto = normalizado;
        var resultado = "";
        var palabraTemporal = "";
        for (var j = texto.length - 1; j >= 0; j--) {
            var caracter = texto.charAt(j);
 
            if (caracter !== " ") {
                palabraTemporal = caracter + palabraTemporal;
            } else {
                if (palabraTemporal !== "") {
                    resultado += palabraTemporal + " ";
                    palabraTemporal = "";
                }
            }
        }
        resultado += palabraTemporal;
        document.querySelector('#p1-output').textContent = "Las palabras invertidas son: " + resultado.trim();
    } else {
        document.querySelector('#p1-output').textContent = "Formato no válido o campo vacío.";
    }
}
 
function problema2(){
    var p2_x1 = document.querySelector("#p2-x1").value;
    var p2_x2 = document.querySelector("#p2-x2").value;
    var p2_x3 = document.querySelector('#p2-x3').value;
    var p2_x4 = document.querySelector('#p2-x4').value;
    var p2_x5 = document.querySelector('#p2-x5').value;
    
    var p2_y1 = document.querySelector('#p2-y1').value;
    var p2_y2 = document.querySelector('#p2-y2').value;
    var p2_y3 = document.querySelector('#p2-y3').value;
    var p2_y4 = document.querySelector('#p2-y4').value;
    var p2_y5 = document.querySelector('#p2-y5').value;
 
    var numOK = "0123456789.-";
    var esValido = true;
    var todos_los_valores = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5, p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];
 
    for(var a = 0; a < todos_los_valores.length; a++){
        var textoX = todos_los_valores[a].trim();
        if(textoX === ""){
            esValido = false;
            break;
        }
        for(var b = 0; b < textoX.length; b++){
            var caracter = textoX.charAt(b);
            if(numOK.indexOf(caracter) === -1){
                esValido = false;
                break;
            }
        }
        if(!esValido) break;
 
        var num = Number(textoX);
        if(isNaN(num) || !isFinite(num)){
            esValido = false;
            break;
        }
 
        var puntos = textoX.split('.').length - 1;
        var guiones = (textoX.match(/-/g) || []).length;
        if(puntos > 1 || guiones > 1 || (guiones === 1 && textoX.indexOf('-') !== 0)){
            esValido = false;
            break;
        }
    }
 
    if(esValido){
        var v1 = [Number(p2_x1), Number(p2_x2), Number(p2_x3), Number(p2_x4), Number(p2_x5)];
        var v2 = [Number(p2_y1), Number(p2_y2), Number(p2_y3), Number(p2_y4), Number(p2_y5)];
 
        v1 = v1.sort (function(a,b) {
            return a-b
        });
        v2 = v2.sort (function(a,b) {
            return b-a
        });
 
        var p2_producto = 0;
 
        for(var i = 0; i < v1.length; i++){
            p2_producto += v1[i] * v2[i];
        }
        document.querySelector('#p2-output').textContent = "El producto escalar minimo es de: " + p2_producto;
    } else {
        document.querySelector('#p2-output').textContent = "Por favor, ingresa solo números.";
    }
}
 
function problema3() {
    var LetOK = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ,";
    var input = document.querySelector('#p3-input').value;
 
    var esValido = true;
 
    if (input.trim() === "") {
        esValido = false;
    }
 
    if (esValido && /^,|,$|,,/.test(input)) {
        esValido = false;
    }
 
    if (esValido) {
        for (var i = 0; i < input.length; i++) {
            var caracterActual = input.charAt(i);
            if (LetOK.indexOf(caracterActual) === -1) {
                esValido = false;
                break;
            }
        }
    }
 
    if (esValido) {
        var palabrasCheck = input.split(',');
        for (var k = 0; k < palabrasCheck.length; k++) {
            if (palabrasCheck[k].trim() === "") {
                esValido = false;
                break;
            }
        }
    }
 
    if (esValido) {
        var palabras = input.split(',');
        var palabraGanadora = "";
        var maxUnicos = 0;
 
        for (var i = 0; i < palabras.length; i++) {
            var palabraActual = palabras[i].trim();
            var letrasVistas = "";
            var conteoUnicos = 0;
 
            for (var j = 0; j < palabraActual.length; j++) {
                var letra = palabraActual.charAt(j);
                if (letrasVistas.indexOf(letra) === -1) {
                    letrasVistas += letra;
                    conteoUnicos++;
                }
            }
 
            if (conteoUnicos > maxUnicos) {
                maxUnicos = conteoUnicos;
                palabraGanadora = palabraActual;
            }
        }
 
        document.querySelector('#p3-output').textContent = 
            "La palabra con más caracteres únicos es: " + palabraGanadora + " (" + maxUnicos + " únicos)";
            
    } else {
        document.querySelector('#p3-output').textContent = "Formato no válido: Solo Mayúsculas (A-Z) separadas por comas.";
    }
}