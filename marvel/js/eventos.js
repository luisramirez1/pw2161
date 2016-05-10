//jquery(etiquetas,clases,id,etc)
//$ alias (un sobrenombre)
//$ == jquery
//$(document).on encender evento 
//$(document).off apagar evento

var inicio = function ()
{	
	var clicBoton = function()
	{
    var texto = $("#personaje").val();
    $("#tabla").html("");

		$.ajax({
			beforeSend:function(){
				console.log("Espere...");
			},
        url: "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=917a152f0e410214e0bec334a3bf6128&hash=64c0db5c2d22a1c31bf436e4ecc37edd&nameStartsWith="+texto,
        dataType: "json",
        success: function(data){
        console.log(data);
  			var resultados = data.data.results;
        var renglon = "<tr id='encabezado'><td>Nombre</td><td>Imagen</td><td>Descripción</td><td>Cómics</td></tr>";
        $("#tabla").append(renglon);
        renglon = '';
        for(var i = 0; i<= resultados.length-1; i++){
          renglon += '<tr>'+
                 '<td id="nombre">'+resultados[i].name+'</td>'+
                 '<td id="imagen"><img src='+resultados[i].thumbnail.path+"."+resultados[i].thumbnail.extension+'></td>'+
                 '<td id="descripcion">'+resultados[i].description+'</td>'+
                 '<td id="comic">'
                 for(var j=0;j<=resultados[i].comics.items.length-1;j++){
                  renglon += resultados[i].comics.items[j].name;
                 }
                 '</td>'+
                 '</tr>';                             
              }
        $("#tabla").append(renglon);
  	     
         
   			},
  			error:function(xhr,error,throws){
  				console.log("Ocurrio un error");
  			}
		});
	}

	$("#miBoton").on("click",clicBoton);
	
}

//Main
$(document).on("ready",inicio);