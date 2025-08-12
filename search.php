<?php
include 'db.php';

header('Content-Type: application/json');

$query = strtolower($_GET['q']);
$sql = "
    SELECT id, brand AS name FROM products WHERE LOWER(brand) LIKE ? OR LOWER(model_name) LIKE ? OR LOWER(description) LIKE ?
    UNION
    SELECT id, name FROM accessories WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ?";

$stmt = $conn->prepare($sql);
$searchQuery = '%' . $query . '%';
$stmt->bind_param('sssss', $searchQuery, $searchQuery, $searchQuery, $searchQuery, $searchQuery);
$stmt->execute();
$result = $stmt->get_result();

$results = [];
while ($row = $result->fetch_assoc()) {
    $results[] = $row;
}

echo json_encode(['results' => $results]);

$stmt->close();
$conn->close();
?>