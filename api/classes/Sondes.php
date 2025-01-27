<?php

class Sondes
{
    public function get()
    {
        $pdo = getDatabaseConnection();

        $sondeStatement = $pdo->prepare('SELECT * FROM sondes');
        $sondeStatement->execute();
        $sondes = $sondeStatement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($sondes);
    }

    public function post()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $path = getCleanedPath();
        switch ($path) {
            case 'create':
                try {
                    $pdo = getDatabaseConnection();
                    $sql = "INSERT INTO sondes (ip, name) VALUES ('" . $data['ip'] . "', '" . $data['name'] . "')";
                    $pdo->exec($sql);
                } catch (PDOException $e) {
                    echo json_encode(['error' => $e->getMessage()]);
                }
                break;
        }


    }
}
