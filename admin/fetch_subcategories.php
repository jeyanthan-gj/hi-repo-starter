<?php
include 'db.php';

if (isset($_POST['category_id'])) {
    $category_id = $_POST['category_id'];

    // Fetch subcategories based on the selected category
    $stmt = $conn->prepare("SELECT id, subcategory_name FROM accessories_subcategories WHERE category_id = ?");
    $stmt->bind_param("i", $category_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo '<option value="' . $row['id'] . '">' . $row['subcategory_name'] . '</option>';
        }
    } else {
        echo '<option value="">No subcategories found</option>';
    }

    $stmt->close();
    $conn->close();
}
?>