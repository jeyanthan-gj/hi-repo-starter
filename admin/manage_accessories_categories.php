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
    <title>Manage Accessories Categories - Admin</title>
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
        h1, h2 {
            color: #333;
        }
        table {
            width: 80%;
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
        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 80%;
            max-width: 800px;
            margin-bottom: 20px;
        }
        form label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        form input[type="text"], form input[type="file"], form textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-bottom: 10px;
        }
        form button, form input[type="submit"] {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            margin-top: 10px;
        }
        form button:hover, form input[type="submit"]:hover {
            background-color: #0056b3;
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
        .subcategory-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        .subcategory-item input[type="text"], .subcategory-item input[type="file"] {
            margin-right: 10px;
        }
        .subcategory-item button {
            background-color: #dc3545;
            margin-left: 10px;
        }
        .subcategory-item button:hover {
            background-color: #c82333;
        }
    </style>
    <script>
        function addSubcategory() {
            var container = document.getElementById('subcategories-container');
            var div = document.createElement('div');
            div.className = 'subcategory-item';
            div.innerHTML = `
                <input type="text" name="subcategories[]" placeholder="Subcategory Name" required>
                <input type="file" name="subcategory_images[]">
                <button type="button" onclick="removeSubcategory(this)">Remove</button>
            `;
            container.appendChild(div);
        }

        function removeSubcategory(button) {
            var container = document.getElementById('subcategories-container');
            container.removeChild(button.parentNode);
        }
    </script>
</head>
<body>
    <h1>Manage Accessories Categories</h1>

    <?php
    // Database connection
    include 'db.php';

    // Define the target directory for uploads
    $target_dir = "uploads/";

    // Handle delete request
    if (isset($_GET['delete_category'])) {
        $id = $_GET['delete_category'];
    
        // Retrieve and delete the category image
        $categoryImageQuery = "SELECT category_image FROM accessories_categories WHERE id = " . $conn->real_escape_string($id);
        $categoryImageResult = $conn->query($categoryImageQuery);
        if ($categoryImageResult->num_rows > 0) {
            $categoryImageRow = $categoryImageResult->fetch_assoc();
            $categoryImagePath = "uploads/" . $categoryImageRow['category_image'];
            if (file_exists($categoryImagePath)) {
                unlink($categoryImagePath); // Delete the category image file
            }
        }
    
        // Fetch subcategories to delete their images and related accessories
        $fetchSubcategoriesSql = "SELECT id, subcategory_image FROM accessories_subcategories WHERE category_id = " . $conn->real_escape_string($id);
        $subcategoriesResult = $conn->query($fetchSubcategoriesSql);
    
        if ($subcategoriesResult->num_rows > 0) {
            while ($subcategory = $subcategoriesResult->fetch_assoc()) {
                // Delete subcategory image
                $subcategoryImagePath = "uploads/" . $subcategory['subcategory_image'];
                if (file_exists($subcategoryImagePath)) {
                    unlink($subcategoryImagePath); // Delete the subcategory image file
                }
    
                // Delete related accessories for the subcategory
                $deleteSubcategoryAccessoriesSql = "DELETE FROM accessories WHERE subcategory_id = " . $conn->real_escape_string($subcategory['id']);
                $conn->query($deleteSubcategoryAccessoriesSql);
            }
        }
    
        // Delete related subcategories
        $deleteSubcategoriesSql = "DELETE FROM accessories_subcategories WHERE category_id = " . $conn->real_escape_string($id);
        $conn->query($deleteSubcategoriesSql);
    
        // Delete the category
        $deleteCategorySql = "DELETE FROM accessories_categories WHERE id = " . $conn->real_escape_string($id);
        if ($conn->query($deleteCategorySql) === TRUE) {
            echo "<p>Category and associated images deleted successfully</p>";
        } else {
            echo "<p>Error deleting category: " . $conn->error . "</p>";
        }
    }


    // Handle update request
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['update_category'])) {
        $id = $_POST['id'];
        $category_name = $_POST['category_name'];
        $new_category_image = $_FILES['category_image']['name'];
    
        // Handle file upload and delete old image if a new image is uploaded
        if ($new_category_image) {
            // Retrieve the old image path from the database
            $oldImageQuery = "SELECT category_image FROM accessories_categories WHERE id = " . $conn->real_escape_string($id);
            $oldImageResult = $conn->query($oldImageQuery);
            if ($oldImageResult->num_rows > 0) {
                $oldImageRow = $oldImageResult->fetch_assoc();
                $oldImagePath = "uploads/" . $oldImageRow['category_image'];
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath); // Delete the old image file
                }
            }
    
            // Upload the new image
            $target_file = $target_dir . basename($_FILES["category_image"]["name"]);
            move_uploaded_file($_FILES["category_image"]["tmp_name"], $target_file);
            $category_image = $new_category_image; // Set the new image name
        } else {
            // If no new image is uploaded, keep the existing image
            $category_image = $_POST['existing_image'];
        }
    
        // Update the category in the database
        $updateSql = "UPDATE accessories_categories SET 
            category_name = '" . $conn->real_escape_string($category_name) . "',
            category_image = '" . $conn->real_escape_string($category_image) . "'
            WHERE id = " . $conn->real_escape_string($id);
    
        if ($conn->query($updateSql) === TRUE) {
            echo "<p>Category updated successfully</p>";
        } else {
            echo "<p>Error updating category: " . $conn->error . "</p>";
        }
    
        // Handle subcategories
        if (!empty($_POST['subcategories'])) {
            // Fetch existing subcategories to delete related accessories
            $fetchSubcategoriesSql = "SELECT id FROM accessories_subcategories WHERE category_id = " . $conn->real_escape_string($id);
            $subcategoriesResult = $conn->query($fetchSubcategoriesSql);
    
            if ($subcategoriesResult->num_rows > 0) {
                while ($subcategory = $subcategoriesResult->fetch_assoc()) {
                    $deleteSubcategoryAccessoriesSql = "DELETE FROM accessories WHERE subcategory_id = " . $conn->real_escape_string($subcategory['id']);
                    $conn->query($deleteSubcategoryAccessoriesSql);
                }
            }
    
            // Delete existing subcategories
            $deleteSubcategoriesSql = "DELETE FROM accessories_subcategories WHERE category_id = " . $conn->real_escape_string($id);
            $conn->query($deleteSubcategoriesSql);
    
            // Add updated subcategories
            $subcategories = $_POST['subcategories'];
            $subcategory_images = $_FILES['subcategory_images']['name'];
            for ($i = 0; $i < count($subcategories); $i++) {
                $subcategory = $conn->real_escape_string($subcategories[$i]);
                if (!empty($subcategory_images[$i])) {
                    $subcategory_image = $subcategory_images[$i];
                    $target_file = $target_dir . basename($_FILES["subcategory_images"]["name"][$i]);
                    move_uploaded_file($_FILES["subcategory_images"]["tmp_name"][$i], $target_file);
                } else {
                    $subcategory_image = $_POST['existing_subcategory_images'][$i];
                }
                $addSubcategorySql = "INSERT INTO accessories_subcategories (category_id, subcategory_name, subcategory_image) VALUES ($id, '$subcategory', '$subcategory_image')";
                $conn->query($addSubcategorySql);
            }
        } else {
            // If no subcategories are provided, delete all existing subcategories
            $deleteSubcategoriesSql = "DELETE FROM accessories_subcategories WHERE category_id = " . $conn->real_escape_string($id);
            $conn->query($deleteSubcategoriesSql);
        }
    }

    // Handle add request
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['add_category'])) {
        $category_name = $_POST['category_name'];
        $category_image = $_FILES['category_image']['name'];

        // Handle file upload
        $target_file = $target_dir . basename($_FILES["category_image"]["name"]);
        move_uploaded_file($_FILES["category_image"]["tmp_name"], $target_file);

        $addSql = "INSERT INTO accessories_categories (category_name, category_image) VALUES (
            '" . $conn->real_escape_string($category_name) . "',
            '" . $conn->real_escape_string($category_image) . "'
        )";

        if ($conn->query($addSql) === TRUE) {
            $category_id = $conn->insert_id;
            echo "<p>Category added successfully</p>";

            // Handle subcategories
            if (!empty($_POST['subcategories'])) {
                $subcategories = $_POST['subcategories'];
                $subcategory_images = $_FILES['subcategory_images']['name'];
                for ($i = 0; $i < count($subcategories); $i++) {
                    $subcategory = $conn->real_escape_string($subcategories[$i]);
                    $subcategory_image = $subcategory_images[$i];
                    $target_file = $target_dir . basename($_FILES["subcategory_images"]["name"][$i]);
                    move_uploaded_file($_FILES["subcategory_images"]["tmp_name"][$i], $target_file);
                    $addSubcategorySql = "INSERT INTO accessories_subcategories (category_id, subcategory_name, subcategory_image) VALUES ($category_id, '$subcategory', '$subcategory_image')";
                    $conn->query($addSubcategorySql);
                }
            }
        } else {
            echo "<p>Error adding category: " . $conn->error . "</p>";
        }
    }

    // Fetch all accessory categories from the accessories_categories table
    $categorySql = "SELECT * FROM accessories_categories";
    $result = $conn->query($categorySql);
    ?>

    <table>
        <tr>
            <th>Category Name</th>
            <th>Image</th>
            <th>Subcategories</th>
            <th>Actions</th>
        </tr>
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["category_name"] . "</td>";
                echo "<td><img src='uploads/" . $row["category_image"] . "' alt='" . $row["category_name"] . "' width='50'></td>";
                echo "<td>";
                $subcategorySql = "SELECT * FROM accessories_subcategories WHERE category_id = " . $row["id"];
                $subcategoryResult = $conn->query($subcategorySql);
                if ($subcategoryResult->num_rows > 0) {
                    while($subcategoryRow = $subcategoryResult->fetch_assoc()) {
                        echo $subcategoryRow["subcategory_name"] . " <img src='uploads/" . $subcategoryRow["subcategory_image"] . "' alt='" . $subcategoryRow["subcategory_name"] . "' width='30'><br>";
                    }
                } else {
                    echo "No subcategories";
                }
                echo "</td>";
                echo "<td><a href='?edit_category=" . $row["id"] . "'>Edit</a> | <a href='?delete_category=" . $row["id"] . "'>Delete</a></td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='4'>No categories found</td></tr>";
        }
        ?>
    </table>

    <?php
    // Handle edit request
    if (isset($_GET['edit_category'])) {
        $id = $_GET['edit_category'];
        $editSql = "SELECT * FROM accessories_categories WHERE id = " . $conn->real_escape_string($id);
        $editResult = $conn->query($editSql);

        if ($editResult->num_rows > 0) {
            $editRow = $editResult->fetch_assoc();
            ?>
            <h2>Edit Category</h2>
            <form method="post" action="" enctype="multipart/form-data">
                <input type="hidden" name="id" value="<?php echo $editRow['id']; ?>">
                <label for="category_name">Category Name:</label>
                <input type="text" id="category_name" name="category_name" value="<?php echo $editRow['category_name']; ?>" required><br>
                <label for="category_image">Category Image:</label>
                <input type="file" id="category_image" name="category_image"><br>
                <input type="hidden" name="existing_image" value="<?php echo $editRow['category_image']; ?>">
                <label for="subcategories">Subcategories (optional):</label>
                <div id="subcategories-container">
                    <?php
                    $subcategorySql = "SELECT * FROM accessories_subcategories WHERE category_id = " . $editRow['id'];
                    $subcategoryResult = $conn->query($subcategorySql);
                    if ($subcategoryResult->num_rows > 0) {
                        while($subcategoryRow = $subcategoryResult->fetch_assoc()) {
                            echo "<div class='subcategory-item'>";
                            echo "<input type='text' name='subcategories[]' value='" . $subcategoryRow['subcategory_name'] . "' required>";
                            echo "<input type='file' name='subcategory_images[]'>";
                            echo "<input type='hidden' name='existing_subcategory_images[]' value='" . $subcategoryRow['subcategory_image'] . "'>";
                            echo "<button type='button' onclick='removeSubcategory(this)'>Remove</button>";
                            echo "</div>";
                        }
                    }
                    ?>
                </div>
                <button type="button" onclick="addSubcategory()">Add Subcategory</button><br>
                <input type="submit" name="update_category" value="Update Category">
            </form>
            <?php
        } else {
            echo "<p>Category not found</p>";
        }
    } else {
        ?>
        <h2>Add New Category</h2>
        <form method="post" action="" enctype="multipart/form-data">
            <label for="category_name">Category Name:</label>
            <input type="text" id="category_name" name="category_name" required><br>
            <label for="category_image">Category Image:</label>
            <input type="file" id="category_image" name="category_image" required><br>
            <label for="subcategories">Subcategories (optional):</label>
            <div id="subcategories-container"></div>
            <button type="button" onclick="addSubcategory()">Add Subcategory</button><br>
            <input type="submit" name="add_category" value="Add Category">
        </form>
        <?php
    }
    ?>

    <br>
    <button class="back-btn" onclick="window.location.href='admin_dashboard.php'" style="display: inline-block; padding: 10px 20px; background-color: #6c757d; color: #fff; border: none; border-radius: 5px; cursor: pointer; text-align: center; text-decoration: none; margin-top: 20px;">Back to Dashboard</button>
</body>
</html>