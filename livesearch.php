<?php
include 'db.php';

if (isset($_GET['input'])) {
    $input = $_GET['input'];

    // Query for accessories
    $accessories_query = "
        SELECT 
            id AS accessory_id, 
            name AS accessory_name, 
            image 
        FROM accessories
        WHERE 
            name LIKE ? OR 
            category_id LIKE ? OR 
            subcategory_id LIKE ?";

    // Query for products
    $products_query = "
        SELECT 
            id, 
            brand, 
            model_name, 
            images 
        FROM products
        WHERE 
            brand LIKE ? OR 
            model_name LIKE ?";

    // Prepare statements
    $accessories_stmt = $conn->prepare($accessories_query);
    $products_stmt = $conn->prepare($products_query);

    $search_input = "%$input%";
    $accessories_stmt->bind_param("sss", $search_input, $search_input, $search_input);
    $products_stmt->bind_param("ss", $search_input, $search_input);

    // Execute queries
    $accessories_stmt->execute();
    $accessories_result = $accessories_stmt->get_result();

    $products_stmt->execute();
    $products_result = $products_stmt->get_result();

    $output = "";

    // Display accessories results
    if ($accessories_result->num_rows > 0) {
        while ($row = $accessories_result->fetch_assoc()) {
            $output .= "
            <div class='product-item'>
                <a href='accessory_detail.php?accessory_id={$row['accessory_id']}'>
                    <div class='product-image'>
                        <img src='{$row['image']}' alt='Image' width='100'>
                    </div>
                    <div class='product-details'>
                        <h4>{$row['accessory_name']}</h4>
                    </div>
                </a>
            </div>";
        }
    }

    // Display products results
    if ($products_result->num_rows > 0) {
        while ($row = $products_result->fetch_assoc()) {
            $output .= "
            <div class='product-item'>
                <a href='mobile_details.php?id={$row['id']}&brand={$row['brand']}'>
                    <div class='product-image'>
                        <img src='{$row['images']}' alt='Image' width='100'>
                    </div>
                    <div class='product-details'>
                        <h4>{$row['brand']} - {$row['model_name']}</h4>
                    </div>
                </a>
            </div>";
        }
    }

    // Output results or "No results found"
    echo !empty($output) ? $output : "No results found!";
}
?>
