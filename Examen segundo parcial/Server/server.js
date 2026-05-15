// vi que las primeras lineas de codigo creaban como tal el servidor, rutas y extraian parametros del json, procesos que
// simplifique usando el framework express, y en estas primeras lineas de codigo lo importe
const express = require('express');
const mysql = require('mysql2');
// Aqui volvi a usar esta misma instancia, asimismo puse el puerto en el que iria el servidor con respecto a la base de datos
const app = express();
const PORT = process.env.PORT || 3000;
//aqui ya puse los datos propios de la base de datps
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'F20CBfEjt',
    database: 'pnt_practica1',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
 //estableci la promesa de ejecucion tal cual en el codigo original
const db = pool.promise();
// reemplze el metodo que tenia para servir el archivo, asi como la de lectura, la tabla y el path.join con la misma funcion
app.use(express.static('public'));
//aqui se respondera el json, asi que por eso quite la funcion que lo hacia
app.use(express.json());
//y por ultimo aqui inicio el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
