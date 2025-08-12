<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: index.php');
    exit;
}
?>

<?php
$file = '../about.html';

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $updatedContent = $_POST["aboutContent"];
    $htmlContent = file_get_contents($file);

    // Replace the "About Us" section in the HTML
    $updatedHtml = preg_replace(
        '/<section id="about" class="section">.*?<\/section>/s',
        '<section id="about" class="section">' . $updatedContent . '</section>',
        $htmlContent
    );

    // Save changes to the HTML file
    file_put_contents($file, $updatedHtml);
    $message = "The About Us section has been updated successfully!";
}

// Extract the current content for editing
$htmlContent = file_get_contents($file);
preg_match('/<section id="about" class="section">(.*?)<\/section>/s', $htmlContent, $matches);
$currentContent = $matches[1] ?? "Section not found.";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit About Us</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 800px;
            margin: auto;
        }
        textarea {
            width: 100%;
            height: 300px;
            margin-bottom: 20px;
            padding: 10px;
            font-size: 16px;
        }
        .message {
            color: green;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Edit About Us Section</h1>
        <?php if (!empty($message)): ?>
            <p class="message"><?= htmlspecialchars($message) ?></p>
        <?php endif; ?>
        <form method="POST" action="">
            <textarea name="aboutContent"><?= htmlspecialchars($currentContent) ?></textarea>
            <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
    </div>
</body>
</html>
