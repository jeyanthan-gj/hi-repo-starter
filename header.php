<!DOCTYPE html>
<html>
<head>
  <title></title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <style>
    .swiper-container {
        width: 100%;
        height: 100vh;
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
        max-width: 80%;
        height: auto;
        object-fit: cover;
    }
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
    .search-bar {
        flex: 1;
        margin: 0 10px;
        padding: 5px;
        min-width: 150px;
        border: none;
        border-radius: 5px;
        background-color: #f4f4f4;
        font-size: 16px; /* Ensure text is readable */
    }
    .search-bar:focus {
        outline: 2px solid #4CAF50; /* Highlight when focused */
    }
    .nav-buttons {
        display: flex;
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
    /* Responsive Styles */
    @media (max-width: 768px) {
        body {
            padding-top: 100px; /* Adjusted for medium-sized screens */
        }
        .navbar {
            flex-direction: column;
            align-items: flex-start;
        }
        .search-bar {
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
        .search-bar {
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
    }
  </style>
</head>
<body>

<div class="container">
  <div class="form-group">
    <input type="text" id="myInput" class="search-bar" placeholder="Search...">
  </div>
  <div id="searchResult" style="display: none;"></div>
</div>

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

</body>
</html>
