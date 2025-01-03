<?php

namespace api\classes;
class Weather
{
    public function GET()
    {
        echo json_encode(['message' => 'Sonde API Page']);
    }

    public function POST()
    {
        $path = getCleanedPath();
        switch ($path) {
            case 'weather/create':

                try {
                    $pdo = getDatabaseConnection();
                    $sql = "INSERT INTO weather_reports (probe_id, temperature, humidity, pressure) VALUES ('" . "(SELECT id FROM probe WHERE ip = '" . $_POST['ip'] . "' LIMIT 1)" . "', '" . $_POST['temperature'] . "', '" . $_POST['humidity'] . "', '" . $_POST['pressure'] . "')";
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
