<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: index.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar">
        <a href="admin_dashboard.php" class="logo">Admin Dashboard</a>
        <a href="logout.php" class="logout-btn">Logout</a>
    </nav>

    <div class="dashboard-container">
        <h2>Welcome to the Admin Dashboard</h2>
        <p>Select an option to manage the website:</p>
        
        <div class="dashboard-options">
            <a href="manage_products.php">
                <button class="dashboard-btn">Manage Products</button>
            </a>
            <a href="admin_upload.php">
                <button class="dashboard-btn">Manage Gallery</button>
            </a>
            <a href="edit_about.php">
                <button class="dashboard-btn">Edit About Us</button>
            </a>
        </div>
    </div>
</body>
</html>
