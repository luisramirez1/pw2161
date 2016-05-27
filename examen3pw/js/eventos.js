var iniciaApp = function(){

	var Inicio = function()
	{
		$("#inicio").show("slow");
		$("#altaAlmacenes").hide("slow");
	}

	var Altas = function ()
	{
		$("#altaAlmacenes").show("slow");
		$("#inicio").hide("slow");
	}

	var AltaAlmacenes = function()
	{
		event.preventDefault();
		//alert($("#frmAltaUsuarios").serialize());
		var datos = $("#frmAltaAlmacen").serialize();
		var parametros = "accion=guardaAlmacen&"+datos+
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
					$("#almacenRegistrado").show("slow");
					$("#txtIdAlmacen")=
				}
				else
				{
					$("#almacenNoRegistrado").show("slow");
				}
				contAltas=0;
			},
			error: function(xhr,ajx,thrownError){

			}
		});
	}

	var FlechaL = function()
	{
		$("#art1").show("slow");
		$("#art2").hide("slow");
		$("#art3").hide("slow");
	}

	var FlechaR = function()
	{
		$("#art1").hide("slow");
		$("#art2").show("slow");
		$("#art3").hide("slow");
	}

	var FlechaM = function()
	{
		$("#art1").hide("slow");
		$("#art2").hide("slow");
		$("#art3").show("slow");
	}

	var Cerrar = function()
	{
		$("#almacenNoRegistrado").hide("slow");
		$("#almacenRegistrado").hide("slow");

	}

	$("#btnInicio").on("click",Inicio);
	$("#btnAltas").on("click",Altas);
	$("#frmAltaAlmacen").on("submit",AltaAlmacenes);
	$("#flechaL").on("click",FlechaL);
	$("#flechaR").on("click",FlechaR);
	$("#flechaM").on("click",FlechaM);
	$(".close").on("click",Cerrar)
}
$(document).on("ready",iniciaApp);