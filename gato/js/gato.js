var celda="";
var cont=0,contX=0, contO=0, cX=0, cO=0;
var empate=true, gano=false;

var jdX = prompt("Jugador para X", "X");
if(jdX == null)
{
	alert("Ingresa el Jugador para X");
	var jdX = prompt("Jugador para X", "X"); 
}

var jdO = prompt("Jugador para O", "O");
if(jdO == null)
{
	alert("Ingresa el Jugador para O");
	var jdO = prompt("Jugador para O", "O"); 
}

function nombreX()
{
  var nombre=document.getElementById("jdX").innerHTML=jdX;
  return nombre;
}

function nombreO()
{
  var nombre=document.getElementById("jdO").innerHTML=jdO;
  return nombre;
}

function clic(id){
//	var random = Math.random() >= 0.5;
	celda=id;
	var contenido=document.getElementById(celda).innerHTML;
	//Asigna X u O
	if(contenido==""){
		if(cont%2==0)
		{
		document.getElementById(celda).innerHTML="X";
		}else{	
			document.getElementById(celda).innerHTML="O";
		}
		cont++;
	}
//-----
	for(fila=1; fila<=3;fila++){
		for(col=1; col<=3 ;col++){
			if(document.getElementById(fila+""+col).innerHTML=="X"){
				contX++;
			}else if(document.getElementById(fila+""+col).innerHTML=="O"){
				contO++;
			}			
			if(contX==3){
				empate=false;
				alert("Ganador: "+jdX);
				document.location.reload();
				return;
			}else if(contO==3){
				alert("Ganador: "+jdO);
				document.location.reload();
				return;
			}
		}
		contX=0;
		contO=0;
	}
//|||||||
	for(col=1; col<=3;col++){
		for(fila=1; fila<=3 ;fila++){
			if(document.getElementById(fila+""+col).innerHTML=="X"){
				contX++;
			}else if(document.getElementById(fila+""+col).innerHTML=="O"){
				contO++;
			}
			if(contX==3){
				empate=false;
				alert("Ganador: "+jdX);
				document.location.reload();
				return;
			}else if(contO==3){
				alert("Ganador: "+jdO);
				document.location.reload();
				return;
			}
		}
		contX=0;
		contO=0;
	}
	//DIAGONAL PPAL
	for(fila=1; fila<=3;fila++)
	{
		for(col=1; col<=3 ;col++){
			var diag=fila+""+col
			if(fila==col){
				if(document.getElementById(diag).innerHTML=="X"){
					contX++;
				}else if(document.getElementById(diag).innerHTML=="O"){
					contO++;
				}
				if(contX==3){
					empate=false;
					alert("Ganador: "+jdX);
					document.location.reload();
				}else if(contO==3){
					empate=false;
					alert("Ganador: "+jdO);
					document.location.reload();
				}
			}
		}
	}
	contX=0;
	contO=0;
	//DIAG INVERSA
	if(document.getElementById(13).innerHTML=="O"&&document.getElementById(22).innerHTML=="O"
		&document.getElementById(31).innerHTML=="O")
	{
		empate=false;
		alert("Ganador: "+jdO);
		document.location.reload();
	}
	if(document.getElementById(13).innerHTML=="X"&&document.getElementById(22).innerHTML=="X"
		&document.getElementById(31).innerHTML=="X")
	{
		empate=false;
		alert("Ganador: "+jdX);
		document.location.reload();
	}
	//VALIDA
	
	if(empate==false){
		gano=true;
	}
	if(empate && cont==9){
		alert("Ganadores: "+jdX+" y "+jdO);
		document.location.reload();
	}
	
}