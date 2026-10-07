<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
require("database.php");

$id = $_POST["id"];

$sql = "DELETE FROM products WHERE id = ?";

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $id);

if (mysqli_stmt_execute($stmt)){
    echo json_encode([
        "success" => true,
        "message" => "Product Deleted"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete"
    ]);
}
