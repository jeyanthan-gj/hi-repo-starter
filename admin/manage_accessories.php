<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: index.php');
    exit;
}
?>
<!-- filepath: /D:/New folder (3)/admin/manage_accessories.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Accessories - Admin</title>
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
        h2 {
            color: #333;
        }
        a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        a:hover {
            background-color: #0056b3;
        }
        table {
            width: 100%;
            max-width: 1000px;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        img {
            border-radius: 5px;
        }
        .back-btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #6c757d;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            margin-top: 20px;
        }
        .back-btn:hover {
            background-color: #5a6268;
        }
    </style>
</head>
<body>
    <h2>Manage Accessories</h2>
    <a href="add_accessory.php">Add New Accessory</a>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Name</th>
                <th>Description</th>
                <th>Rate</th>
                <th>Discount</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // Database connection
            include 'db.php';

            // Fetch accessories from the database
            $sql = "SELECT a.id, c.category_name, s.subcategory_name, a.name, a.description, a.rate, a.discount, a.image 
                    FROM accessories a
                    LEFT JOIN accessories_categories c ON a.category_id = c.id
                    LEFT JOIN accessories_subcategories s ON a.subcategory_id = s.id";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo '<tr>';
                    echo '<td>' . $row["id"] . '</td>';
                    echo '<td>' . $row["category_name"] . '</td>';
                    echo '<td>' . $row["subcategory_name"] . '</td>';
                    echo '<td>' . $row["name"] . '</td>';
                    echo '<td>' . $row["description"] . '</td>';
                    echo '<td>' . $row["rate"] . '</td>';
                    echo '<td>' . $row["discount"] . '</td>';
                    echo '<td><img src="accessories/' . $row["image"] . '" alt="' . $row["name"] . '" width="50"></td>';
                    echo '<td>';
                    echo '<a href="update_accessory.php?id=' . $row["id"] . '">Update</a> | ';
                    echo '<a href="delete_accessory.php?id=' . $row["id"] . '">Delete</a>';
                    echo '</td>';
                    echo '</tr>';
                }
            } else {
                echo '<tr><td colspan="9">No accessories found</td></tr>';
            }

            $conn->close();
            ?>
        </tbody>
    </table>
    <button class="back-btn" onclick="window.location.href='admin_dashboard.php'">Back to Dashboard</button>
</body>
</html>