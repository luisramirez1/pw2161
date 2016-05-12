var iniciaApp = function()
{
	var validarEntrada=function()
	{
		event.preventDefault(); //Invalida los eventos que no corresponden a esta funcion
		var usuario = $("#txtUsuario").val();
		var clave = $("#txtClave").val();
		//validaciones
		//1.- Que no sean vacios
		if(usuario  == "")
		{
			alert("El usuario no debe ser vacio");
			$("#txtUsuario").focus();
		}
		if(clave  == "")
		{
			alert("La clave no debe ser vacio");
			$("#txtClave").focus();
		}

		//2.- Verificar usuraio y contraseña
		var parametros="accion=validaEntrada"+
						"&usuario="+usuario+
						"&clave="+clave 
		$.ajax({
			beforeSend:function(){
				console.log("Validar al usuario");
			},
			cache: false, 
			type: "POST",
			dataType: "json",
			url:"php/funciones.php",
			data:parametros,
			succes: function(response){

			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log("Algo salio mal");
			}
		});
		console.log("Se disparó el submit");
	}

	$("#frmValidaEntrada").on("submit",validarEntrada);
}

$(document).on("ready",iniciaApp);