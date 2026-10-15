<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require("database.php");

$productId = $_POST["product-id"];
$transactionId = $_POST["transaction-id"];
$quantity = $_POST["quantity"];
$createdAt = $_POST["created-at"];
$userId = $_POST["user-id"];

$sql = "INSERT INTO inventory_transactions 
        (product_id, transaction_type, quantity, time, user_id)
        VALUES(?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param(
        $stmt,
        'isisi',
        $productId,
        $transactionId,
        $quantity,
        $createdAt,
        $userId
);

if (mysqli_stmt_execute($stmt)){
    echo json_encode([
        "success" => true,
        "message" => "Transaction Added"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to Add"
    ]);
}