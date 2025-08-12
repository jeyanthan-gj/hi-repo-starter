<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: index.php');
    exit;
}
?>
<?php
// Database connection
include 'db.php';

// Get category ID from query parameter and sanitize it
$category_id = intval($_GET['category_id']);

// Fetch subcategories from the database
$sql = "SELECT id, subcategory_name FROM accessories_subcategories WHERE category_id=" . $category_id;
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo '<option value="">Select a subcategory</option>';
    while($row = $result->fetch_assoc()) {
        echo '<option value="' . $row["id"] . '">' . $row["subcategory_name"] . '</option>';
    }
} else {
    echo '<option value="">No subcategories available</option>';
}

$conn->close();
?>