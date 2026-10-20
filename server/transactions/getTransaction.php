<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require __DIR__ . "/../database.php";

$sql = "SELECT t.*, u.username AS username
        FROM inventory_transactions t
        LEFT JOIN users u ON u.id = t.user_id
        ORDER BY t.time DESC, t.id DESC
        LIMIT 20";

$result = mysqli_query($conn, $sql);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch transactions."
    ]);
    exit;
}

$transactions = [];

while ($row = mysqli_fetch_assoc($result)) {
    $transactions[] = $row;
}

echo json_encode([
    "success" => true,
    "transactions" => $transactions
]);

mysqli_free_result($result);
mysqli_close($conn);
