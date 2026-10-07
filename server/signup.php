<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
require("database.php");

$username = $_POST["username"];
$email = $_POST["email"];
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

$sql = "INSERT INTO users VALUES(?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param(
    $stmt,
    "sss",
    $username,
    $email,
    $password
);

if(mysqli_stmt_execute($stmt)){
    echo json_encode([
        "success" => true,
        "message" => "Account created successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to Create Account"
    ]);
}
