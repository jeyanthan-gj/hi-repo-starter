<?php
$servername = "localhost";
$username = "root";        // Your MySQL username
$password = "jeyanthangj2004@";
$dbname = "jayam_mobiles";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
