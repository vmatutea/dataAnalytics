<?php
require_once '../php/DB_connection.php';


$dbh = DB_connection::getConnection ();

$statement = $_GET['query'];
$sth = $dbh->prepare($statement);
$sth->execute();

if(strpos($statement, "DELETE")===false){
	
	$data = $sth->fetchAll(PDO::FETCH_NUM);

	echo json_encode($data);
}
?>
