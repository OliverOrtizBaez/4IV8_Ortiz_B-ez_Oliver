var instrucciones = [
    "Utiliza las flechas de navegacion para mover las piezas",
    "Para ordenar las piezas guiate por la imagen objetivo"
];
// arreglo para guardar los movimientos

var movimientos = [];

//tengo que saber cuales son las posiciones originales del rompecabezas

var rompe = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];

//nesecito otra variable para saber que el orden del rompecabezas es el correcto

var rompeCorrecta = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];

//nesecito concoer la posicion de la ficha vacia

var filaVacia = 2;
var columnaVacia = 2;

//nesecito una funcion que se encarge de mostrar la lista de isntrucciones 

function mostrarInstrucciones(instrucciones){
    for(var i = 0; i < instrucciones.length; i++){
        mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }
}

function mostrarInstruccionesLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}