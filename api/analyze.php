<?php
/**
 * Holistic Radar — Sameer's Framework Analyser
 * PHP Proxy for Anthropic API — Hostinger Deployment
 * 
 * IMPORTANT: Set your Anthropic API key in api/config.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Load config
require_once __DIR__ . '/config.php';

if (empty(ANTHROPIC_API_KEY) || ANTHROPIC_API_KEY === 'YOUR_API_KEY_HERE') {
    http_response_code(500);
    echo json_encode(['error' => 'Anthropic API key not configured. Edit api/config.php']);
    exit;
}

// Rate limiting (simple file-based)
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ip = explode(',', $ip)[0];
$rateFile = sys_get_temp_dir() . '/hr_rate_' . md5($ip) . '.json';
$rateLimit = 20; // requests per hour
$rateWindow = 3600; // 1 hour

if (file_exists($rateFile)) {
    $rateData = json_decode(file_get_contents($rateFile), true);
    $now = time();
    // Remove old entries
    $rateData['requests'] = array_filter(
        $rateData['requests'] ?? [],
        fn($t) => ($now - $t) < $rateWindow
    );
    if (count($rateData['requests']) >= $rateLimit) {
        http_response_code(429);
        echo json_encode(['error' => 'Rate limit exceeded. Max ' . $rateLimit . ' requests per hour.']);
        exit;
    }
    $rateData['requests'][] = $now;
} else {
    $rateData = ['requests' => [time()]];
}
file_put_contents($rateFile, json_encode($rateData), LOCK_EX);

// Parse request body
$body = file_get_contents('php://input');
$data = json_decode($body, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body']);
    exit;
}

// Build Anthropic API payload
$payload = [
    'model'      => $data['model'] ?? 'claude-opus-4-5',
    'max_tokens' => (int)($data['max_tokens'] ?? 2048),
    'messages'   => $data['messages'] ?? [],
];

if (!empty($data['system'])) {
    $payload['system'] = $data['system'];
}

if (!empty($data['tools'])) {
    $payload['tools'] = $data['tools'];
}

if (empty($payload['messages'])) {
    http_response_code(400);
    echo json_encode(['error' => 'messages array is required']);
    exit;
}

// Forward to Anthropic API
$ch = curl_init('https://api.anthropic.com/v1/messages');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'x-api-key: ' . ANTHROPIC_API_KEY,
        'anthropic-version: 2023-06-01',
        'anthropic-beta: interleaved-thinking-2025-05-14',
    ],
    CURLOPT_TIMEOUT        => 120,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(502);
    echo json_encode(['error' => 'Connection to Anthropic API failed: ' . $curlError]);
    exit;
}

// Forward response as-is
http_response_code($httpCode);
echo $response;
