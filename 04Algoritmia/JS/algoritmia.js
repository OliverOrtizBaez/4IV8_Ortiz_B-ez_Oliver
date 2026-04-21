function problema1(){

}
function problema2(){
    //primero ocupo obtener los valores de la tabla
    var p2_x1 = document.querySelector("#p2_x1").value;
    var p2_x2 = document.querySelector("#p2_x2").value;
    var p2_x3 = document.querySelector('#p2_x3').value;
    var p2_x4 = document.querySelector('#p2_x4').value;
    var p2_x5 = document.querySelector('#p2_x5').value;
    
    var p2_y1 = document.querySelector('#p2_y1').value;
    var p2_y2 = document.querySelector('#p2_y2').value;
    var p2_y3 = document.querySelector('#p2_y3').value;
    var p2_y4 = document.querySelector('#p2_y4').value;
    var p2_y5 = document.querySelector('#p2_y5').value;

    // creamos los vectores
    var v1 = [p2_x1, p2_x2, p3_x3, p4_x4, p5_x5]
    var v2 = [p2_y1, p2_y2, p3_y3, p4_y4, p5_y5]

    //ordenar los elemnetos para permutar

    v1 = v1.sort (function(a,b) {
        return b-a
    });
    v2 = v2.sort (function(a,b) {
        return b-a
    });
    //para revertir
    v2 = v2.reverse();
    //para multiplicar nesecitamos un for
    var p2_producto = 0;

    for(var i = 0; i < v1.length; i++){
        p2_producto += v1[i] * v2[i];
    }
    document.querySelector('#p2_output').textContent = "El producto escalar minimo es de: " + p2_producto;
}
function problema3(){

}
