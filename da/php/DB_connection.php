<?php

class DB_connection {

    /**
     * @var PDO 
     */
    private static $con;
    private static $server = 'localhost';
    private static $database = 'heat';
    private static $user = 'root';
    private static $password = 'pi';
	
    private function __construct() {
        // hide constructor
    }

    /**
     * @return PDO
     */
    public static function getConnection() {
        if (!isset(self::$con)) {
            $dsn = 'mysql:host=' . self::$server.';dbname=' . self::$database;
            self::$con = new PDO($dsn, self::$user, self::$password);
            self::$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        return self::$con;
    }

}

?>
