<?php

class Test {
    public function get() {
        echo json_encode(['message' => 'GET request successful']);
    }

    public function post() {
        echo json_encode(['message' => 'POST request successful']);
    }
}