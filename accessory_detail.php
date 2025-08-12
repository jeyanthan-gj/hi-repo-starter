<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessories - Jayam Mobiles</title>
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
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

        /* Body and General Styles */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            display: flex;
            flex-direction: column;
            min-height: 100vh; /* Ensures body takes full height of the viewport */
            padding-top: 60px; /* To prevent content from being hidden under the fixed navbar */
        }

        .content-wrapper {
            flex: 1; /* Takes up remaining space in the viewport */
        }

        /* Navbar Styles */
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
        .search-results {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            z-index: 1001;
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

        /* Product Detail Container */
        .product-detail-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            margin-top: 80px; /* Adjusted for fixed navbar */
        }

        .product-detail {
            display: flex;
            flex-direction: row;
            border: 1px solid #ddd;
            padding: 20px;
            max-width: 800px;
            width: 100%;
            background-color: #fff;
        }

        .product-detail img {
            max-width: 300px;
            width: auto;
            height: auto;
            margin-right: 20px;
        }

        .product-detail-info {
            display: flex;
            flex-direction: column;
        }

        .product-detail-info h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }

        .product-detail-info p {
            margin-bottom: 10px;
        }

        .product-detail-info .rate {
            font-size: 20px;
            color: #b12704;
            margin-bottom: 20px;
        }

        .product-detail-info .buy-btn {
            background-color: #25D366;
            border: none;
            padding: 10px;
            text-align: center;
            cursor: pointer;
            text-decoration: none;
            color: #fff;
            font-weight: bold;
            border-radius: 5px;
        }

        .product-detail-info .buy-btn:hover {
            background-color: #128C7E;
        }

        .product-detail-info ul {
            list-style-type: disc;
            padding-left: 20px;
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

            .product-detail {
                flex-direction: column;
                align-items: center;
            }

            .product-detail img {
                margin-right: 0;
                margin-bottom: 20px;
                max-width: 100%;
            }

            .product-detail-info h1 {
                font-size: 20px;
            }

            .product-detail-info .rate {
                font-size: 18px;
            }

            .product-detail-info .buy-btn {
                padding: 8px;
                font-size: 14px;
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

            .product-detail-info h1 {
                font-size: 18px;
            }

            .product-detail-info .rate {
                font-size: 16px;
            }

            .product-detail-info .buy-btn {
                padding: 6px;
                font-size: 12px;
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
                $.get("livesearch.php?input="+inputVal,function(data){
                    $("#searchResult").html(data);
                    $("#searchResult").show();
                });
            } else{
                    $("#searchResult").hide();
                }
            });
        });
    </script>

    <div class="content-wrapper">
        <!-- Accessory Detail -->
        <div class="product-detail-container">
            <?php
            // Database connection
            include 'db.php';

            // Get accessory ID from URL
            $accessory_id = filter_input(INPUT_GET, 'accessory_id', FILTER_VALIDATE_INT);

            if (!$accessory_id) {
                echo "<p>Invalid accessory ID</p>";
                exit;
            }

            // Fetch accessory details from the database
            $stmt = $conn->prepare("SELECT id, name, image, description, rate FROM accessories WHERE id = ?");
            $stmt->bind_param("i", $accessory_id);
            $stmt->execute();
            $accessory_result = $stmt->get_result();

            if ($accessory_result->num_rows > 0) {
                $accessory = $accessory_result->fetch_assoc();
                $whatsapp_message = "Is the following accessory available?\n\nName: " . $accessory["name"] . "\nRate: $" . $accessory["rate"] . "\nDescription: " . $accessory["description"];
                echo '<div class="product-detail">';
                echo '<img src="admin/' . htmlspecialchars($accessory["image"]) . '" alt="' . htmlspecialchars($accessory["name"]) . '">';
                echo '<div class="product-detail-info">';
                echo '<h1>' . htmlspecialchars($accessory["name"]) . '</h1>';
                echo '<p>' . nl2br(htmlspecialchars($accessory["description"])) . '</p>';
                echo '<p class="rate">Rate: $' . htmlspecialchars($accessory["rate"]) . '</p>';
                echo '<a href="https://wa.me/918667200485?text=' . urlencode($whatsapp_message) . '" class="buy-btn">Buy Now</a>';
                echo '</div>';
                echo '</div>';
            } else {
                echo "<p>Accessory not found</p>";
            }

            $stmt->close();
            $conn->close();
            ?>
        </div>
    </div>
    <footer style="width: 100%; background-color: #f1f1f1; text-align: center; padding: 10px 0; box-shadow: 0 -1px 5px rgba(0,0,0,0.1);">
        <a href="https://www.facebook.com/jayammobileanjugramam" target="_blank" aria-label="Facebook" style="margin: 0 10px; text-decoration: none; color: #3b5998;">Facebook</a>
        <a href="https://www.instagram.com/jayammobiles_anjugramam/" target="_blank" aria-label="Instagram" style="margin: 0 10px; text-decoration: none; color: #E1306C;">Instagram</a>
        <a href="https://wa.me/918667200485" target="_blank" aria-label="Whatsapp" style="margin: 0 10px; text-decoration: none; color: #25D366;">Whatsapp</a>
        <p style="margin: 10px 0 0; color: #333;">&copy; 2023 Jayam Mobiles. All rights reserved.</p>
    </footer>
</body>
</html>