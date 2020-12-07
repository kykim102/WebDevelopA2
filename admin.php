<?php
    /*
    Student Name: Kyu Yeon Kim 
    Student ID:   19069575
    Description of the file:
    This is PHP file which will be used for the admin page.
    The functions includes: 
        Getting the responce from admin.js
        Access to MySQL and retrieve data that is between current time and two hours later
        Send back to admin.js for further processing
    */
    
    require_once('../../conf/sqlinfo.inc.php');

    // login and retreive data from database
    $conn = mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db);
 
    // Current Time and time after 2 hours
    $DT = date('Y-m-d H:i', strtotime('2 hour'));
    $now = date('Y-m-d H:i');
    
    // Retrieve data with requirement
    $query = "SELECT * FROM booking WHERE DateTime < '$DT' AND DateTime > '$now'";
    $result = mysqli_query($conn, $query);
            
    $json = array();
    
    while ($row = mysqli_fetch_assoc($result)){
        $json[] = $row;
    }

    echo json_encode($json, JSON_PRETTY_PRINT);
            

    mysqli_close($conn);
?>