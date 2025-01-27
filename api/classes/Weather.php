<?php

class Weather
{
    public function get()
    {
        $pdo = getDatabaseConnection();

        $weathersStatement = $pdo->prepare('SELECT s.name AS sonde_name, wr.temperature, wr.humidity, wr.pressure, wr.created_at FROM weather_reports AS wr LEFT JOIN sondes AS s ON wr.id_sonde = s.id');
        $weathersStatement->execute();
        $weathers = $weathersStatement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($weathers);
    }

    public function post()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $path = getCleanedPath();
        switch ($path) {
            case 'create':

                try {
                    $pdo = getDatabaseConnection();
                    $sql = "INSERT INTO weather_reports (id_sonde, temperature, humidity, pressure) VALUES (" . "(SELECT id FROM sondes WHERE ip = '" . $data['ip'] . "' LIMIT 1)" . ", '" . $data['temperature'] . "', '" . $data['humidity'] . "', '" . $data['pressure'] . "')";
                    $pdo->exec($sql);
                    echo(json_encode(array('success' => true)));
                } catch (PDOException $e) {
                    echo json_encode(['error' => $e->getMessage()]);
                }
                break;
        }


    }
}
