<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: index.php');
    exit;
}

// Database connection
include 'db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Retrieve the image path from the database
    $imageQuery = "SELECT images FROM products WHERE id = " . $conn->real_escape_string($id);
    $imageResult = $conn->query($imageQuery);

    if ($imageResult->num_rows > 0) {
        $imageRow = $imageResult->fetch_assoc();
        $imagePath = $imageRow['images'];

        // Check if the image file exists and delete it
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }
    }

    // Delete the record from the database
    $deleteSql = "DELETE FROM products WHERE id = " . $conn->real_escape_string($id);
    if ($conn->query($deleteSql) === TRUE) {
        echo "<p>Record and associated image deleted successfully</p>";
    } else {
        echo "<p>Error deleting record: " . $conn->error . "</p>";
    }
}
?>
<a href="manage_mobiles.php">Back to Manage Mobiles</a>