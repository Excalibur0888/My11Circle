<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    $consent = isset($_POST["consent"]) ? "Yes" : "No";

    $to = "easysports9@gmail.com";
    $email_subject = "New Contact Form Submission: $subject";
    
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Subject: $subject\n";
    $body .= "Message:\n$message\n\n";
    $body .= "Consent Given: $consent";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    mail($to, $email_subject, $body, $headers);

    header("Location: thanks.html");
    exit();
}
?>
