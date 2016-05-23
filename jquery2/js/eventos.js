
var iniciaApp = function(){
	var validarEntrada = function(){
		//Invalida los eventos que no corresponden a esta función.
		event.preventDefault();
		var usuario = $("#txtUsuario").val();
		var clave = $("#txtClave").val();
		//Validaciones
		//1.- Que no sean vacíos:
		if(usuario == ""){
			alert("El usuario no debe ser vacío");
			$("#txtUsuario").focus();
		}
		if(clave == ""){
			alert("La contraseña no debe ser vacío");
			$("#txtClave").focus();
		}
		//2.- Verificar usuario y contraseña:
		var parametros = "accion=validaEntrada"+
						 "&usuario="+usuario+
						 "&clave="+clave+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Validar al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if (response.respuesta){
					$("#datosUsuario").hide();
					$("nav").show("slow");
				} else{
					alert("Usuario/contraseña incorrecto(s)");
				}
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log("Algo salió mal");
			}
		});
		/*if(usuario == "pw" && clave == "1234"){
			alert("Bienvenido "+usuario);
			//Dar entrada al usuario:
			$("#datosUsuario").hide(); //escondemos
			$("nav").show("slow"); //mostramos
		} else{
			alert("Usuario y/o contraseña incorrecta(s)");
		}*/
		
		console.log("Se disparó el Submit");
	}

	var contadora = 1;
	window.onload = function(){
    	document.getElementById("btnAltas").onclick = function(){
       		contadora++;
    	}
	}
	var contador = 1;
		window.onclick = function(){
    		document.getElementById("btnBajas").onclick = function(){
        		contador++;
    	}
	}

	var Altas = function()
	{
		//Mostramos el formulario
		//$("nav").hide();
		
		if(contadora%2==0){
			$("#altaUsuarios").hide("slow");
		}
		else
		{
			if(contador%2!=0){
			$("#altaUsuarios").show("slow");
			}
		}
	}

	var AltaUsuario = function()
	{
		event.preventDefault();
		//alert($("#frmAltaUsuarios").serialize());
		var datos = $("#frmAltaUsuarios").serialize();
		var parametros = "accion=guardaUsuario&"+datos+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Validar al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta == true){
					alert("Usuario registrado correctamente");
					$("#altaUsuarios").hide("slow");
				}
				else
				{
					alert("No se pudo guardar la informacion");
				}
			},
			error: function(xhr,ajx,thrownError){

			}
		});
	}

	var Bajas = function()
	{
		//Mostramos el formulario
		//$("nav").hide();
		
		if(contador%2==0){
			$("#bajaUsuarios").hide("slow");
		}
		else
		{
			if(contadora%2!=0){
			$("#bajaUsuarios").show("slow");
			}
		}
	}
	
	var BajaUsuario = function()
	{
		event.preventDefault();
		//alert($("#frmAltaUsuarios").serialize());
		var datos = $("#frmBajaUsuarios").serialize();
		var parametros = "accion=bajaUsuario&"+datos+
						 "&id="+Math.random();
		//var parametros = "accion=guardaUsuario&"+datos+
		$.ajax({
			beforeSend: function(){
				console.log("Validar al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				console.log(response);
				if(response.respuesta == true){
					alert("Usuario eliminado correctamente");
					$("#bajaUsuarios").hide("slow");
				}
				else
				{
					alert("Usuario no registrado");
				}
			},
			error: function(xhr,ajx,thrownError){

			}
		});
	}

	var BuscaUsuario = function()
	{
		event.preventDefault();
		var datos = $("#txtNombreUsuarioBaja").serialize();
		var parametros = "accion=buscaUsuario&"+datos+
						 "&id="+Math.random();
		//var parametros = "accion=guardaUsuario&"+datos+
		$.ajax({
			beforeSend: function(){
				console.log("Validar al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				console.log(response);
				
			},
			error: function(xhr,ajx,thrownError){

			}
		});
	}
	
	$("#frmValidaEntrada").on("submit",validarEntrada);
	$("#btnAltas").on("click",Altas);
	$("#frmAltaUsuarios").on("submit",AltaUsuario);
	$("#btnBajas").on("click",Bajas);
	$("#frmBajaUsuarios").on("submit",BajaUsuario);
	$("#txtNombreUsuarioBaja").on("focusout", BuscaUsuario);
}
$(document).on("ready",iniciaApp);