//primero nescecitamos crear un servidor para la aplicacion y ahi mismo montar nuestra base de datos
//este es el modulo nativo para cualquier servidor
const http = require('http');
//modulo para leer archivos del sistema
const fs = require('fs');
//modulo de la ruta identificar el archivo
const path = require('path');
//modulo para extraer parametros
const url = require('url');

//se tiene que desgargar el modulo con 

const mysql = require('mysql2');
const { resolve } = require('dns');
const { rejects } = require('assert');

//configurar el servidor

const PORT = process.env.PORT || 3000

//conectar a la base de datos

const pool = mysql.createPool(
    {
    host: 'localhost',
    user: 'root',
    password: 'F20CBfEjt',
    database: 'pnt_practica1',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

    }
);

//debemos configurar los tipos de archivos que son aceptados 

const MIME_TYPES = {
    'html':'text/html ; charset=utf-8',
    'css':'text/css; charset=utf-8',
    'js':'application/javascript; charset=utf-8',
    'json':'application/json; charset=utf-8',
    'png' : 'image/png',
    'jpg' : 'image/jpeg',
    'ico' : 'image/x-ico',
}

function servirArchivoEstatico(req, res){
    let filePath = req.url === '/'?'/index.html':req.url;

    const fullPath = path.join(__dirname, 'public', filePath);

    const ext = path.extname(fullPath);

    const mimeType = MIME_TYPES[ext];

    if(!mimeType){
        res.writeHead(404, {'Content-Type' : 'text/plain: charset=utf-8'});
        res.end('Archivo no encontrado');
        return;
    }
    //leemos el archivo cuando si existe
    fs.readFile(fullPath, (error, contenido)=>{
        if (error){
         res.writeHead(404, {'Content-Type' : 'text/plain: charset=utf-8'});
        res.end('Archivo no encontrado');   
        } else{
            res.writeHead(200, {'Content-Type': mimeType});
            res.end(contenido);
        }
    })
}

//debo crear una promesa de conexion 
const db = pool.promise();
//esto nos permite escribir codigo asincrono que tendra un tiempo de espera para conectarse, procesarse y dar una respuesta

//debemos atender cada una de las peticiones que vengan por parte de public 

function leerBody(req){
    return new Promise(resolve, reject=>{
        let body = '';
        //nosotros vamos a tener un evento que se dispara cada vez que llega un pedazo de los datos
        req.on('data', (chunk) => {
            body += chunk-toString();
            if(body.length > 1e6){
                req.destroy();
                reject(new Error('Body demasiado grande'));
            }
        });
    // el evento end se dispara  uando todos los datos han llegado
    req.on('end', () => {
        try{
            resolve(JSON.parse(body));

        } catch(e){
            reject(new Error('JSON imvalido'))
        }
    });
    req.on('error', reject);
    });
}
//este elemento nos sirve para dar respuestas
function enviarJSON(res, statusCode, data){
    res.writeHead(statusCode, {'Content-Type' : 'application/json; charset=utf-8'});
    res.end(JSON.stringify)
}