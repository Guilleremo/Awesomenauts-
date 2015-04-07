<?php

// make code easier to read and to maintain
class Database {

	// create instanace variables 
	// private means that these variables can only  
	// be used or access in this class; cannot be access anywhere else
	// these variables are hidden; no one can modify them.
	// global variable which stay within the object
	private $connection;
	private $host;
	private $username;
	private $password;
	private $database;
	public $error;

	// constructor has four local variables or parameter
	// constructor function uses to create object
	public function __construct($host, $username, $password, $database) {
		$this->host = $host;
		$this->username = $username;
		$this->password = $password;
		$this->database = $database;

    $this->connection = new mysqli($host, $username, $password);

    if($this->connection->connect_error){
       die("<p>Error: " . $this->connection->connect_error . "</p>"); 
        }
   
    $exists = $this->connection->select_db($database);
    
    if (!$exists) {
        // create a database query
         $query = $this->connection->query("CREATE DATABASE $database");
        
        if ($query){
          echo "<p>Successfully created database: " . $database . "</p>";
          }
       }

     else {
         echo "<p>Database already exists</p>";
     }
     
	}


	// this function will open the connection
	public function openConnection() {
		$this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);	
		
		if($this->connection->connect_error){
      		 die("<p>Error: " . $this->connection->connect_error . "</p>"); 
      	  }	

	}

	// this function will close the connection w/o passing any parameter
	public function closeConnection() {
		// check to see if the information is present or available
		 if(isset($this->connection)) {
		 	  $this->connection->close();
		 }

	}

	// call query function by passing a string
	public function query($string) {
		// call the open connection function
		  $this->openConnection();

		  // store string in the query variable
		  $query = $this->connection->query($string);


		  // check to see if query is false; if it is then execute the code
		  if (!$query) {
		  		$this->error = $this->connection->error;

		  }

		  // call the close connection function
		  $this->closeConnection();

		  return $query;
		  
	}

	//public function time() {
			//return $this->connection->format("m-d-Y");
  //}
}

