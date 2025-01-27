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
        try {
            $pdo = getDatabaseConnection();
            $sql = "INSERT INTO sondes (ip, name) VALUES ('" . $data['ip'] . "', '" . $data['name'] . "')";
            $pdo->exec($sql);
        } catch (PDOException $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function put()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        try {
            $pdo = getDatabaseConnection();
            $sql = "UPDATE sondes SET ip='" . $data['ip'] . "', name='" . $data['name'] . "' WHERE id = '" . $data['id_sonde'] . "'";
            $pdo->exec($sql);
        } catch (PDOException $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function delete()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        try {
            $pdo = getDatabaseConnection();
            $sql = "DELETE FROM sondes WHERE id = " . $data['id'];
            $pdo->exec($sql);
        } catch (PDOException $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
