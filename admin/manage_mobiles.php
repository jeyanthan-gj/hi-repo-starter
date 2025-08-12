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
    <title>Manage Mobiles</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="mp.css">
</head>
<body>
    <h1>Manage Mobiles</h1>

    <!-- Brand Dropdown -->
    <form method="GET" action="">
        <label for="brand">Select Brand:</label>
        <select name="brand" id="brand">
            <option value="">All Brands</option>
            <?php
            // Database connection
            include 'db.php';

            // Fetch all brands from the brands table
            $brandSql = "SELECT * FROM brands";
            $brandResult = $conn->query($brandSql);

            if ($brandResult->num_rows > 0) {
                while($brandRow = $brandResult->fetch_assoc()) {
                    echo '<option value="' . $brandRow["brand"] . '">' . $brandRow["brand"] . '</option>';
                }
            }
            ?>
        </select>
        <button type="submit">Filter</button>
    </form>

    <h2><a href="add_mobile.php">Add New Mobile</a></h2>

    <table border="1">
        <tr>
            <th>Brand</th>
            <th>Model Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Original Price</th>
            <th>Discount</th>
            <th>Rating</th>
            <th>Reviews</th>
            <th>Specifications</th>
            <th>Image</th>
            <th>Offers</th>
            <th>Variants</th>
            <th>Actions</th>
        </tr>
        <?php
        // Fetch all products from the products table
        $brandFilter = isset($_GET['brand']) ? $_GET['brand'] : '';
        $sql = "SELECT * FROM products";
        if ($brandFilter) {
            $sql .= " WHERE brand = '" . $conn->real_escape_string($brandFilter) . "'";
        }
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["brand"] . "</td>";
                echo "<td>" . $row["model_name"] . "</td>";
                echo "<td>" . $row["description"] . "</td>";
                echo "<td>" . $row["price"] . "</td>";
                echo "<td>" . $row["original_price"] . "</td>";
                echo "<td>" . $row["discount"] . "</td>";
                echo "<td>" . $row["rating"] . "</td>";
                echo "<td>" . $row["reviews"] . "</td>";
                echo "<td>" . $row["specifications"] . "</td>";
                echo "<td><img src='" . $row["images"] . "' alt='" . $row["model_name"] . "' width='50'></td>";
                echo "<td>" . $row["offers"] . "</td>";
                echo "<td>" . $row["variants"] . "</td>";
                echo "<td><a href='edit_mobile.php?id=" . $row["id"] . "'>Edit</a> | <a href='delete_mobile.php?id=" . $row["id"] . "' onclick='return confirm(\"Are you sure you want to delete this item?\")'>Delete</a></td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='14'>No mobiles found</td></tr>";
        }
        $conn->close();
        ?>
    </table>
</body>
</html>