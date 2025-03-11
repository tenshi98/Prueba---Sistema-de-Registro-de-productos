<?php
/******************************/
//Obtengo conexion a la base de datos
function getConnection(){
    $Host        = "localhost";
    $puerto      = "5432";
    $BaseDeDatos = "prueba";
    $usuario     = "postgres";
    $contraseña  = "Inicio1*";
    try {
        $base_de_datos = new PDO("pgsql:host=$Host;port=$puerto;dbname=$BaseDeDatos", $usuario, $contraseña);
        $base_de_datos->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $base_de_datos;
    } catch (Exception $e) {
        return "Ocurrió un error con la base de datos: " . $e->getMessage();
    }
}


/******************************/
//Se envia la respuesta
function sendData($code,$message = ""){
    http_response_code($code);
    return json_encode($message);
}