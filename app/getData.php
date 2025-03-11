<?php
require_once __DIR__ . "/config.php";

//Se verifica si existe envio POST
if(isset($_POST["type"])&&$_POST["type"]!=''){
    //obtengo la conexion a la base de datos
    $DBConn = getConnection();
    //Obtengo los datos segun solicitud
    switch ($_POST["type"]) {
        case 'bodegas':    $ActionSQL = 'SELECT id_bodega AS id, nombre   FROM bodegas_listado ORDER BY nombre ASC'; break;
        case 'monedas':    $ActionSQL = 'SELECT id_moneda AS id, nombre   FROM monedas_listado ORDER BY nombre ASC'; break;
        case 'sucursales': $ActionSQL = 'SELECT id_sucursal AS id, nombre FROM sucursales_listado WHERE id_bodega = '.$_POST["id_bodega"].' ORDER BY nombre ASC'; break;
    }

    /******************************************/
    //Ejecuto la query
    $result = $DBConn->prepare($ActionSQL);
    $result->execute();

    //envio la respuesta formateada
    echo sendData(200, $result->fetchAll(PDO::FETCH_OBJ));

}else{
    echo sendData(400, 'No hay datos');
}

