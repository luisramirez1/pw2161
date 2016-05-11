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
		if(usuario=="pw" && clave=="1234"){
			//alert("Bienvenido " + usuario);
			//Dar entrada al usuario
			$("#datosUsuario").hide();//Esconder
			$("nav").show("slow");
		}
		console.log("Se disparó el submit");
	}

	$("#frmValidaEntrada").on("submit",validarEntrada);
}

$(document).on("ready",iniciaApp);