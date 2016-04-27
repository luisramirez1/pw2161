//jquery(etiquetas,clases,id,etc)
//$ alias (un sobrenombre)
//$ == jquery
//$(document).on encender evento 
//$(document).off apagar evento

var inicio = function ()
{	
	var clicBoton = function()
	{
		console.log("Clic del botón");
		//$(".anuncioWeb").html("Clic del botón");
		$(".anuncioWeb").append("Clic del botón"); //Se imprime varias veces

	}
	//Preparar los eventos de todos mis objetos
	$("#miBoton").on("click",clicBoton);
}

//Main
$(document).on("ready",inicio);