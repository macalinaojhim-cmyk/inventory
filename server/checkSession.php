<?php

session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION["user_id"])) {

    echo json_encode([
        "success" => true,
        "loggedIn" => true,
        "user" => [
            "id" => $_SESSION["user_id"],
            "username" => $_SESSION["username"],
            "email" => $_SESSION["email"]
        ]
    ]);

} else {

    echo json_encode([
        "success" => false,
        "loggedIn" => false
    ]);
}