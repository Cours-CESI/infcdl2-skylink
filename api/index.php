<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
header('Access-Control-Allow-Origin: *');

// Autoload des classes
spl_autoload_register(function ($class) {
    $file = __DIR__ . '/classes/' . $class . '.php';
    if (file_exists($file)) {
        include $file;
    } else {
        error_log("Class file $file not found");
    }
});

require __DIR__ . '/function.php';
require __DIR__ . '/db.php';

$uri = parse_url(trim($_SERVER['REQUEST_URI'], '/'), PHP_URL_PATH);
$segments = explode('/', $uri);
$className = ucfirst($segments[0] ?? '');


if (class_exists($className)) {
    $instance = new $className();
    $method = strtolower($_SERVER['REQUEST_METHOD']); // Méthode HTTP en minuscule
    if (method_exists($instance, $method)) {
        $instance->$method(); // Appelle la méthode correspondante
    } else {
        http_response_code(405); // Méthode non autorisée
        echo json_encode(['error' => 'Method Not Allowed']);
    }
} else {
    require __DIR__ . '/dashboard/index.html';
}