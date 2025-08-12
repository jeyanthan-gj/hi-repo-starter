<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: index.php');
    exit;
}
?>
<!-- filepath: /d:/New folder (3)/admin/manage_brands.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Brands - Admin</title>
    <link rel="stylesheet" href="mp.css">
    <link rel="stylesheet" href="ac.css">
</head>
<body>
    <h1>Manage Brands</h1>

    <?php
    // Database connection
    include 'db.php';

    // Initialize variables for brands
    $brand_id = $brand_name = $brand_logo = "";

    // Handle edit request for brands
    if (isset($_GET['edit_brand'])) {
        $brand_id = $_GET['edit_brand'];
        $sql = "SELECT * FROM brands WHERE id='$brand_id'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $brand_name = $row['brand'];
            $brand_logo = $row['brand_logo'];
        }
    }

    // Handle form submission for adding/updating brands
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['save_brand'])) {
        $brand_name = $_POST['brand_name'];

        // Handle file upload for brand logo
        if (isset($_FILES['brand_logo']) && $_FILES['brand_logo']['error'] == 0) {
            $target_dir = "uploads/";
            $target_file = $target_dir . basename($_FILES["brand_logo"]["name"]);
            if (move_uploaded_file($_FILES["brand_logo"]["tmp_name"], $target_file)) {
                $brand_logo = $target_file;
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }

        if ($brand_id) {
            // Update brand
            $sql = "UPDATE brands SET brand='$brand_name', brand_logo='$brand_logo' WHERE id='$brand_id'";
        } else {
            // Add new brand
            $sql = "INSERT INTO brands (brand, brand_logo) VALUES ('$brand_name', '$brand_logo')";
        }

        if ($conn->query($sql) === TRUE) {
            echo "Brand saved successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    // Handle delete request for brands
    if (isset($_GET['delete_brand'])) {
        $brand_id = $_GET['delete_brand'];

        // Fetch the brand logo path before deleting the brand
        $sql = "SELECT brand_logo FROM brands WHERE id='$brand_id'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $brand_logo = $row['brand_logo'];

            // Delete the brand from the database
            $sql = "DELETE FROM brands WHERE id='$brand_id'";
            if ($conn->query($sql) === TRUE) {
                // Delete the brand logo file from the directory
                if (file_exists($brand_logo)) {
                    unlink($brand_logo);
                }
                echo "Brand deleted successfully";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        }
    }

    // Fetch all brands
    $sql = "SELECT * FROM brands";
    $result = $conn->query($sql);
    ?>

    <form method="post" action="" enctype="multipart/form-data">
        <input type="hidden" name="brand_id" id="brand_id" value="<?php echo $brand_id; ?>">
        <label for="brand_name">Brand Name:</label>
        <input type="text" name="brand_name" id="brand_name" value="<?php echo $brand_name; ?>" required>
        <label for="brand_logo">Brand Logo:</label>
        <input type="file" name="brand_logo" id="brand_logo" <?php echo $brand_id ? '' : 'required'; ?>>
        <button type="submit" name="save_brand">Save Brand</button>
    </form>

    <h2>Brand List</h2>
    <table>
        <tr>
            <th>Brand Name</th>
            <th>Brand Logo</th>
            <th>Actions</th>
        </tr>
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["brand"] . "</td>";
                echo "<td><img src='" . $row["brand_logo"] . "' alt='" . $row["brand"] . "' width='50'></td>";
                echo "<td><a href='?edit_brand=" . $row["id"] . "'>Edit</a> | <a href='?delete_brand=" . $row["id"] . "'>Delete</a></td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='4'>No brands found</td></tr>";
        }
        $conn->close();
        ?>
    </table>
    <br>
    <button class="back-btn" onclick="window.location.href='admin_dashboard.php'">Back</button>
</body>
</html>