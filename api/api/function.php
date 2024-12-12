<?php

function dump(...$vars) {
    echo '<pre style="background: #333; color: #fff; padding: 10px; border-radius: 5px; font-size: 14px; line-height: 1.5;">';
    foreach ($vars as $var) {
        var_dump($var);
        echo "\n";
    }
    echo '</pre>';
}

function dd(...$vars) {
    dump(...$vars);
    die();
}

function getCleanedPath() {
    $uri = $_SERVER['REQUEST_URI'];
    $uri = explode('/', $uri);
    array_splice($uri, 0, 2);
    $uri = implode('/', $uri);

    return $uri;
}