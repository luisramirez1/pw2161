//Variables globales
var turno 			= false;
var letraCasilla 	="";
var cuentaJuego		=0;
var cuentaJugadas	=0;

function iniciaGato()
{
	//En construccion 
}

function validaJugada(letra)
{
	var ganador = false;
	var b11 = document.getElementById("unouno").innerHTML;
	var b12 = document.getElementById("unodos").innerHTML;
	var b13 = document.getElementById("unotres").innerHTML;
	var b21 = document.getElementById("dosuno").innerHTML;
	var b22 = document.getElementById("dosdos").innerHTML;
	var b23 = document.getElementById("dostres").innerHTML;
	var b31 = document.getElementById("tresuno").innerHTML;
	var b32 = document.getElementById("tresdos").innerHTML;
	var b33 = document.getElementById("trestres").innerHTML;

	//Jugadas
	//Renglones
	if(b11==b12 && b12==b13 && b11!="&nbsp;")
		ganardor = true;
	if(b21==b22 && b22==b23 && b21!="&nbsp;")
		ganardor = true;
	if(b31==b32 && b32==b33 && b31!="&nbsp;")
		ganardor = true;
	//Columnas
	if(b11==b21 && b21==b31 && b11!="&nbsp;")
		ganardor = true;
	if(b12==b22 && b22==b32 && b12!="&nbsp;")
		ganardor = true;
	if(b13==b23 && b23==b33 && b13!="&nbsp;")
		ganardor = true;
	//Diagonales
	if(b11==b22 && b22==b33 && b11!="&nbsp;")
		ganardor = true;
	if(b13==b22 && b22==b31 && b13!="&nbsp;")
		ganardor = true;
	//Ganador
	if(ganador == true) //if(ganador)
	{
		alert("!Ganador "+letra+"!");
	}
	else if(ganador == false && cuentaJugadas == 9)
	{
		alert("!Empate!")
	}

}

function escribe(casilla)
{
	var letra="";
	letraCasilla = document.getElementById(casilla).innerHTML;

	//if(letraCasilla == "&nbsp;")
	if(letraCasilla != "X" && letraCasilla !="O")
	{
		if(turno == false) //if(!turno)
			letra = "X";
		else
			letra ="O";
		document.getElementById(casilla).innerHTML = letra;
		turno = !turno; //turno = true;
	}
	cuentaJugadas = cuentaJugadas + 1;

	//Para saber quien gano, validamos la jugada
	validaJugada(letra);
}
