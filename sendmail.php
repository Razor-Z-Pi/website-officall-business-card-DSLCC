<?php
// Отключаем вывод ошибок в браузер
error_reporting(0);
ini_set('display_errors', 0);

// Устанавливаем заголовок JSON
header('Content-Type: application/json; charset=utf-8');

// Функция для безопасного получения данных
function getPostData($key, $default = '') {
    return isset($_POST[$key]) ? trim(htmlspecialchars(strip_tags($_POST[$key]))) : $default;
}

// Получаем данные из формы
$name = getPostData('name');
$email = getPostData('email');
$message = getPostData('message');

// Валидация данных
$errors = [];

if (empty($name)) {
    $errors[] = 'Пожалуйста, введите ваше имя';
} elseif (strlen($name) < 2) {
    $errors[] = 'Имя должно содержать хотя бы 2 символа';
}

if (empty($email)) {
    $errors[] = 'Пожалуйста, введите ваш email';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Введите корректный email (например: name@domain.ru)';
}

if (empty($message)) {
    $errors[] = 'Пожалуйста, напишите ваше сообщение';
} elseif (strlen($message) < 10) {
    $errors[] = 'Сообщение должно содержать хотя бы 10 символов';
}

// Если есть ошибки — возвращаем их
if (!empty($errors)) {
    echo json_encode([
        'success' => false,
        'message' => implode('. ', $errors)
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Настройки письма
$to = 'e@digital19.ru';
$subject = '=?UTF-8?B?' . base64_encode('Новая заявка с сайта Цифровые решения!!!') . '?=';

// Формируем HTML-письмо
$htmlMessage = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Новая заявка с сайта</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h2 { color: #2d89d4; margin-top: 0; border-bottom: 2px solid #2d89d4; padding-bottom: 10px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #333; margin-bottom: 5px; }
        .value { background: #f9f9f9; padding: 10px; border-radius: 5px; word-wrap: break-word; }
        hr { border: none; border-top: 1px solid #eee; margin: 20px 0; }
        .footer { font-size: 12px; color: #999; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Новая заявка с сайта</h2>
        <div class="field">
            <div class="label">Имя отправителя:</div>
            <div class="value">' . htmlspecialchars($name) . '</div>
        </div>
        <div class="field">
            <div class="label">Email для связи:</div>
            <div class="value"><a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></div>
        </div>
        <div class="field">
            <div class="label">Текст сообщения:</div>
            <div class="value">' . nl2br(htmlspecialchars($message)) . '</div>
        </div>
        <hr>
        <div class="footer">
            Сообщение отправлено через форму обратной связи сайта digital19.ru<br>
            Время отправки: ' . date('d.m.Y H:i:s') . '
        </div>
    </div>
</body>
</html>
';

// Текстовая версия
$textMessage = "Новая заявка с сайта\n\n";
$textMessage .= "Имя: $name\n";
$textMessage .= "Email: $email\n";
$textMessage .= "Сообщение:\n$message\n\n";
$textMessage .= "Время отправки: " . date('d.m.Y H:i:s') . "\n";
$textMessage .= "IP адрес: " . ($_SERVER['REMOTE_ADDR'] ?? 'неизвестен');

// Заголовки для HTML-письма
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=utf-8\r\n";
$headers .= "From: =?UTF-8?B?" . base64_encode($name) . "?= <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "X-Priority: 3\r\n";

// Пробуем отправить HTML-письмо
$mailSent = mail($to, $subject, $htmlMessage, $headers);

// Если не отправилось — пробуем отправить текстовое письмо
if (!$mailSent) {
    $headersPlain = "From: $email\r\n";
    $headersPlain .= "Reply-To: $email\r\n";
    $headersPlain .= "Content-Type: text/plain; charset=utf-8\r\n";
    $mailSent = mail($to, $subject, $textMessage, $headersPlain);
}

// Возвращаем результат
if ($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Сообщение успешно отправлено!'
    ], JSON_UNESCAPED_UNICODE);
} else {
    // Логируем ошибку для администратора
    error_log("Ошибка отправки письма с сайта digital19.ru. Данные: name = $name, email = $email");
    
    echo json_encode([
        'success' => false,
        'message' => 'Не удалось отправить сообщение!!! Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.'
    ], JSON_UNESCAPED_UNICODE);
}
?>