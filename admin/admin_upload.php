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
    <title>Admin Upload - Jayam Mobiles</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            min-height: 100vh;
        }
        .upload-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 80%;
            max-width: 800px;
        }
        h1 {
            color: #333;
        }
        .upload-form, .update-form, .delete-form {
            display: flex;
            flex-direction: column;
            width: 100%;
            border: 1px solid #ddd;
            padding: 20px;
            background-color: #fff;
            margin-bottom: 20px;
            border-radius: 8px;
        }
        .upload-form input, .upload-form textarea, .upload-form button,
        .update-form input, .update-form button,
        .delete-form input, .delete-form button {
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .upload-form button, .update-form button, .delete-form button {
            background-color: #007bff;
            color: #fff;
            cursor: pointer;
            border: none;
        }
        .upload-form button:hover, .update-form button:hover, .delete-form button:hover {
            background-color: #0056b3;
        }
        .image-list {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            margin-top: 20px;
        }
        .image-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            padding: 10px;
            background-color: #fff;
            width: 100%;
            border-radius: 8px;
        }
        .image-item img {
            max-width: 100px;
            margin-right: 20px;
            border-radius: 5px;
        }
        .image-item form {
            display: flex;
            flex-direction: column;
            margin-left: auto;
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
    <div class="upload-container">
        <h1>Manage Showroom Images</h1>

        <!-- Upload Form -->
        <form class="upload-form" action="admin_upload.php" method="post" enctype="multipart/form-data">
            <h2>Upload New Image</h2>
            <label for="image">Select Image:</label>
            <input type="file" name="image" id="image" required>
            <label for="description">Description:</label>
            <textarea name="description" id="description" rows="4" required></textarea>
            <label for="order">Order:</label>
            <input type="number" name="order" id="order" required>
            <button type="submit" name="upload">Upload</button>
        </form>

        <!-- Display Images with Update and Delete Options -->
        <div class="image-list">
            <h2>Current Images</h2>
            <?php
            // Database connection
            include 'db.php';

            // Fetch showroom images from the database ordered by the 'order' column
            $stmt = $conn->prepare("SELECT id, image, `order` FROM showroom_images ORDER BY `order` ASC");
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo '<div class="image-item">';
                    echo '<img src="' . htmlspecialchars($row["image"]) . '" alt="Showroom Image">';
                    echo '<div>';
                    echo '<p>Order: ' . htmlspecialchars($row["order"]) . '</p>';
                    echo '</div>';
                    echo '<form action="admin_upload.php" method="post">';
                    echo '<input type="hidden" name="image_id" value="' . htmlspecialchars($row["id"]) . '">';
                    echo '<label for="new_order">New Order:</label>';
                    echo '<input type="number" name="new_order" required>';
                    echo '<button type="submit" name="update_order">Update Order</button>';
                    echo '</form>';
                    echo '<form action="admin_upload.php" method="post">';
                    echo '<input type="hidden" name="delete_image_id" value="' . htmlspecialchars($row["id"]) . '">';
                    echo '<button type="submit" name="delete_image">Delete Image</button>';
                    echo '</form>';
                    echo '</div>';
                }
            } else {
                echo "<p>No showroom images found</p>";
            }

            $stmt->close();
            $conn->close();
            ?>
        </div>
    </div>

    <?php
    // Database connection
    include 'db.php';

    if (isset($_POST['upload'])) {
        // File upload path
        $target_file = basename($_FILES["image"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        // Check if image file is a actual image or fake image
        $check = getimagesize($_FILES["image"]["tmp_name"]);
        if ($check !== false) {
            $uploadOk = 1;
        } else {
            echo "<p>File is not an image.</p>";
            $uploadOk = 0;
        }

        // Check if file already exists
        if (file_exists($target_file)) {
            echo "<p>Sorry, file already exists.</p>";
            $uploadOk = 0;
        }

        // Check file size
        if ($_FILES["image"]["size"] > 500000) {
            echo "<p>Sorry, your file is too large.</p>";
            $uploadOk = 0;
        }

        // Allow certain file formats
        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
            echo "<p>Sorry, only JPG, JPEG, PNG & GIF files are allowed.</p>";
            $uploadOk = 0;
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "<p>Sorry, your file was not uploaded.</p>";
        // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                // Insert image, description, and order into database
                $description = $conn->real_escape_string($_POST['description']);
                $order = intval($_POST['order']);
                $stmt = $conn->prepare("INSERT INTO showroom_images (image, description, `order`) VALUES (?, ?, ?)");
                $stmt->bind_param("ssi", $target_file, $description, $order);
                if ($stmt->execute()) {
                    echo "<p>The file ". htmlspecialchars(basename($_FILES["image"]["name"])). " has been uploaded.</p>";
                } else {
                    echo "<p>Sorry, there was an error uploading your file.</p>";
                }
                $stmt->close();
            } else {
                echo "<p>Sorry, there was an error uploading your file.</p>";
            }
        }
    }

    if (isset($_POST['update_order'])) {
        $image_id = intval($_POST['image_id']);
        $new_order = intval($_POST['new_order']);
        $stmt = $conn->prepare("UPDATE showroom_images SET `order` = ? WHERE id = ?");
        $stmt->bind_param("ii", $new_order, $image_id);
        if ($stmt->execute()) {
            echo "<p>Image order updated successfully.</p>";
        } else {
            echo "<p>Sorry, there was an error updating the image order.</p>";
        }
        $stmt->close();
    }

    if (isset($_POST['delete_image'])) {
        $delete_image_id = intval($_POST['delete_image_id']);
        $stmt = $conn->prepare("DELETE FROM showroom_images WHERE id = ?");
        $stmt->bind_param("i", $delete_image_id);
        if ($stmt->execute()) {
            echo "<p>Image deleted successfully.</p>";
        } else {
            echo "<p>Sorry, there was an error deleting the image.</p>";
        }
        $stmt->close();
    }

    $conn->close();
    ?>
    <button onclick="window.location.href='admin_dashboard.php'" class="back-btn">Back to Dashboard</button>
</body>
</html>