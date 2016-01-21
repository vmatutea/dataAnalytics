<?php
// require 'DB_connection.php';
//DEFINE ( 'TABLE', 'server_data' );
/*
 * called via http post from server saved data with ue_identifier and timestamp in database table server_data
 */
$count_params = count ( $_POST );
echo $count_params;
$whiteList = array (
		'timestamp',
		'ue_id',
		'stream_type',
		'starttime',
		'prebuffer_duration',
		'status_change',
		'link_bit_rate' 
);
// remove commentphrase // to get the POST array printet
// print_r($_POST);

if ($count_params == 4 || $count_params == 6) {
	if ($count_params == 4) {
		DEFINE ( 'TABLE', 'server_data' );
	} else if ($count_params == 6) {
		DEFINE ( 'TABLE', 'ue_data' );
	}
	
	// direkt key=values als post, also $temp in foreach = $_POST!!!
	$temp = $_POST;
	
	$statement = "INSERT INTO " . TABLE . "("; // timestamp, id, var1, var2, var3) VALUES (";
	                                       // //alternativ jeden parameter namentlich einzelnd... falls reihenfolge nicht sicher/fest ist, dann aber json_decode($data, true)
	                                       // //bzw $temp->{'name'}
	$values = '(';
	foreach ( $temp as $i => $val ) {
		if (in_array ( $i, $whiteList )) {
			$statement .= $i . ',';
			echo $val.'---';
			$values .= $val . ',';
		}
	}
	$statement = substr ( $statement, 0, -1 );
	$statement .= ")";
	
	$values = substr ( $values, 0 , -1 );
	$values .= ")";
	
	$statement .= " VALUES " . $values;
	
	// remove commentphrase // if you want to get the sql query in the output file as well
	echo '<br/>' . $statement;
	
	$dhb = DB_connection::getConnection ();
	$sth = $dhb->prepare ( $statement );
	$sth->execute ();
	// loeschen wenn "zu viele in db?
	$sth->closeCursor ();
} else { // else query for GUI Dashboard
	if (isset ( $_POST ['query'] ) && ! empty ( $_POST ['query'] )) {
		echo $_POST ['query'];
		$dhb = DB_connection::getConnection ();
		$sth = $dhb->prepare ( $statement );
		$sth->execute ();
		$data = $sth->fetchAll ( PDO::FETCH_NUM );
		echo json_encode ( $data );
		$sth->closeCursor ();
	}
} // else{delete sth??
class DB_connection {
	
	/**
	 *
	 * @var PDO
	 */
	private static $con;
	private static $server = 'localhost';
	private static $database = 'broadcast_demo';
	private static $user = 'root';
	private static $password = '';
	private function __construct() {
		// hide constructor
	}
	
	/**
	 *
	 * @return PDO
	 */
	public static function getConnection() {
		if (! isset ( self::$con )) {
			$dsn = 'mysql:host=' . self::$server . ';dbname=' . self::$database;
			self::$con = new PDO ( $dsn, self::$user, self::$password );
			self::$con->setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		}
		return self::$con;
	}
}
?>