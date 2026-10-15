
<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require __DIR__ . "/../database.php";

$sql = "SELECT * FROM inventory_transactions ORDER BY time DESC";

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