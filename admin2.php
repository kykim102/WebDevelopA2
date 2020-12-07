<?php
    /*
    Student Name: Kyu Yeon Kim 
    Student ID:   19069575
    Description of the file:
    This is PHP file which will be used for the admin page.
    The functions includes: 
        Getting the responce from admin.js with reference number        
        Access to MySQL and set assign to the booking that has specific reference number
        Send back to admin.js for further processing
    */

    require_once('../../conf/sqlinfo.inc.php');

    $refNum = $_POST['refNum'];

    // login and retreive data from database
    $conn = mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db);

    // Update Assgin
    $query = "UPDATE booking SET Assign = 'Assign' WHERE  ID = '$refNum'";
    $result = mysqli_query($conn, $query);
    
    // Retrieve info from DB
    $query = "SELECT * FROM booking WHERE ID = '$refNum'";
    $result = mysqli_query($conn, $query);
            
    $json = array();
    
    while ($row = mysqli_fetch_assoc($result)){
        $json[] = $row;
    }

    echo json_encode($json, JSON_PRETTY_PRINT);
            
    mysqli_close($conn);
?>