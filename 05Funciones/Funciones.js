// programar bajo el esquema ES6

/*
para javascrip el conceptop de var
puede asumir cualquier tipo
puede cambiarse
es tipo no tipado
se sustituye por:
let -- > tipo "protegida" por que solo funciona en un fragmento de codigo
cons --> si es constante

if (true) {
    const x = "x";
    console.log(x);
}
let x = y; 
console.log(x);

// para declarar las funciones hay una manera mas efectiva, con una funcion flecha
//una funcion flecha a diferencia de una normal no genera su propio contexto(this) nesecita ser declarada antes de ser usada y no nesecita un return
//funcion cosa(String ola) {this.hola = ola}

//funcion de 2 numeros
function sumarnumeros(n1,n2){
    return n1+n2;
}
const sumarDosnumeros = (n1,n2) => n1+n2;

console.log(`la suma de la funcion es: (2,3): ${sumarnumeros(2,3)} `);

console.log(`la suma de la funcion es: (4,3): ${sumarDosnumeros(5,3)} `);

//para armar una funcion flecha se tiene que entender su estructura
// "cadena" (el tipo de variable, nombre de la funcion y los argumentos)  => operación
*/

const razaDePerros = [
    "gran danes",
    "doverman",
    "chihuahua",
    "pastor aleman",
    "pitbull",
    "san bernardo",
    "xoloscuincle"
];
/*
for (let i = 0; i < razaDePerros.length; i++){
    console.log(razaDePerros[i]);
}

for(const raza of razaDePerros){
    console.log(raza);
}

for(const indice in razaDePerros){
    console.log(razaDePerros[indice]);
}
    forEach
    Itera sobre elementos de arreglo que devuelven nada 
   razaDePerros.forEach((raza, indice, arregloOriginal) => console.log(raza));
   razaDePerros.forEach(raza => console.log(raza));

nesecitamos una funcion para encontrar la raza chihuahua y si no existe agregarla
   

//funcion map esta funcion itera sobre los elementos del arreglo y regresa y arreglo diferente con el podemons hacer lo que queramos sin nesecidad de modificar el arreglo original

const razaDeperrosEnMayusculas = razaDePerros.map((raza, indice, razaDePerros) => console.log(razaDePerros.toUpperCase()));
*/

if(razaDePerros.find(raza => raza === "Chihuahua")){
    console.log ("la raza si se encontro y es chihuahua");
    console.log(razaDePerros);
} else {
    razaDePerros.push ("chihuahua");
    console.log("se agrego chihuahua al arreglo");
    console.log(razaDePerros);
}

