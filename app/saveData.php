<?php
require_once __DIR__ . "/config.php";

//Se verifica si existe envio POST de al menos un dato
if(isset($_POST["codigo"])&&$_POST["codigo"]!=''){

    //obtengo la conexion a la base de datos
    $DBConn = getConnection();

    //Verifico si el producto que se esta ingresando ya existe en la BBDD
    $ActionSQL = 'SELECT COUNT(id_bodega) AS Cuenta FROM productos_listado WHERE codigo = ?';
    $result    = $DBConn->prepare($ActionSQL);
    $result->execute([$_POST["codigo"]]);
    $nRows = $result->fetchColumn();

    //si no existe el producto se inserta
    if($nRows==0){
        //Consulta
        $ActionSQL = "INSERT INTO productos_listado (id_bodega,id_sucursal,id_moneda,codigo,nombre,precio,checkbox_1,checkbox_2,checkbox_3,checkbox_4,checkbox_5,descripcion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        $result    = $DBConn->prepare($ActionSQL);
        //guarda dato
        try {
            $result->execute([$_POST["id_bodega"],$_POST["id_sucursal"],$_POST["id_moneda"],$_POST["codigo"],$_POST["nombre"],$_POST["precio"],$_POST["checkbox_1"],$_POST["checkbox_2"],$_POST["checkbox_3"],$_POST["checkbox_4"],$_POST["checkbox_5"],$_POST["descripcion"] ]);
            //Se ejecuto correctamente
            echo sendData(200, 'ok');
        //Si hay error
        }catch (Exception $e){
            echo sendData(400, 'Error en la BBDD: '.$e);
        }
    //si existe se indica
    }else{
        echo sendData(400, 'El codigo del producto ya esta registrado.');
    }
}else{
    echo sendData(400, 'No hay datos enviados');
}

