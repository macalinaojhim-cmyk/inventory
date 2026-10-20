<?php

session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require __DIR__ . "/../database.php";

function respond(array $payload, int $status = 200)
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

if (!isset($_SESSION["user_id"])) {
    respond(["success" => false, "message" => "You must be logged in to record a transaction"], 401);
}

$productId = $_POST["product_id"] ?? null;
$transactionType = strtoupper(trim($_POST["transaction_type"] ?? ""));
$quantity = $_POST["quantity"] ?? null;

if ($productId === null || !is_numeric($productId)) {
    respond(["success" => false, "message" => "A product is required"]);
}

if ($quantity === null || !is_numeric($quantity) || (int) $quantity <= 0) {
    respond(["success" => false, "message" => "Quantity must be a positive number"]);
}

if (!in_array($transactionType, ["STOCK IN", "STOCK OUT"], true)) {
    respond(["success" => false, "message" => "Transaction type must be STOCK IN or STOCK OUT"]);
}

$productId = (int) $productId;
$quantity = (int) $quantity;
$userId = (int) $_SESSION["user_id"];

mysqli_begin_transaction($conn);

$select = mysqli_prepare(
    $conn,
    "SELECT id, name, stock FROM products WHERE id = ? FOR UPDATE"
);

mysqli_stmt_bind_param($select, "i", $productId);
mysqli_stmt_execute($select);

$product = mysqli_stmt_get_result($select)->fetch_assoc();

if (!$product) {
    mysqli_rollback($conn);
    respond(["success" => false, "message" => "Product not found"], 404);
}

$currentStock = (int) $product["stock"];

if ($transactionType === "STOCK OUT" && $currentStock < $quantity) {
    mysqli_rollback($conn);
    respond([
        "success" => false,
        "message" => "Only {$currentStock} units of {$product["name"]} are in stock"
    ], 409);
}

$newStock = $transactionType === "STOCK IN"
    ? $currentStock + $quantity
    : $currentStock - $quantity;

$insert = mysqli_prepare(
    $conn,
    "INSERT INTO inventory_transactions
        (product_id, product_name, transaction_type, quantity, time, user_id)
     VALUES (?, ?, ?, ?, NOW(), ?)"
);

mysqli_stmt_bind_param(
    $insert,
    "issii",
    $productId,
    $product["name"],
    $transactionType,
    $quantity,
    $userId
);

if (!mysqli_stmt_execute($insert)) {
    mysqli_rollback($conn);
    respond([
        "success" => false,
        "message" => "Failed to record transaction",
        "error" => mysqli_stmt_error($insert)
    ], 500);
}

$update = mysqli_prepare(
    $conn,
    "UPDATE products SET stock = ? WHERE id = ?"
);

mysqli_stmt_bind_param($update, "ii", $newStock, $productId);

if (!mysqli_stmt_execute($update)) {
    mysqli_rollback($conn);
    respond([
        "success" => false,
        "message" => "Failed to update stock",
        "error" => mysqli_stmt_error($update)
    ], 500);
}

mysqli_commit($conn);

respond([
    "success" => true,
    "message" => "Transaction Added",
    "stock" => $newStock,
    "transaction" => [
        "product_id" => $productId,
        "product_name" => $product["name"],
        "transaction_type" => $transactionType,
        "quantity" => $quantity
    ]
]);
