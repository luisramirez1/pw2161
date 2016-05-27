var iniciaApp = function(){

	var Inicio = function()
	{
		$("#inicio").show("slow");
	}

	var Altas = function ()
	{
		$("#altaEncuestas").show("slow");
	}

	var AltaEncuestas = function()
	{
		event.preventDefault();
		//alert($("#frmAltaUsuarios").serialize());
		var datos = $("#frmAltaEncuestas").serialize();
		var parametros = "accion=guardaEncuesta&"+datos+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Validar encuesta");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta == true){
					$("#encuestaRegistrada").show("slow");
				}
				else
				{
					$("#encuestaNoRegistrada").show("slow");
				}
				contAltas=0;
			},
			error: function(xhr,ajx,thrownError){

			}
		});
	}

	var Bajas = function()
	{
		$("#bajaEncuestas").show("slow");
	}

	var BajaEncuestas = function()
	{
		event.preventDefault();
		//alert($("#frmAltaUsuarios").serialize());
		var datos = $("#frmBajaEncuestas").serialize();
		var parametros = "accion=bajaEncuesta&"+datos+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Validar encuesta");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta == true){
					$("#encuestaEliminada").show("slow");
				}
				else
				{
					$("#encuestaNoEliminada").show("slow");
				}
				contAltas=0;
			},
			error: function(xhr,ajx,thrownError){

			}
		});
	}

var BuscaEncuesta = function()
	{
		event.preventDefault();
		var datos = $("#txtNombreEncuestaBaja").serialize();
		var parametros = "accion=buscaEncuesta&"+datos+
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
					$("#txtClaveEncuestaBaja").val(response.claveE);		
					$("#txtNombreEncuestaBaja").val(response.nombreE);
					$("#txtPregunta1Baja").val(response.p1E);
					$("#txtRespuesta1Baja").val(response.r1E);
					$("#txtPregunta2Baja").val(response.p2E);
					$("#txtRespuesta2Baja").val(response.r2E);
					$("#txtPregunta3Baja").val(response.p3E);
					$("#txtRespuesta3Baja").val(response.r3E);
					$("#txtFechaEncuestaBaja").val(response.fechaE);
					$("#txtSemestreBaja").val(response.semestreE);
					$("#txtPregunta1Baja, #txtPregunta2Baja, #txtPregunta3Baja, #txtRespuesta1Baja, #txtRespuesta2Baja, #txtRespuesta3Baja, #txtFechaEncuestaBaja, #txtSemestreBaja").show("slow");
				}
				else
				{	
					$("#encuestaNoRegistrado2").show("slow");
				}
			},
			error: function(xhr,ajx,thrownError){

			}
		});
	}

	var BuscaEncuesta2 = function()
	{
		$("#txtPregunta1Baja, #txtPregunta2Baja, #txtPregunta3Baja, #txtRespuesta1Baja, #txtRespuesta2Baja, #txtRespuesta3Baja, #txtFechaEncuestaBaja, #txtSemestreBaja").hide("slow");
	}

	var Actualiza = function()
	{
		$("#actualizaEncuestas").show("slow");
	}

	var ActualizaEncuesta = function()
	{
		event.preventDefault();
		var datos = $("#frmActualizaEncuestas").serialize();
		var parametros = "accion=actualizaEncuesta&"+datos+
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
					$("#encuestaActualizada").show("slow");
				}
				else
				{
					$("#encuestaNoRegistrada2").show("slow");
				}
				contActualiza = 0;
			},
			error: function(xhr,ajx,thrownError){

			}
		});
	}

	var Consultas = function()
	{
		$("#consultaEncuestas").show("slow");
	}

	$("#btnInicio").on("click",Inicio);
	$("#btnAltas").on("click",Altas);
	$("#frmAltaEncuestas").on("submit",AltaEncuestas);
	$("#btnBajas").on("click",Bajas);
	$("#frmBajaEncuestas").on("submit",BajaEncuestas);
	$("#txtNombreEncuestaBaja").on("focusout", BuscaEncuesta);
	$("#txtNombreEncuestaBaja").on("focus", BuscaEncuesta2);
	$("#btnActualiza").on("click",Actualiza);
	$("#frmActualizaEncuestas").on("submit",ActualizaEncuesta);
	$("#btnConsultas").on("click",Consultas);
}
$(document).on("ready",iniciaApp);