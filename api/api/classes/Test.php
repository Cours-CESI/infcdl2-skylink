<?php
class Test {
    public function GET() {
        echo json_encode(['message' => 'This is a GET request to Test class']);
    }

    public function POST() {
        echo json_encode(['message' => 'This is a POST request to Test class']);
    }
}
