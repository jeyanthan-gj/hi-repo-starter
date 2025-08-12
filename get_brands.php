<!-- filepath: /D:/New folder (3)/get_brands.php -->
<?php
// Database connection
include 'db.php';

// Fetch all brands from the brands table
$sql = "SELECT * FROM brands";
$result = $conn->query($sql);

$brands = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $brands[] = $row;
    }
}

$conn->close();

// Return the brands as a JSON array
header('Content-Type: application/json');
echo json_encode($brands);
?>