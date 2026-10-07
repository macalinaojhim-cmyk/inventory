<?php
    $conn = mysqli_connect(
        "localhost",
        "root",
        "",
        "inventorydb"
    );

    if(!$conn){
        die("Databse Connection Error". mysqli_connect_error());
        
    }
?>