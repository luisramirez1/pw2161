<?php 
//Funciones
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

function validaEntrada(){
	$usuario = GetSQLValueString($_POST["usuario"],"text");
	$clave = GetSQLValueString(md5($_POST["clave"]),"text");
	$respuesta = false;
	//Conecto al servidor de BD
	//Servidor, usuario, clave
	$conexion = mysql_connect("localhost","root","");
	//Seleccionar la BD
	mysql_select_db("cursopw");
	$validar = sprintf("select usuario,clave from usuarios where usuario=%s and clave=%s limit 1",$usuario,$clave);
	$resultado = mysql_query($validar);
	//Preguntamos si se trajo un registro
	if(mysql_num_rows($resultado) > 0)
		$respuesta = true;
	$salidaJSON = array('respuesta' => $respuesta);
	//Devolvemos el resultado al JS
	print json_encode($salidaJSON);
}

function guardaUsuario()
{
	$usuario = GetSQLValueString($_POST["txtNombreUsuario"],"text");
	$clave = GetSQLValueString(md5($_POST["txtClaveUsuario"]),"text");
	$tipo = GetSQLValueString($_POST["txtTipoUsuario"],"text");
	$depto = GetSQLValueString($_POST["txtDepartamento"],"long");
	$respuesta = false;
	//Conecto al servidor de BD
	//Servidor, usuario, clave
	$conexion = mysql_connect("localhost","root","");
	//Seleccionar la BD
	mysql_select_db("cursopw");
	$guarda = sprintf("insert into usuarios values(%s,%s,%s,%s)",$usuario,$clave,$tipo,$depto);
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

function bajaUsuario()
{
	$usuario = GetSQLValueString($_POST["txtNombreUsuarioBaja"],"text");
	$respuesta = false;
	//Conecto al servidor de BD
	//Servidor, usuario, clave
	$conexion = mysql_connect("localhost","root","");
	//Seleccionar la BD
	mysql_select_db("cursopw");
	$elimina = sprintf("delete from usuarios where usuario=%s limit 1",$usuario);
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

function buscaUsuario()
{
	$usuario = GetSQLValueString($_POST["txtNombreUsuarioBaja"],"text");
	$respuesta = false;
	//Conecto al servidor de BD
	//Servidor, usuario, clave
	$conexion = mysql_connect("localhost","root","");
	//Seleccionar la BD
	mysql_select_db("cursopw");
	$busca = sprintf("select * from usuarios where usuario=%s limit 1",$usuario);
	//Ejecutamos la consulta
	$resultado = mysql_query($busca);
	//Cuantos registros tenemos afectados
	$nombreU = "";
	$claveU = "";
	$tipoU = "";
	$deptoU = "";
	if(mysql_num_rows($resultado) > 0)
	{
		$respuesta = true;

		while($registro = mysql_fetch_array($resultado))
		{
			$nombreU.=$registro["usuario"];
			$claveU.=$registro["clave"];
			$tipoU.=$registro["tipoUsuario"];
			$deptoU.=$registro["departamento"];
		}
	}
	$salidaJSON = array('respuesta' => $respuesta, 'nom'=>$nombreU,'cla'=>$claveU,'tipo'=>$tipoU,'depto'=>$deptoU);
	print json_encode($salidaJSON);
	//$json = '[{"usuario":"pw","clave":"81dc9bdb52d04dc20036dbd8313ed055","tipo":"vigente","departamento":"1"}, {"usuario":"luis","clave":"e6ba4060d7bc5a577715be0c5352a6f1","tipo":"vigente","departamento":"1"}, {"usuario":"karina4","clave":"81dc9bdb52d04dc20036dbd8313ed055","tipo":"vigente","departamento":"1"}, {"usuario":"karina5","clave":"81dc9bdb52d04dc20036dbd8313ed055","tipo":"vigente","departamento":"1"}, {"usuario":"karina6","clave":"81dc9bdb52d04dc20036dbd8313ed055","tipo":"vigente","departamento":"1"}, {"usuario":"karina7","clave":"81dc9bdb52d04dc20036dbd8313ed055","tipo":"vigente","departamento":"1"}]';
	//$array = json_decode($json);
	//print_r($array);
}

function consultas()
{
	mysql_connect("localhost","root","");
	mysql_select_db("cursopw");
	$consulta = "select * from usuarios order by usuario";
	$resultado = mysql_query($consulta);
	$tabla = "";
	if(mysql_num_rows($resultado) > 0)
	{
		$respuesta = true;
		$tabla.= "<tr id='tabla2'>";
		$tabla.= "<th id='thT'>Usuario</th>";
		$tabla.= "<th id='thT'>Tipo Usuario</th>";
		$tabla.= "<th id='thT'>Departamento</th>";
		$tabla.= "<th id='thT'>Acciones</th>";
		$tabla.= "</tr>";
		while($registro = mysql_fetch_array($resultado))
		{
			$tabla.="<tr>";
			$tabla.="<td class='tdT'>".$registro["usuario"]."</td>";
			$tabla.="<td class='tdT'>".$registro["tipoUsuario"]."</td>";
			$tabla.="<td class='tdT'>".$registro["departamento"]."</td>";
			$tabla.="<td> <button id='".$registro["usuario"]."' class='btn btn-danger'>Baja</button></td>";
			$tabla.="</tr>";
		}
		$registro2 = mysql_fetch_array($resultado);
	}
	$salidaJSON = array('respuesta' => $respuesta, 
						'tabla'		=> $tabla);
	print json_encode($salidaJSON);
}

function actualizaUsuario()
{
	$usuario = GetSQLValueString($_POST["txtNombreUsuarioActualiza"],"text");
	$clave = GetSQLValueString(md5($_POST["txtClaveUsuarioActualiza"]),"text");
	$tipo = GetSQLValueString($_POST["txtTipoUsuarioActualiza"],"text");
	$depto = GetSQLValueString($_POST["txtDepartamentoActualiza"],"long");
	$respuesta = false;
	//Conecto al servidor de BD
	//Servidor, usuario, clave
	$conexion = mysql_connect("localhost","root","");
	//Seleccionar la BD
	mysql_select_db("cursopw");
	//$guarda = sprintf("insert into usuarios values(%s,%s,%s,%s)",$usuario,$clave,$tipo,$depto);
	$actualiza = sprintf("update usuarios set usuario=%s,clave=%s,tipoUsuario=%s,departamento=%s where usuario=%s limit 1",$usuario,$clave,$tipo,$depto,$usuario);
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

function bajaDinamica()
{
	$usuario = GetSQLValueString($_POST["txtNombreUsuarioBaja"],"text");
	$respuesta = false;
	//Conecto al servidor de BD
	//Servidor, usuario, clave
	$conexion = mysql_connect("localhost","root","");
	//Seleccionar la BD
	mysql_select_db("cursopw");
	$elimina = sprintf("delete from usuarios where usuario=%s limit 1",$usuario);
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

$accion = $_POST["accion"];
//Menú principal
switch ($accion) {
	case 'validaEntrada':
		validaEntrada();
		break;
	case 'guardaUsuario':
		guardaUsuario();
		break;
	case 'bajaUsuario':
		bajaUsuario();
		break;
	case 'buscaUsuario':
		buscaUsuario();
		break;
	case 'consultas':
		consultas();
		break;
	case 'actualizaUsuario':
		actualizaUsuario();
		break;
	case 'bajaDinamica':
		bajaDinamica();
		break;
	default:
		# code...
		break;
}
?>