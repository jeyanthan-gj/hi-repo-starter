<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: index.php');
    exit;
}
?>
<!-- filepath: /d:/New folder (3)/admin/manage_products.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Products - Admin</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        .admin-nav {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 600px;
        }
        .nav-btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            margin-bottom: 10px;
            width: 100%;
        }
        .nav-btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>Admin Dashboard</h1>

    <nav class="admin-nav">
        <button class="nav-btn" onclick="window.location.href='manage_brands.php'">Manage Brands</button>
        <button class="nav-btn" onclick="window.location.href='manage_mobiles.php'">Manage Mobiles</button>
        <button class="nav-btn" onclick="window.location.href='manage_accessories_categories.php'">Manage Accessories Categories</button>
        <button class="nav-btn" onclick="window.location.href='manage_accessories.php'">Manage Accessories</button>
    </nav>
</body>
</html>