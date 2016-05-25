
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
					$("#inicio").show("slow");
				} else{
					$("#usuarioIncorrecto").show("slow");
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
			$("#inicio").hide("slow");
			contAltas = 1;
			contBajas = 0;
			contConsultas = 0;
			contActualiza = 0;
			contInicio = 0;
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
					$("#usuarioRegistrado").show("slow");
				}
				else
				{
					$("#usuarioNoRegistrado").show("slow");
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
			$("#inicio").hide("slow");
			contActualiza = 0;
			contBajas = 1;
			contAltas = 0;
			contConsultas = 0;
			contInicio = 0;
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
					$("#usuarioEliminado").show("slow");
				}
				else
				{
					$("#usuarioNoRegistrado2").show("slow");
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
					$("#usuarioNoRegistrado2").show("slow");
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
			$("#inicio").hide("slow");
			contActualiza = 0;
			contConsultas = 1;
			contAltas = 0;
			contBajas = 0;
			contInicio = 0;
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
			$("#inicio").hide("slow");
			contActualiza = 1;
			contConsultas = 0;
			contAltas = 0;
			contBajas = 0;
			contInicio = 0;
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
					$("#usuarioActualizado").show("slow");
				}
				else
				{
					$("#usuarioNoRegistrado2").show("slow");
				}
				contActualiza = 0;
			},
			error: function(xhr,ajx,thrownError){

			}
		});
	}

	var BajaDinamica = function()
	{
		//event.preventDefault();
		var usuario = $(this).attr("id");
		//document.cookie = "var="+usuario;
		//var datos = $(usuario).serialize();
		var parametros = "accion=bajaDinamica&usuario="+usuario+
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
					alert("netra");
					$("#usuarioEliminado").show("slow");
				}
				else
				{
					$("#usuarioNoRegistrado2").show("slow");
				}
				contBajas=0;
			},
			error: function(xhr,ajx,thrownError){

			}
		});
		
	}

	var CerrarAlert = function()
	{
		$("#usuarioIncorrecto").hide("slow");
		$("#usuarioRegistrado").hide("slow");
		$("#usuarioNoRegistrado").hide("slow");
		$("#usuarioEliminado").hide("slow");
		$("#usuarioNoRegistrado2").hide("slow");
		$("#usuarioActualizado").hide("slow");
	}

	var Salir = function()
	{
		location.reload();
	}
	var contFlechas = 0;
	
	var FlechaL = function()
	{
		$("#art1").hide("fast");
		$("#art2").show("fast");
		$("#art3").hide("fast");
	}

	var FlechaR = function()
	{
		$("#art1").show("fast");
		$("#art2").hide("fast");
		$("#art3").hide("fast");
	}

	var FlechaM = function()
	{
		$("#art1").hide("fast");
		$("#art2").hide("fast");
		$("#art3").show("fast");
	}

	var contInicio = 0;
	var Inicio = function()
	{
		if(contInicio == 0)
		{
			$("#bajaUsuarios").hide("slow");
			$("#altaUsuarios").hide("slow");
			$("#consultasUsuarios").hide("slow");
			$("#actualizaUsuarios").hide("slow");
			$("#inicio").show("slow");
			contInicio = 1;
			contAltas = 0;
			contBajas = 0;
			contConsultas = 0;
			contActualiza = 0;
		}else{

			//$("#inicio").hide("slow");
			contInicio = 0;
		}

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
	$(".close").on("click",CerrarAlert);
	$("#salir").on("click",Salir);
	//Eventos Dinamicos
	$("#tablaConsultas").on("click","button",BajaDinamica);
	//Otra forma
	//$("#tablaConsultas > input").on("click",BajaDinamica)
	$("#flechaL").on("click",FlechaL);
	$("#flechaR").on("click",FlechaR);
	$("#flechaM").on("click",FlechaM);
	$("#btnInicio").on("click",Inicio);
}
$(document).on("ready",iniciaApp);