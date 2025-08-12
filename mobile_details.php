<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mobile Details</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <style>
        /* Reset some default browser styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Body styles */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            overflow-x: hidden;
            color: #333; /* Default text color */
            padding-top: 80px; /* Space for the fixed navbar */
        }

        /* Navigation styles */
        .navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #333;
            padding: 10px 20px;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 1000;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .logo-img {
            height: 50px;
            margin-right: 10px;
        }
        .search-container {
            flex: 1;
            display: flex;
            align-items: center;
            margin: 0 10px;
            position: relative;
        }
        .search-bar {
            width: 100%;
            height: 40px;
            padding: 5px;
            border: none;
            border-radius: 5px;
            background-color: #f4f4f4;
            font-size: 16px; /* Ensure text is readable */
        }

        /* Search Results Container */
        .search-results {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%; /* Ensure the width is 100% */
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            overflow: hidden; /* Ensures content does not overflow the box */
        }

        /* Individual Search Result Item */
        .search-results .search-result-item {
            padding: 10px;
            border-bottom: 1px solid #ddd; /* Adds a border between items */
            width: 100%; /* Ensures items take up the full width */
            display: flex; /* Use flexbox to align items */
            align-items: center; /* Center-align items vertically */
        }

        .search-results .search-result-item:last-child {
            border-bottom: none; /* Removes border from the last item */
        }

        /* Image within Search Result Item */
        .search-results .search-result-item img {
            max-width: 50px; /* Restrict the maximum width */
            max-height: 50px; /* Restrict the maximum height */
            margin-right: 10px; /* Add some space between image and text */
            flex-shrink: 0; /* Prevent the image from shrinking */
        }

        /* Text within Search Result Item */
        .search-results .search-result-item span {
            flex-grow: 1; /* Make the text span take up remaining space */
            font-size: 16px; /* Adjust text size */
            color: #333; /* Text color */
            white-space: nowrap; /* Prevent text from wrapping */
            overflow: hidden; /* Hide overflow text */
            text-overflow: ellipsis; /* Add ellipsis for overflow text */
        }

        .nav-buttons {
            display: flex;
            align-items: center;
        }
        .nav-btn {
            background-color: #555;
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            margin-left: 5px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
            font-size: 16px; /* Ensure text is readable */
        }
        .nav-btn:hover {
            background-color: #777;
        }
        /* Remove green outline on focus */
        .search-bar:focus {
            outline: none;
            box-shadow: none;
        }

        /* Main Content Styles */
        main {
            padding: 80px 20px 20px; /* Add padding for fixed navbar */
        }

        /* Section styles */
        .section {
            padding: 20px;
            background-color: white;
            margin: 40px 20px 20px 20px; /* Increased top margin */
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #222; /* Darker text for headings */
            margin-bottom: 20px;
            font-size: 2.5rem;
        }

        h2 {
            color: #444; /* Slightly lighter than h1 */
            margin-bottom: 15px;
            font-size: 2rem;
        }

        p {
            color: #555; /* Medium gray for paragraphs */
            margin-bottom: 20px;
            line-height: 1.8;
        }

        ul {
            list-style-type: disc;
            margin-left: 20px;
        }

        ul li {
            color: #555; /* Medium gray for list items */
            margin-bottom: 10px;
        }

        /* Footer styles */
        footer {
            text-align: center;
            padding: 20px 0;
            background-color: #333;
            color: white;
            margin-top: 40px;
            clear: both;
        }

        footer a {
            color: #4CAF50; /* Green for links */
            text-decoration: none;
        }

        footer a:hover {
            text-decoration: underline;
        }

        /* Product Details Container */
        .product-details-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding: 20px;
            background-color: #fff;
            margin: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        /* Product Image Section */
        .product-image {
            flex: 1;
            max-width: 400px;
            margin-right: 20px;
            margin-top: 20px; /* Add margin to position image below navbar */
        }

        .product-image img {
            width: 100%;
            height: auto;
            border-radius: 5px;
        }

        /* Product Details Section */
        .product-details {
            flex: 2;
            max-width: 600px;
        }

        .product-details h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }

        .product-details p {
            margin: 10px 0;
            font-size: 16px;
            line-height: 1.5;
        }

        .product-details .price {
            font-size: 22px;
            color: #b12704;
            margin: 10px 0;
        }

        .product-details .original-price {
            font-size: 18px;
            color: #767676;
            text-decoration: line-through;
            margin: 10px 0;
        }

        .product-details .discount {
            font-size: 18px;
            color: #b12704;
            margin: 10px 0;
        }

        .product-details .rating {
            font-size: 18px;
            color: #ffa41c;
            margin: 10px 0;
        }

        .product-details .reviews {
            font-size: 16px;
            color: #007185;
            margin: 10px 0;
        }

        .product-details .specifications,
        .product-details .offers,
        .product-details .variants {
            margin: 20px 0;
        }

        .product-details .specifications h3,
        .product-details .offers h3,
        .product-details .variants h3 {
            font-size: 20px;
            margin-bottom: 10px;
        }

        /* Button Style */
        button {
            background-color: #333;
            color: white;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            font-size: 16px;
            border-radius: 4px;
            text-decoration: none;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #555;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
            body {
                padding-top: 100px; /* Adjusted for medium-sized screens */
            }

            .navbar {
                flex-direction: column;
                align-items: flex-start;
            }
            .search-container {
                width: 100%;
                margin: 10px 0;
            }
            .nav-buttons {
                width: 100%;
                justify-content: space-between;
                margin-top: 10px; /* Add margin for spacing */
            }
            .nav-btn {
                width: 30%; /* Adjust button width */
                margin: 5px 0; /* Add margin for spacing */
            }

            .section {
                margin: 10px;
                padding: 15px;
                margin-top: 80px; /* Add a top margin to avoid overlap with fixed navbar */
            }

            h1 {
                font-size: 2rem; /* Smaller heading for medium screens */
            }

            h2 {
                font-size: 1.8rem; /* Smaller heading for medium screens */
            }

            .product-details-container {
                flex-direction: column;
                align-items: center;
            }

            .product-image {
                order: 1; /* Ensure the product image is first */
                margin-right: 0;
                margin-bottom: 20px;
            }

            .product-details {
                order: 2; /* Ensure the product details are second */
                max-width: 100%;
            }
        }

        @media (max-width: 480px) {
            body {
                padding-top: 110px; /* Adjusted for very small screens */
            }

            .navbar {
                padding: 8px;
            }
            .logo-img {
                height: 35px; /* Smaller on very small screens */
            }
            .search-container {
                width: 100%;
                margin: 10px 0;
            }
            .nav-btn {
                width: 100%;
                margin: 5px 0;
                font-size: 14px; /* Slightly smaller font for small screens */
            }
            .navbar a.logo {
                font-size: 20px; /* Smaller logo on mobile */
            }

            h1 {
                font-size: 1.6rem; /* Smaller heading for small screens */
            }

            h2 {
                font-size: 1.5rem; /* Smaller heading for small screens */
            }
        }
    </style>
</head>
<body>
    <!-- Navigation Bar (Universal for all pages) -->
    <nav class="navbar">
        <a href="index.html" class="logo">
            <img src="logos/logo.jpeg" alt="Jayam Mobile Logo" class="logo-img">
        </a>
        <div class="search-container">
            <input type="text" id="myInput" class="search-bar" placeholder="Search...">
            <div id="searchResult" class="search-results" style="display: none;"></div>
        </div>
        <div class="nav-buttons">
            <button class="nav-btn" onclick="window.location.href='products.html'">Products</button>
            <button class="nav-btn" onclick="window.location.href='showroom.php'">Gallery</button>
            <button class="nav-btn" onclick="window.location.href='about.html'">About Us</button>
        </div>
    </nav>
    <script>
        $(document).ready(function(){
            $("#myInput").on("keyup", function() {
                var inputVal = $(this).val();
                if(inputVal.length){
                    $.get("livesearch.php?input="+inputVal, function(data){
                        $("#searchResult").html(data);
                        $("#searchResult").show();
                    });
                } else{
                    $("#searchResult").hide();
                }
            });
        });
    </script>

    <div class="product-details-container">
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
                $imageUrl = 'admin/' . $row["images"];
                $modelName = $row["model_name"];
                $price = $row["price"];
                $originalPrice = $row["original_price"];
                $discount = $row["discount"];
                $rating = $row["rating"];
                $reviews = $row["reviews"];
                $specifications = $row["specifications"];
                $offers = $row["offers"];
                $variants = $row["variants"];

                echo '<div class="product-image">';
                echo '<img src="' . $imageUrl . '" alt="' . $modelName . '">';
                echo '</div>';
                echo '<div class="product-details">';
                echo '<h1>' . $modelName . '</h1>';
                echo '<p class="price">Price: $' . $price . '</p>';
                echo '<p class="original-price">Original Price: $' . $originalPrice . '</p>';
                echo '<p class="discount">Discount: ' . $discount . '%</p>';
                echo '<p class="rating">Rating: ' . $rating . '</p>';
                echo '<p class="reviews">Reviews: ' . $reviews . '</p>';
                echo '<div class="specifications">';
                echo '<h3>Specifications:</h3>';
                echo '<p>' . $specifications . '</p>';
                echo '</div>';
                echo '<div class="offers">';
                echo '<h3>Offers:</h3>';
                echo '<p>' . $offers . '</p>';
                echo '</div>';
                echo '<div class="variants">';
                echo '<h3>Variants:</h3>';
                echo '<p>' . $variants . '</p>';
                echo '</div>';
                echo '<button onclick="window.location.href=\'https://wa.me/918667200485?text=' . urlencode("Is the following mobile available?\n\nModel: $modelName\nPrice: $$price\nOriginal Price: $$originalPrice\nDiscount: $discount%\nRating: $rating\nReviews: $reviews\nSpecifications: $specifications\nOffers: $offers\nVariants: $variants\nImage: $imageUrl") . '\'" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: #fff; border: none; border-radius: 5px; cursor: pointer; text-align: center; text-decoration: none; margin-top: 20px;">Buy Now</button>';
                echo '</div>';
            } 
             else {
                echo "<p>Mobile not found</p>";
            }
        } else {
            echo "<p>No mobile selected</p>";
        }
        ?>
    </div>
    <br>
    <button onclick="window.location.href='mobiles.php?brand=<?php echo isset($_GET['brand']) ? $_GET['brand'] : ''; ?>'" style="display: inline-block; padding: 10px 20px; background-color: #6c757d; color: #fff; border: none; border-radius: 5px; cursor: pointer; text-align: center; text-decoration: none;">Back to Mobiles</button>
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