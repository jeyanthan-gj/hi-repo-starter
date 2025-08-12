<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: index.php');
    exit;
}
?>
<!-- filepath: /D:/New folder (3)/admin/delete_accessory.php -->
<?php
// Database connection
include 'db.php';

// Get accessory ID from query parameter
$accessory_id = $_GET['id'];

// Delete accessory from the database
$sql = "DELETE FROM accessories WHERE id=" . $accessory_id;

if ($conn->query($sql) === TRUE) {
    echo "<p>Accessory deleted successfully</p>";
} else {
    echo "<p>Error deleting accessory: " . $conn->error . "</p>";
}

$conn->close();
?>
<a href="manage_accessories.php">Back to Manage Accessories</a>