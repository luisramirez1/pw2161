
var iniciaApp = function(){
	//var banderaAlta=true;
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
	contAltas = 0;
	var Altas = function()
	{
		//Mostramos el formulario
		if(contAltas == 0)
		{
			$("#bajaUsuarios").hide("slow");
			$("#altaUsuarios").show("slow");
			$("#consultasUsuarios").hide("slow");
			$("#actualizaUsuarios").hide("slow");
			contAltas = 1;
			contBajas = 0;
			contConsultas = 0;
			contActualiza = 0;
		}else{

			$("#altaUsuarios").hide("slow");
			contAltas = 0;
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
				contAltas=0;
			},
			error: function(xhr,ajx,thrownError){

			}
		});
	}
	var contBajas = 0;
	var Bajas = function()
	{
		//Mostramos el formulario
		if(contBajas == 0)
		{
			$("#bajaUsuarios").show("slow");
			$("#altaUsuarios").hide("slow");
			$("#consultasUsuarios").hide("slow");
			$("#actualizaUsuarios").hide("slow");
			contActualiza = 0;
			contBajas = 1;
			contAltas = 0;
			contConsultas = 0;
		}else{

			$("#bajaUsuarios").hide("slow");
			contBajas = 0;
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
				contBajas=0;
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
				if(response.respuesta)
				{
					$("#txtNombreUsuario").val(response.nom);		
					$("#txtClaveUsuarioBaja").val(response.cla);
					$("#txtTipoUsuarioBaja").val(response.tipo);
					$("#txtDepartamentoBaja").val(response.depto);
					$("#txtClaveUsuarioBaja, #txtTipoUsuarioBaja, #txtDepartamentoBaja").show("slow");
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

	var BuscaUsuario2 = function()
	{
		$("#txtClaveUsuarioBaja, #txtTipoUsuarioBaja, #txtDepartamentoBaja").hide("slow");
	}

	var contConsultas = 0;
	var Consultas = function()
	{
		if(contConsultas == 0)
		{
			$("#bajaUsuarios").hide("slow");
			$("#altaUsuarios").hide("slow");
			$("#consultasUsuarios").show("slow");
			$("#actualizaUsuarios").hide("slow");
			contActualiza = 0;
			contConsultas = 1;
			contAltas = 0;
			contBajas = 0;
		}else{

			$("#consultasUsuarios").hide("slow");
			contConsultas = 0;
		}

		var parametros = "accion=consultas"+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Consultas usuarios");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if (response.respuesta == true) 
				{
					$("#tablaConsultas").html(response.tabla);
				}
		    },
		    error: function(xhr,ajx,thrownError){

			}
		});
	}

	var contActualiza = 0;
	var Actualiza = function()
	{
		if(contActualiza == 0)
		{
			$("#bajaUsuarios").hide("slow");
			$("#altaUsuarios").hide("slow");
			$("#consultasUsuarios").hide("slow");
			$("#actualizaUsuarios").show("slow");
			contActualiza = 1;
			contConsultas = 0;
			contAltas = 0;
			contBajas = 0;
		}else{

			$("#actualizaUsuarios").hide("slow");
			contActualiza = 0;
		}
	}

	var ActualizaUsuario = function()
	{
		event.preventDefault();
		//alert($("#frmAltaUsuarios").serialize());
		var datos = $("#frmActualizaUsuarios").serialize();
		var parametros = "accion=actualizaUsuario&"+datos+
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
					alert("Usuario actualizado correctamente");
					$("#actualizaUsuarios").hide("slow");
				}
				else
				{
					alert("Usuario no registrado");
				}
				contActualiza = 0;
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
	$("#txtNombreUsuarioBaja").on("focus", BuscaUsuario2);
	$("#btnConsultas").on("click",Consultas)
	$("#btnActualizaUsuario").on("click",Actualiza);
	$("#frmActualizaUsuarios").on("submit",ActualizaUsuario);
}
$(document).on("ready",iniciaApp);