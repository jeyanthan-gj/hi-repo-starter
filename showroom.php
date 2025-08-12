<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Showroom Gallery - Jayam Mobiles</title>

  <link rel="stylesheet" href="style.css" />
  <link
    rel="stylesheet"
    href="https://unpkg.com/swiper/swiper-bundle.min.css"
  />
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* Navbar */
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
      font-size: 16px;
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
      display: none;
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
      font-size: 16px;
    }
    .nav-btn:hover {
      background-color: #777;
    }
    .search-bar:focus {
      outline: none;
      box-shadow: none;
    }

    /* Slideshow container with 16:9 aspect ratio */
    .swiper-container {
      width: 90%;
      max-width: 900px;
      aspect-ratio: 16 / 9;
      margin: 100px auto 40px auto; /* 100px top margin for navbar space */
      border-radius: 10px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
      background: #fff;
    }

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .swiper-slide img {
      display: block;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 10px;
    }

    /* Responsive */
    @media (max-width: 768px) {
      body {
        padding-top: 100px;
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
        margin-top: 10px;
      }
      .nav-btn {
        width: 30%;
        margin: 5px 0;
      }
    }
    @media (max-width: 480px) {
      body {
        padding-top: 110px;
      }
      .navbar {
        padding: 8px;
      }
      .logo-img {
        height: 35px;
      }
      .search-container {
        width: 100%;
        margin: 10px 0;
      }
      .nav-btn {
        width: 100%;
        margin: 5px 0;
        font-size: 14px;
      }
    }

    footer {
      position: relative;
      width: 100%;
      background-color: #f1f1f1;
      text-align: center;
      padding: 10px 0;
      box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
      margin-top: auto;
    }
    footer a {
      margin: 0 10px;
      text-decoration: none;
    }
    footer a[aria-label="Facebook"] {
      color: #3b5998;
    }
    footer a[aria-label="Instagram"] {
      color: #E1306C;
    }
    footer a[aria-label="Whatsapp"] {
      color: #25D366;
    }
    footer p {
      margin: 10px 0 0;
      color: #333;
    }
  </style>
</head>
<body>
  <!-- Navigation Bar -->
  <nav class="navbar">
    <a href="index.html" class="logo">
      <img src="logos/logo.jpeg" alt="Jayam Mobile Logo" class="logo-img" />
    </a>
    <div class="search-container">
      <input
        type="text"
        id="myInput"
        class="search-bar"
        placeholder="Search..."
        autocomplete="off"
      />
      <div id="searchResult" class="search-results"></div>
    </div>
    <div class="nav-buttons">
      <button class="nav-btn" onclick="window.location.href='products.html'">
        Products
      </button>
      <button class="nav-btn" onclick="window.location.href='showroom.php'">
        Gallery
      </button>
      <button class="nav-btn" onclick="window.location.href='about.html'">
        About Us
      </button>
    </div>
  </nav>

  <script>
    $(document).ready(function () {
      $('#myInput').on('keyup', function () {
        var inputVal = $(this).val();
        if (inputVal.length) {
          $.get('livesearch.php?input=' + inputVal, function (data) {
            $('#searchResult').html(data).show();
          });
        } else {
          $('#searchResult').hide();
        }
      });
    });
  </script>

  <!-- Showroom Gallery -->
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <?php
      include 'db.php';
      $stmt = $conn->prepare("SELECT image FROM showroom_images ORDER BY `order` ASC");
      $stmt->execute();
      $result = $stmt->get_result();
      if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
          echo '<div class="swiper-slide">';
          echo '<img src="admin/' . htmlspecialchars($row['image']) . '" alt="Showroom Image" />';
          echo '</div>';
        }
      } else {
        echo "<p>No showroom images found</p>";
      }
      $stmt->close();
      $conn->close();
      ?>
    </div>
    <!-- Pagination -->
    <div class="swiper-pagination"></div>
    <!-- Navigation buttons -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>

  <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

  <script>
    var swiper = new Swiper('.swiper-container', {
      loop: true,
      effect: 'slide',
      speed: 800,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  </script>

  <!-- Footer -->
  <footer>
    <a
      href="https://www.facebook.com/jayammobileanjugramam"
      target="_blank"
      aria-label="Facebook"
      >Facebook</a
    >
    <a
      href="https://www.instagram.com/jayammobiles_anjugramam/"
      target="_blank"
      aria-label="Instagram"
      >Instagram</a
    >
    <a
      href="https://wa.me/918667200485"
      target="_blank"
      aria-label="Whatsapp"
      >Whatsapp</a
    >
    <p>&copy; 2023 Jayam Mobiles. All rights reserved.</p>
  </footer>
</body>
</html>
