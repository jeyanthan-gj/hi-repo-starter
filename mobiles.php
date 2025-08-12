<!-- filepath: /D:/New folder (3)/mobiles.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mobiles - Jayam Mobiles</title>
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
            padding-top: 60px; /* To prevent content from being hidden under the fixed navbar */
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
        /* CSS */
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

.search-results div {
    padding: 10px;
    border-bottom: 1px solid #ddd; /* Adds a border between items */
    width: 100%; /* Ensures items take up the full width */
    display: flex; /* Use flexbox to align items */
    align-items: center; /* Center-align items vertically */
}

.search-results div:last-child {
    border-bottom: none; /* Removes border from the last item */
}

.search-results img {
    max-width: 50px; /* Restrict the maximum width */
    max-height: 50px; /* Restrict the maximum height */
    margin-right: 10px; /* Add some space between image and text */
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
        /* Products Container */
        .products-container {
            display: flex;
            flex-wrap: wrap; /* Allow wrapping for smaller screen sizes */
            justify-content: space-between;
            margin: 100px 20px; /* Adjusted margin to accommodate fixed navbar */
            text-align: center;
        }

        /* Product Item */
        .product-item {
            width: 30%; /* Ensure 3 items per row */
            margin: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        /* Ensure the logo image fills the box */
        .product-item img {
            width: 100%;
            height: 200px; /* Set a fixed height for all images */
            object-fit: cover; /* Ensures images maintain aspect ratio while filling the space */
            border-bottom: 1px solid #ddd;
            border-radius: 5px 5px 0 0;
        }

        /* Product Title/Text */
        .product-item p {
            margin: 10px 0;
            font-size: 18px;
            font-weight: bold;
            color: #333;
            display: block;
            text-align: center; /* Center the text inside the box */
            word-wrap: break-word; /* Ensure text wraps correctly if it's too long */
        }

        /* Hover Effect for Product Items */
        .product-item:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        /* Link styling inside product items */
        .product-item a {
            text-decoration: none;
            color: inherit;
        }

        /* Back Button */
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
            margin: 20px;
        }

        .back-btn:hover {
            background-color: #5a6268;
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
            .products-container {
                flex-direction: column;
                align-items: center;
            }

            .product-item {
                width: 48%; /* Adjust product item size for tablets (2 per row) */
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

            .product-item {
                width: 100%; /* Stack product items on very small screens */
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

    <!-- Mobiles List -->
    <div class="products-container" id="products-container">
        <?php
        if (isset($_GET['brand']) && $_GET['brand'] != '') {
            // Database connection
            include 'db.php';

            $brandFilter = $_GET['brand'];
            $sql = "SELECT * FROM products WHERE brand = '" . $conn->real_escape_string($brandFilter) . "'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $imagePath = 'admin/' . $row["images"];
                    echo '<div class="product-item">';
                    echo '<a href="mobile_details.php?id=' . $row["id"] . '&brand=' . $brandFilter . '">';
                    echo '<img src="' . $imagePath . '" alt="' . $row["model_name"] . '">';
                    echo '<p>' . $row["model_name"] . '</p>';
                    echo '</a>';
                    echo '</div>';
                }
            } else {
                echo "<p>No mobiles found for this brand</p>";
            }
        } else {
            echo "<p>No brand selected</p>";
        }
        ?>
    </div>
    <br>
    <button class="back-btn" onclick="window.location.href='brands.php'">Back to Brands</button>
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