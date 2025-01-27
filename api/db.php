<?php


function getDatabaseConnection() {
    return new PDO(
        'mysql:host=localhost;dbname=skylink;charset=utf8',
        'skylink',
        'test1234*'
    );
}