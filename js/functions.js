/*****************************************************************************/
/*        Permite cargar informacion en un elemento al seleccionarlo         */
/*****************************************************************************/
//carga de las bodegas
$(document).on('focus', '#id_bodega', function () {
    //Ejecuto
    let Metodo      = 'POST';
    let Direccion   = 'app/getData.php';
    let Informacion = {"type": "bodegas"};
    const Options     = {
        showNoti:'',
        addIn:'id_bodega',
    };
    //Se envian los datos al formulario
    SendDataForms(Metodo, Direccion, Informacion, Options);
});
/******************************************/
//carga de las monedas
$(document).on('focus', '#id_moneda', function () {
    //Ejecuto
    let Metodo      = 'POST';
    let Direccion   = 'app/getData.php';
    let Informacion = {"type": "monedas"};
    const Options     = {
        showNoti:'',
        addIn:'id_moneda',
    };
    //Se envian los datos al formulario
    SendDataForms(Metodo, Direccion, Informacion, Options);
});
/******************************************/
//carga de las sucursales solo si se ha seleccionado algo en las bodegas
$('#id_bodega').on('change', function(){
    //Ejecuto
    let Metodo      = 'POST';
    let Direccion   = 'app/getData.php';
    let Informacion = {"type": "sucursales", "id_bodega": this.value};
    const Options     = {
        showNoti:'',
        addIn:'id_sucursal',
    };
    //Se envian los datos al formulario
    SendDataForms(Metodo, Direccion, Informacion, Options);
});
/******************************************/
//se guardan los datos
$("#FormNewData").submit(function(e) {
    e.preventDefault();
    //Validaciones
    var errors = new Array();
    errors[0] = ValidateDataForms('codigo', 'El código del producto', true, 5, 15, 1);
    errors[1] = ValidateDataForms('nombre', 'El nombre del producto', true, 2, 50, 0);
    errors[2] = ValidateDataForms('precio', 'El precio  del producto', true, 1, 50, 2);
    errors[3] = ValidateCheckForms('checkbox_', 'materiales para el producto', 2, 5);
    errors[4] = ValidateSelectForms('id_bodega', 'una bodega');
    errors[5] = ValidateSelectForms('id_sucursal', 'una sucursal para la bodega seleccionada');
    errors[6] = ValidateSelectForms('id_moneda', 'una moneda para el producto');
    errors[7] = ValidateDataForms('descripcion', 'La descripción del producto ', true, 10, 1000, 0);
    //Filtro eliminando los vacios
    var filter = errors.filter(function (el) {
        return el != null;
    });
    //ejecuto
    //Si hay errores se muestran
    if (Array.isArray(filter) && filter.length > 0) {
        alert(filter.join("\n"));
    //Si todo esta correcto
    }else{
        //Ejecuto
        let Metodo      = 'POST';
        let Direccion   = 'app/saveData.php';
        let Informacion = $("#FormNewData").serialize();
        const Options     = {
            showNoti:'Dato Creado Correctamente',
        };
        //Se envian los datos al formulario
        SendDataForms(Metodo, Direccion, Informacion, Options);
    }
});
/*****************************************************************************/
/*                             Funcion Ajax                                  */
/*****************************************************************************/
//Se ejecuta formulario
function SendDataForms(Metodo, Direccion, Informacion, Options) {
    //consulto los datos
    $.ajax({
        method: Metodo,
        url: Direccion,
        data: Informacion,
    }).done(function(data, textStatus, jqXHR) {
        //Mostrar Notificacion
        if(Options.showNoti!=''){alert(Options.showNoti);}
        //Agregar datos en el elemento
        if(Options.addIn!=''){
            //transformo a objeto
            const obj = JSON.parse(jqXHR.responseText);
            //Vaciar select y poner opcion por defecto
            $("#"+Options.addIn).empty().append('<option value="0" selected="">Seleccione una opción</option>');
            //Agregar elementos al select
            for ( i = 0; i < obj.length; i++) {
                $("#"+Options.addIn).append('<option value="'+obj[i].id+'">'+obj[i].nombre+'</option>');
            }
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // Se verifica la respuesta
        if (jqXHR.responseText) {
            //se muestra el mensaje
            alert(jqXHR.responseText);
        }else {
            //se muestra el mensaje
            alert('No existen datos.');
        }
    });
}
//Se validan los inputs
function ValidateDataForms(Element, Name, Require, LengthMin, LengthMax, Format) {
    //Elemento a validar
    let elemVal    = $("#"+Element).val();
    //Largo del texto
    let elemLength = elemVal.length;
    //Si elemento es obligatorio
    if(Require === true && elemLength===0){
        return Name+' no puede estar en blanco';
    }
    //Si elemento esta dentro del largo esperado
    if (elemLength < LengthMin || elemLength > LengthMax) {
        return Name+' debe tener entre '+LengthMin+' y '+LengthMax+' caracteres.';
    }
    //Validacion formato
    switch (Format) {
        //sin validacion
        case 0:
            //nada
            break;
        //letras y numeros
        case 1:
            var pattern1 = /^([a-z0-9]+)$/i;
            var pattern2 = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;
            if (!pattern1.test(elemVal)) {
                return Name + ' debe contener letras y números';
            }
            if (!pattern2.test(elemVal)) {
                return Name + ' debe tener al menos una letra y un numero';
            }
            break;
        //numeros positivos con dos decimales
        case 2:
            var pattern = /^\.?(?!-)\d+(?:\.\d{1,2})?$/i;
            if (!pattern.test(elemVal)) {
                return Name + ' debe ser un número positivo con hasta dos decimales';
            }
            break;
    }

}
//Se validan los check
function ValidateCheckForms(Element, Name, nSelec, nItems) {
    //variables
    let internalCount = 0;
    let isChecked     = false;
    //Recorro los items
    for (let i = 1; i <= nItems; i++) {
        //Se verifica si esta marcado
        isChecked = $("#" + Element + i).is(":checked");
        //se cuenta
        if(isChecked===true){
            internalCount++;
        }
    }
    //Se verifica la cantidad de check marcados
    if(internalCount<nSelec){
        return 'Debe seleccionar al menos '+nSelec+' '+Name+'.';
    }

}
//Se validan los select
function ValidateSelectForms(Element, Name) {
    //Elemento a validar
    let elemVal = $("#"+Element).val();
    //Se verifica si esta seleccionado
    if(elemVal==='0'){
        return 'Debe seleccionar ' + Name + '.';
    }
}




