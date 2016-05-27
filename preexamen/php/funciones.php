<?php 
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);
  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}

function guardaEncuesta()
{
	$clave = GetSQLValueString($_POST["txtClaveEncuestas"],"text");
	$encuesta = GetSQLValueString($_POST["txtNombreEncuestas"],"text");
	$pregunta1 = GetSQLValueString($_POST["txtPregunta1"],"text");
	$respuesta1 = GetSQLValueString($_POST["txtRespuesta1"],"text");
	$pregunta2 = GetSQLValueString($_POST["txtPregunta2"],"text");
	$respuesta2 = GetSQLValueString($_POST["txtRespuesta2"],"text");
	$pregunta3 = GetSQLValueString($_POST["txtPregunta3"],"text");
	$respuesta3 = GetSQLValueString($_POST["txtRespuesta3"],"text");
	$fechaEncuesta = GetSQLValueString($_POST["txtFechaEncuesta"],"text");
	$semestre = GetSQLValueString($_POST["txtSemestre"],"text");
	$respuesta = false;
	//Conecto al servidor de BD
	//Servidor, usuario, clave
	$conexion = mysql_connect("localhost","root","");
	//Seleccionar la BD
	mysql_select_db("progweb");
	$guarda = sprintf("insert into encuestas values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",$clave,$encuesta,$pregunta1,$respuesta1,$pregunta2,$respuesta2,$pregunta3,$respuesta3,$fechaEncuesta,$semestre);
	//Ejecutamos la consulta
	mysql_query($guarda);
	//Cuantos registros tenemos afectados
	if(mysql_affected_rows() > 0)
	{
		$respuesta = true;
	} 
	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);
}

function bajaEncuesta()
{
	$encuesta = GetSQLValueString($_POST["txtNombreEncuestaBaja"],"text");
	$respuesta = false;
	//Conecto al servidor de BD
	//Servidor, usuario, clave
	$conexion = mysql_connect("localhost","root","");
	//Seleccionar la BD
	mysql_select_db("progweb");
	$elimina = sprintf("delete from encuestas where nombreencuesta=%s limit 1",$encuesta);
	echo($elimina);
	//Ejecutamos la consulta
	mysql_query($elimina);
	//Cuantos registros tenemos afectados
	if(mysql_affected_rows() > 0)
	{
		$respuesta = true;
	}
	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);	
}

function buscaEncuesta()
{
	$encuesta = GetSQLValueString($_POST["txtNombreEncuestaBaja"],"text");
	$respuesta = false;
	//Conecto al servidor de BD
	//Servidor, usuario, clave
	$conexion = mysql_connect("localhost","root","");
	//Seleccionar la BD
	mysql_select_db("progweb");
	$busca = sprintf("select * from encuestas where nombreencuesta=%s limit 1",$encuesta);
	//Ejecutamos la consulta
	$resultado = mysql_query($busca);
	//Cuantos registros tenemos afectados
	$claveE = "";
	$nombreE = "";
	$p1E= "";
	$r1E= "";
	$p2E= "";
	$r2E= "";
	$p3E= "";
	$r3E= "";
	$fechaE = "";
	$semestreE = "";

	if(mysql_num_rows($resultado) > 0)
	{
		$respuesta = true;

		while($registro = mysql_fetch_array($resultado))
		{
			$claveE.=$registro["claveencuesta"];
			$nombreE.=$registro["nombreencuesta"];
			$p1E.=$registro["pregunta1"];
			$r1E.=$registro["respuesta1"];
			$p2E.=$registro["pregunta2"];
			$r2E.=$registro["respuesta2"];
			$p3E.=$registro["pregunta3"];
			$r3E.=$registro["respuesta3"];
			$fechaE.=$registro["fechaencuesta"];
			$semestreE.=$registro["semestre"];
		}
	}
	$salidaJSON = array('respuesta' => $respuesta, 'claveE'=>$claveE,'nombreE'=>$nombreE,'p1E'=>$p1E,'r1E'=>$r1E,'p2E'=>$p2E,'r2E'=>$r2E,'p3E'=>$p3E,'r3E'=>$r3E,'fechaE'=>$fechaE,'semestreE'=>$semestreE);
	print json_encode($salidaJSON);
}

function actualizaEncuesta()
{
	$clave = GetSQLValueString($_POST["txtClaveEncuestaActualiza"],"text");
	$encuesta = GetSQLValueString($_POST["txtNombreEncuestaActualiza"],"text");
	$pregunta1 = GetSQLValueString($_POST["txtPregunta1Actualiza"],"text");
	$respuesta1 = GetSQLValueString($_POST["txtRespuesta1Actualiza"],"text");
	$pregunta2 = GetSQLValueString($_POST["txtPregunta2Actualiza"],"text");
	$respuesta2 = GetSQLValueString($_POST["txtRespuesta2Actualiza"],"text");
	$pregunta3 = GetSQLValueString($_POST["txtPregunta3Actualiza"],"text");
	$respuesta3 = GetSQLValueString($_POST["txtRespuesta3Actualiza"],"text");
	$fechaEncuesta = GetSQLValueString($_POST["txtFechaEncuestaActualiza"],"text");
	$semestre = GetSQLValueString($_POST["txtSemestreActualiza"],"text");
	echo($clave);
	echo($encuesta);
	echo($pregunta1);
	echo($respuesta1);
	echo($pregunta2);
	echo($respuesta2);
	echo($pregunta3);
	echo($respuesta3);
	echo($fechaEncuesta);
	echo($semestre);
	$respuesta = false;
	//Conecto al servidor de BD
	//Servidor, usuario, clave
	$conexion = mysql_connect("localhost","root","");
	//Seleccionar la BD
	mysql_select_db("progweb");
	$actualiza = sprintf("update encuestas set claveencuesta=%d,nombreencuesta=%s,pregunta1=%s,respuesta1=%s,pregunta2=%s,respuesta2=%s,pregunta3=%s,respuesta3=%s,fechaencuesta=%s,semestre=%d where nombreencuesta=%s limit 1",$clave,$encuesta,$pregunta1,$respuesta1,$pregunta2,$respuesta2,$pregunta3,$respuesta3,$fechaEncuesta,$semestre);
	echo($actualiza);
	//Ejecutamos la consulta
	mysql_query($actualiza);
	//Cuantos registros tenemos afectados
	if(mysql_affected_rows() > 0)
	{
		$respuesta = true;
	}
	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);	
}

$accion = $_POST["accion"];
//Menú principal
switch ($accion) {
	case 'guardaEncuesta':
		guardaEncuesta();
		break;
	case 'bajaEncuesta':
		bajaEncuesta();
		break;
	case 'buscaEncuesta':
		buscaEncuesta();
		break;
	case 'actualizaEncuesta':
		actualizaEncuesta();
		break;
	default:
		# code...
		break;
}
?>