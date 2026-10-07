<?php

header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json");

require("database.php");

$id = $_POST["id"];
$name = $_POST["name"];
$category = $_POST["category"];
$stock = $_POST["stock"];
$daily_demand = $_POST["daily_demand"];
$lead_time = $_POST["lead_time"];
$ordering_cost = $_POST["ordering_cost"];
$holding_cost = $_POST["holding_cost"];

$sql = "UPDATE products
        SET name = ?,
            category = ?,
            stock = ?,
            daily_demand = ?,
            lead_time = ?,
            ordering_cost = ?,
            holding_cost = ?
        WHERE id = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param(
    $stmt,
    "ssiiiddi",
    $name,
    $category,
    $stock,
    $daily_demand,
    $lead_time,
    $ordering_cost,
    $holding_cost,
    $id
);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        "success" => true,
        "message" => "Product updated successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to update product"
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);