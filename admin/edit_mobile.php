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
    <title>Edit Mobile</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="mp.css">
    <link rel="stylesheet" href="ac.css">
</head>
<body>
    <?php
    // Database connection
    include 'db.php';

    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        // Fetch the mobile details from the products table
        $sql = "SELECT * FROM products WHERE id = " . $conn->real_escape_string($id);
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $brand = $row['brand'];
            $model_name = $row['model_name'];
            $description = $row['description'];
            $price = $row['price'];
            $original_price = $row['original_price'];
            $discount = $row['discount'];
            $rating = $row['rating'];
            $reviews = $row['reviews'];
            $specifications = $row['specifications'];
            $images = $row['images'];
            $offers = $row['offers'];
            $variants = $row['variants'];
        } else {
            echo "<p>Mobile not found</p>";
        }
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $brand = $_POST['brand'];
        $model_name = $_POST['model_name'];
        $description = $_POST['description'];
        $price = $_POST['price'];
        $original_price = $_POST['original_price'];
        $discount = $_POST['discount'];
        $rating = $_POST['rating'];
        $reviews = $_POST['reviews'];
        $specifications = $_POST['specifications'];
        $images = $_POST['images'];
        $offers = $_POST['offers'];
        $variants = $_POST['variants'];

        $updateSql = "UPDATE products SET 
            brand = '" . $conn->real_escape_string($brand) . "',
            model_name = '" . $conn->real_escape_string($model_name) . "',
            description = '" . $conn->real_escape_string($description) . "',
            price = '" . $conn->real_escape_string($price) . "',
            original_price = '" . $conn->real_escape_string($original_price) . "',
            discount = '" . $conn->real_escape_string($discount) . "',
            rating = '" . $conn->real_escape_string($rating) . "',
            reviews = '" . $conn->real_escape_string($reviews) . "',
            specifications = '" . $conn->real_escape_string($specifications) . "',
            images = '" . $conn->real_escape_string($images) . "',
            offers = '" . $conn->real_escape_string($offers) . "',
            variants = '" . $conn->real_escape_string($variants) . "'
            WHERE id = " . $conn->real_escape_string($id);

        if ($conn->query($updateSql) === TRUE) {
            echo "<p>Record updated successfully</p>";
        } else {
            echo "<p>Error updating record: " . $conn->error . "</p>";
        }
    }
    ?>

    <form method="post" action="">
        <label for="brand">Brand:</label>
        <input type="text" id="brand" name="brand" value="<?php echo $brand; ?>" required><br>

        <label for="model_name">Model Name:</label>
        <input type="text" id="model_name" name="model_name" value="<?php echo $model_name; ?>" required><br>

        <label for="description">Description:</label>
        <textarea id="description" name="description" required><?php echo $description; ?></textarea><br>

        <label for="price">Price:</label>
        <input type="text" id="price" name="price" value="<?php echo $price; ?>" required><br>

        <label for="original_price">Original Price:</label>
        <input type="text" id="original_price" name="original_price" value="<?php echo $original_price; ?>" required><br>

        <label for="discount">Discount:</label>
        <input type="text" id="discount" name="discount" value="<?php echo $discount; ?>" required><br>

        <label for="rating">Rating:</label>
        <input type="text" id="rating" name="rating" value="<?php echo $rating; ?>" required><br>

        <label for="reviews">Reviews:</label>
        <input type="text" id="reviews" name="reviews" value="<?php echo $reviews; ?>" required><br>

        <label for="specifications">Specifications:</label>
        <textarea id="specifications" name="specifications" required><?php echo $specifications; ?></textarea><br>

        <label for="images">Images:</label>
        <input type="text" id="images" name="images" value="<?php echo $images; ?>" required><br>

        <label for="offers">Offers:</label>
        <textarea id="offers" name="offers" required><?php echo $offers; ?></textarea><br>

        <label for="variants">Variants:</label>
        <textarea id="variants" name="variants" required><?php echo $variants; ?></textarea><br>

        <input type="submit" value="Update Mobile" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer; text-align: center; text-decoration: none; margin-top: 10px;">
    </form>

    <br>
    <button class="back-btn" onclick="window.location.href='manage_mobiles.php'" style="display: inline-block; padding: 10px 20px; background-color: #6c757d; color: #fff; border: none; border-radius: 5px; cursor: pointer; text-align: center; text-decoration: none; margin-top: 10px;">Back</button>
</body>
</html>