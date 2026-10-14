
<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

require ("database.php");
require_once __DIR__ . "/calculations/functions.php";

$sql = "SELECT * FROM products";
$result = mysqli_query($conn, $sql);

$products = [];

while ($product = mysqli_fetch_assoc($result)) {
    $product["eoq"] = calculateEOQ($product);
    $product["eoi"] = calculateEOI($product);
    $product["rop"] = calculateROP($product);
    $product["dsr"] = calculateDayOfStockRemaining($product);
    $products[] = $product;
}

echo json_encode($products);

?>
