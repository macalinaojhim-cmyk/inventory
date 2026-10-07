<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
require("database.php");

$sql = "SELECT * FROM products";
$result = mysqli_query($conn, $sql);

$products = mysqli_fetch_all($result, MYSQLI_ASSOC);
header("Content-Type: application/json");
echo json_encode(
    $products
)
?>