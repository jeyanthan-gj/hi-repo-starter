<!-- filepath: /d:/New folder (3)/product_details.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Details - Jayam Mobiles</title>
    <link rel="stylesheet" href="acc.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php
    // Database connection
    include 'db.php';

    // Fetch product details
    $id = $_GET['id'];
    $sql = "SELECT model_name, description, price, images FROM products WHERE id='$id'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Output data of the row
        $row = $result->fetch_assoc();
        echo '<div class="product-details">';
        echo '<h1>' . $row["model_name"] . '</h1>';
        echo '<img src="admin/' . $row["images"] . '" alt="' . $row["model_name"] . '">';
        echo '<p>' . $row["description"] . '</p>';
        echo '<p>Price: $' . $row["price"] . '</p>';
        echo '<button onclick="window.history.back()">Back</button>';
        echo '<button onclick="window.location.href=\'order.php?id=' . $id . '\'">Order Now</button>';
        echo '</div>';
    } else {
        echo "Product not found";
    }

    $conn->close();
    ?>
    <style>
        body {
            min-height: 100vh; /* Ensure the body takes at least the full viewport height */
            display: flex;
            flex-direction: column;
            margin: 0;
        }
        main {
            flex: 1; /* This will push the footer to the bottom */
        }
    </style>
    
    
        
        <footer style="position: relative; width: 100%; background-color: #f1f1f1; text-align: center; padding: 10px 0; box-shadow: 0 -1px 5px rgba(0,0,0,0.1);">
            <a href="https://www.facebook.com/jayammobileanjugramam" target="_blank" aria-label="Facebook" style="margin: 0 10px; text-decoration: none; color: #3b5998;">Facebook</a>
            <a href="https://www.instagram.com/jayammobiles_anjugramam/" target="_blank" aria-label="Instagram" style="margin: 0 10px; text-decoration: none; color: #E1306C;">Instagram</a>
            <a href="https://wa.me/918667200485" target="_blank" aria-label="Whatsapp" style="margin: 0 10px; text-decoration: none; color: #25D366;">Whatsapp</a>
            <p style="margin: 10px 0 0; color: #333;">&copy; 2023 Jayam Mobiles. All rights reserved.</p>
        </footer>
</body>
</html>