<!-- filepath: /d:/New folder (3)/service_message.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="navbar.css">
    <title>Service Message - Jayam Mobiles</title>
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
        
        /* Container Styles */
        .container {
            max-width: 600px;
            margin: 100px auto 50px; /* Adjusted margin to accommodate fixed navbar */
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            background-color: #fff;
        }

        .container h2 {
            margin-bottom: 20px;
            font-size: 24px;
            text-align: center;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        .form-group input, .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
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
            margin-right: 10px;
        }

        .btn:hover {
            background-color: #0056b3;
        }
          /* Responsive Styles */
          @media (max-width: 768px) {
            body {
                padding-top: 100px; /* Adjusted for medium-sized screens */
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

            
        }
    </style>
</head>
<body>
    <!-- Navigation Bar (Universal for all pages) -->
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


    <div class="container">
        <h2>Service Request</h2>
        <div class="form-group">
            <label for="brand">Brand Name</label>
            <input type="text" id="brand" placeholder="Enter your brand name">
        </div>
        <div class="form-group">
            <label for="model">Model</label>
            <input type="text" id="model" placeholder="Enter your model">
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" rows="4"></textarea>
        </div>
        <button class="btn" onclick="sendMessage('whatsapp')">Send via WhatsApp</button>
    </div>

    <script>
        // Get the service description from the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const serviceDescription = urlParams.get('service');
        document.getElementById('description').value = `Is ${serviceDescription} available for this model?`;

        function sendMessage(platform) {
            const brand = document.getElementById('brand').value;
            const model = document.getElementById('model').value;
            const description = document.getElementById('description').value;

            if (!brand || !model) {
                alert('Please enter both brand name and model.');
                return;
            }

            const message = `Brand: ${brand}\nModel: ${model}\nDescription: ${description}`;
            const encodedMessage = encodeURIComponent(message);

            if (platform === 'instagram') {
                // Open Instagram with pre-typed message
                window.open(`https://www.instagram.com/direct/t/340282366841710300949128169075051173806?text=${encodedMessage}`, '_blank');
            } else if (platform === 'whatsapp') {
                // Open WhatsApp with pre-typed message
                window.open(`https://wa.me/918667200485?text=${encodedMessage}`, '_blank');
            }
        }
    </script>
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