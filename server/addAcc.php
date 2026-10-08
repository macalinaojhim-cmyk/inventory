<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require("database.php");

$username = "Jimboy";
$email = "kiww@gmail.com";
$password = "kiwwyum";
$password = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, email, password)
        VALUEs (?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param(
    $stmt,
    "sss",
    $username,
    $email,
    $password
);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        "success" => true,
        "message" => "Account created successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to create account",
        "error" => mysqli_stmt_error($stmt)
    ]);
}