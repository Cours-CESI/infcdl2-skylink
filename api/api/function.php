<?php

function dump(...$vars) {
    echo '<pre style="background: #333; color: #fff; padding: 10px; border-radius: 5px; font-size: 14px; line-height: 1.5;">';
    foreach ($vars as $var) {
        var_dump($var);
        echo "\n"; // Sépare chaque variable par une ligne
    }
    echo '</pre>';
}

function dd(...$vars) {
    dump(...$vars); // Appelle dump pour afficher les variables
    die(); // Arrête l'exécution du script
}