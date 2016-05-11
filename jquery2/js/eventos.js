var iniciaApp = function()
{
	var validarEntrada = function()
	{
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

		console.log("Se disparó el submit");
	}

	$("#frmValidaEntrada").on("submit",validarEntrada);
}

$(document).on("ready",iniciaApp);