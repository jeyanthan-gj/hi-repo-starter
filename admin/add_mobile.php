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
    <title>Add Mobile</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="mp.css">
</head>
<body>
    <h1>Add New Mobile</h1>
    <form method="POST" action="add_mobile.php" enctype="multipart/form-data">
        <label for="brand">Brand:</label>
        <select name="brand" id="brand">
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
        </select><br>
        <label for="model_name">Model Name:</label>
        <input type="text" name="model_name" required><br>
        <label for="description">Description:</label>
        <textarea name="description" required></textarea><br>
        <label for="price">Price:</label>
        <input type="text" name="price" required><br>
        <label for="original_price">Original Price:</label>
        <input type="text" name="original_price" required><br>
        <label for="discount">Discount:</label>
        <input type="text" name="discount" required><br>
        <label for="rating">Rating:</label>
        <input type="text" name="rating" required><br>
        <label for="reviews">Reviews:</label>
        <textarea name="reviews" required></textarea><br>
        <label for="specifications">Specifications:</label>
        <textarea name="specifications" required></textarea><br>
        <label for="images">Images:</label>
        <input type="file" name="images" required><br>
        <label for="offers">Offers:</label>
        <textarea name="offers" required></textarea><br>
        <label for="variants">Variants:</label>
        <textarea name="variants" required></textarea><br>
        <button type="submit" name="add">Add Product</button>
    </form>

    <?php
    if (isset($_POST['add'])) {
        $brand = $_POST['brand'];
        $model_name = $_POST['model_name'];
        $description = $_POST['description'];
        $price = $_POST['price'];
        $original_price = $_POST['original_price'];
        $discount = $_POST['discount'];
        $rating = $_POST['rating'];
        $reviews = $_POST['reviews'];
        $specifications = $_POST['specifications'];
        $offers = $_POST['offers'];
        $variants = $_POST['variants'];

        // Handle image upload
        $target_dir = "admin/uploads/";
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0755, true);
        }
        $target_file = $target_dir . basename($_FILES["images"]["name"]);
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        // Check if image file is a actual image or fake image
        $check = getimagesize($_FILES["images"]["tmp_name"]);
        if ($check !== false) {
            if (move_uploaded_file($_FILES["images"]["tmp_name"], $target_file)) {
                $images = $target_file;
            } else {
                echo "<p>Sorry, there was an error uploading your file.</p>";
                $images = "";
            }
        } else {
            echo "<p>File is not an image.</p>";
            $images = "";
        }

        if ($images != "") {
            $addSql = "INSERT INTO products (brand, model_name, description, price, original_price, discount, rating, reviews, specifications, images, offers, variants) VALUES (
                '" . $conn->real_escape_string($brand) . "',
                '" . $conn->real_escape_string($model_name) . "',
                '" . $conn->real_escape_string($description) . "',
                '" . $conn->real_escape_string($price) . "',
                '" . $conn->real_escape_string($original_price) . "',
                '" . $conn->real_escape_string($discount) . "',
                '" . $conn->real_escape_string($rating) . "',
                '" . $conn->real_escape_string($reviews) . "',
                '" . $conn->real_escape_string($specifications) . "',
                '" . $conn->real_escape_string($images) . "',
                '" . $conn->real_escape_string($offers) . "',
                '" . $conn->real_escape_string($variants) . "'
            )";

            if ($conn->query($addSql) === TRUE) {
                echo "<p>New product added successfully</p>";
            } else {
                echo "<p>Error adding product: " . $conn->error . "</p>";
            }
        }
    }
    ?>

    <br>
    <button onclick="window.location.href='manage_mobiles.php'" style="display: inline-block; padding: 10px 20px; background-color: #6c757d; color: #fff; border: none; border-radius: 5px; cursor: pointer; text-align: center; text-decoration: none; margin-top: 10px; margin-right: 10px;">Back to Manage Mobiles</button>
</body>
</html>