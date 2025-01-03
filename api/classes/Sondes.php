<?php

namespace api\classes;
class Sondes
{
    public function GET()
    {
        dump('test');
        echo json_encode(['message' => 'Sonde API Page']);
    }

    public function POST()
    {
        $path = getCleanedPath();
        switch ($path) {
            case 'sondes/create':
                try {
                    $pdo = getDatabaseConnection();
                    $sql = "INSERT INTO probe (localisation, ip, name) VALUES ('" . $_POST['location'] . "', '" . $_POST['ip'] . "', '" . $_POST['name'] . "')";
                    $pdo->exec($sql);
                } catch (PDOException $e) {
                    echo json_encode(['error' => $e->getMessage()]);
                }
                break;

            default:
                echo json_encode(['message' => 'This is a POST request to Test class']);
                break;
        }


    }
}
