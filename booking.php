<?php
    /*
    Student Name: Kyu Yeon Kim 
    Student ID:   19069575
    Description of the file:
    This is PHP file which will be used for the booking page.
    The functions includes: 
        Getting the POST data from booking page using booking.js
        Access to MySQL and inserting recevied data.
        Retrieve the Unique ID and send it back to booking.js for further process
    */

    require_once('../../conf/sqlinfo.inc.php');

    // login and retreive data from database
    $conn = mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db);

    // Getting information form JS file
	$name = $_POST['Name'];
	$phone = $_POST['Phone'];
	$stNum = $_POST['StreetNum'];
	$stName = $_POST['StreetName'];
	$sub = $_POST['Suburb'];
	$dSub = $_POST['DestSurb'];
	$dT = $_POST['DateTime'];
	$currentDate = date("Y-m-d H:i:s");

    // Inserting info to Database
	$query = "INSERT INTO booking (Name, Phone, StreetNum, StreetName, Suburb, DestSurb, DateTime, BookDate) VALUES ('$name', '$phone', '$stNum', '$stName', '$sub', '$dSub', '$dT', '$currentDate')";
	mysqli_query($conn, $query);

    // Retrieving Unique ID from Database
	$newQuery = "SELECT `ID`, `DateTime`, `BookDate` FROM `booking` ORDER BY ID DESC LIMIT 1";
	$result = mysqli_query($conn, $newQuery);
    
    $json = array();
    
    while ($row = mysqli_fetch_assoc($result)){
        $json[] = $row;
    }

    echo json_encode($json, JSON_PRETTY_PRINT);
    
    mysqli_close($conn);

?>