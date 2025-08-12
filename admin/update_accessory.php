<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: index.php');
    exit;
}
?>
<!-- filepath: /D:/New folder (3)/admin/update_accessory.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Accessory - Admin</title>
    <link rel="stylesheet" href="mp.css">
    <script>
        function loadSubcategories(categoryId) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "get_subcategories.php?category_id=" + categoryId, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    document.getElementById("subcategory-container").innerHTML = xhr.responseText;
                }
            };
            xhr.send();
        }
    </script>
</head>
<body>
    <h2>Update Accessory</h2>
    <?php
    // Database connection
    include 'db.php';

    // Get accessory ID from query parameter
    $accessory_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($accessory_id == 0) {
        echo "<p>Invalid accessory ID</p>";
        exit;
    }

    // Fetch accessory details from the database
    $sql = "SELECT * FROM accessories WHERE id=" . $accessory_id;
    $result = $conn->query($sql);

    if ($result->num_rows == 0) {
        echo "<p>Accessory not found</p>";
        exit;
    }

    $accessory = $result->fetch_assoc();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get form data
        $category_id = $_POST['category'];
        $subcategory_id = isset($_POST['subcategory']) ? $_POST['subcategory'] : null;
        $name = $_POST['name'];
        $description = $_POST['description'];
        $rate = $_POST['rate'];
        $discount = $_POST['discount'];

        // Handle file upload
        if ($_FILES["image"]["name"]) {
            $target_dir = "accessories/";
            $target_file = $target_dir . basename($_FILES["image"]["name"]);
            move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);
        } else {
            $target_file = $accessory['image'];
        }

        // Update accessory in the database
        $stmt = $conn->prepare("UPDATE accessories SET category_id=?, subcategory_id=?, name=?, description=?, rate=?, discount=?, image=? WHERE id=?");
        $stmt->bind_param("iissdssi", $category_id, $subcategory_id, $name, $description, $rate, $discount, $target_file, $accessory_id);

        if ($stmt->execute()) {
            echo "<p>Accessory updated successfully</p>";
        } else {
            echo "<p>Error updating accessory: " . $stmt->error . "</p>";
        }

        $stmt->close();
        $conn->close();
    }
    ?>
    <form action="update_accessory.php?id=<?php echo $accessory_id; ?>" method="post" enctype="multipart/form-data">
        <label for="category">Category:</label>
        <select name="category" id="category" required onchange="loadSubcategories(this.value)">
            <option value="">Select a category</option>
            <?php
            // Fetch categories from the database
            $sql = "SELECT id, category_name FROM accessories_categories";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $selected = $row["id"] == $accessory['category_id'] ? 'selected' : '';
                    echo '<option value="' . $row["id"] . '" ' . $selected . '>' . $row["category_name"] . '</option>';
                }
            } else {
                echo '<option value="">No categories available</option>';
            }
            ?>
        </select>
        <br>
        <div id="subcategory-container">
            <?php
            // Fetch subcategories if available
            if ($accessory['subcategory_id']) {
                $sub_sql = "SELECT id, subcategory_name FROM accessories_subcategories WHERE category_id=" . $accessory['category_id'];
                $sub_result = $conn->query($sub_sql);

                if ($sub_result->num_rows > 0) {
                    echo '<label for="subcategory">Subcategory:</label>';
                    echo '<select name="subcategory" id="subcategory">';
                    echo '<option value="">Select a subcategory</option>';
                    while($sub_row = $sub_result->fetch_assoc()) {
                        $sub_selected = $sub_row["id"] == $accessory['subcategory_id'] ? 'selected' : '';
                        echo '<option value="' . $sub_row["id"] . '" ' . $sub_selected . '>' . $sub_row["subcategory_name"] . '</option>';
                    }
                    echo '</select>';
                }
            }
            ?>
        </div>
        <br>
        <label for="name">Accessory Name:</label>
        <input type="text" name="name" id="name" value="<?php echo $accessory['name']; ?>" required>
        <br>
        <label for="description">Description:</label>
        <textarea name="description" id="description" required><?php echo $accessory['description']; ?></textarea>
        <br>
        <label for="rate">Rate:</label>
        <input type="number" name="rate" id="rate" value="<?php echo $accessory['rate']; ?>" required>
        <br>
        <label for="discount">Discount:</label>
        <input type="number" name="discount" id="discount" value="<?php echo $accessory['discount']; ?>" required>
        <br>
        <label for="image">Accessory Image:</label>
        <input type="file" name="image" id="image">
        <br>
        <input type="submit" name="submit" value="Update Accessory">
    </form>
</body>
</html>