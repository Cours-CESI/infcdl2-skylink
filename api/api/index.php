<?php

// Autoload des classes
spl_autoload_register(function ($class) {
    include __DIR__ . '/classes/' . $class . '.php';
});

include __DIR__ . '/function.php';
include __DIR__ . '/db.php';

// Récupération de l'URI
$uri = trim($_SERVER['REQUEST_URI'], '/');
$segments = explode('/', $uri);

// Vérifie si la première partie correspond à une classe
$className = ucfirst($segments[1] ?? '');
if (class_exists($className)) {
    $instance = new $className();
    $method = $_SERVER['REQUEST_METHOD'];
    
    if (method_exists($instance, $method)) {
        $instance->$method();
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}
