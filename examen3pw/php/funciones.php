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

function guardaAlmacen()
{
	$idAlmacen = GetSQLValueString($_POST["txtIdAlmacen"],"text");
	$nombre = GetSQLValueString($_POST["txtNombre"],"text");
	$direccion1 = GetSQLValueString($_POST["txtDireccion1"],"text");
	$direccion2 = GetSQLValueString($_POST["txtDireccion2"],"text");
	$cP = GetSQLValueString($_POST["txtCP"],"text");
	$localidad = GetSQLValueString($_POST["txtLocalidad"],"text");
	$provincia = GetSQLValueString($_POST["txtProvincia"],"text");
	$respuesta = false;
	//Conecto al servidor de BD
	//Servidor, usuario, clave
	$conexion = mysql_connect("localhost","root","");
	//Seleccionar la BD
	mysql_select_db("examen");
	$guarda = sprintf("insert into almacenes values(%s,%s,%s,%s,%s,%s,%s)",$idAlmacen,$nombre,$direccion1,$direccion2,$cP,$localidad,$provincia);
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

$accion = $_POST["accion"];
//Menú principal
switch ($accion) {
	case 'guardaAlmacen':
		guardaAlmacen();
		break;
	default:
		# code...
		break;
}
?>