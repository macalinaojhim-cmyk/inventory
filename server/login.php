<?php

session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require("database.php");

$email = $_POST["email"] ?? "";
$password = $_POST["password"] ?? "";

$sql = "SELECT id, username, email, password
        FROM users
        WHERE email = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) === 0) {
    echo json_encode([
        "success" => false,
        "message" => "User does not exist"
    ]);
    exit;
}

$user = mysqli_fetch_assoc($result);

if (password_verify($password, $user["password"])) {

    $_SESSION["user_id"] = $user["id"];
    $_SESSION["username"] = $user["username"];
    $_SESSION["email"] = $user["email"];

    echo json_encode([
        "success" => true,
        "message" => "Login successful"
    ]);

} else {
    echo json_encode([
        "success" => false,
        "message" => "Invalid credentials"
    ]);
}