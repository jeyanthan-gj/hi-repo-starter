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
    <title>Add Accessory</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 400px;
            max-width: 100%;
        }
        h2 {
            text-align: center;
            color: #333;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .form-group input, .form-group textarea, .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .form-group input[type="file"] {
            padding: 3px;
        }
        .btn {
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
        .btn:hover {
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
            margin-top: 10px;
            margin-right: 10px;
        }
        .back-btn:hover {
            background-color: #5a6268;
        }
    </style>
    <script>
        function loadSubcategories(categoryId) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'get_subcategories.php?category_id=' + categoryId, true);
            xhr.onload = function() {
                if (this.status == 200) {
                    var subcategoryContainer = document.getElementById('subcategory-container');
                    var subcategorySelect = document.getElementById('subcategory');
                    subcategorySelect.innerHTML = this.responseText;
                    if (subcategorySelect.options.length > 1) {
                        subcategoryContainer.style.display = 'block';
                    } else {
                        subcategoryContainer.style.display = 'none';
                    }
                }
            };
            xhr.send();
        }
    </script>
</head>
<body>
    <div class="container">
        <h2>Add Accessory</h2>
        <form action="add_accessory.php" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="category">Category</label>
                <select name="category" id="category" required onchange="loadSubcategories(this.value)">
                    <option value="">Select Category</option>
                    <?php
                    // Database connection
                    include 'db.php';

                    // Fetch categories
                    $categorySql = "SELECT id, category_name FROM accessories_categories";
                    $categoryResult = $conn->query($categorySql);

                    if ($categoryResult->num_rows > 0) {
                        while($categoryRow = $categoryResult->fetch_assoc()) {
                            echo "<option value='" . $categoryRow['id'] . "'>" . $categoryRow['category_name'] . "</option>";
                        }
                    } else {
                        echo "<option value=''>No categories available</option>";
                    }
                    ?>
                </select>
            </div>
            <div class="form-group" id="subcategory-container" style="display: none;">
                <label for="subcategory">Subcategory</label>
                <select name="subcategory" id="subcategory">
                    <option value="">Select Subcategory</option>
                </select>
            </div>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" required>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea name="description" id="description" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label for="rate">Rate</label>
                <input type="number" name="rate" id="rate" required>
            </div>
            <div class="form-group">
                <label for="discount">Discount</label>
                <input type="number" name="discount" id="discount">
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input type="file" name="image" id="image" required>
            </div>
            <button type="submit" class="btn">Add Accessory</button>
            <a href="javascript:history.back()" class="back-btn">Back</a>
        </form>
    </div>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get form data
        $category_id = $_POST['category'];
        $subcategory_id = !empty($_POST['subcategory']) ? $_POST['subcategory'] : NULL;
        $name = $_POST['name'];
        $description = $_POST['description'];
        $rate = $_POST['rate'];
        $discount = $_POST['discount'];

        // Handle file upload
        $target_dir = "accessories/";
        $target_file = $target_dir . basename($_FILES["image"]["name"]);
        move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);

        // Insert accessory into the database
        $stmt = $conn->prepare("INSERT INTO accessories (category_id, subcategory_id, name, description, rate, discount, image) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("iissdis", $category_id, $subcategory_id, $name, $description, $rate, $discount, $target_file);

        if ($stmt->execute()) {
            echo "<p>Accessory added successfully</p>";
        } else {
            echo "<p>Error adding accessory: " . $stmt->error . "</p>";
        }

        $stmt->close();
        $conn->close();
    }
    ?>
</body>
</html>