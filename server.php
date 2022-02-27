<?php

include 'vendor/autoload.php';
include 'MailHelper.php';

$arguments = $_POST;
//var_dump($arguments);
    //echo $arguments['sender_password'];

$transport = (new Swift_SmtpTransport('smtp.gmail.com', 465, 'ssl'))
  ->setUsername($arguments['sender_email'])
  ->setPassword($arguments['sender_password'])
;

// Create the Mailer using your created Transport
$mailer = new Swift_Mailer($transport);


//$arguments['mails_per_round'] = intval($arguments['mails_per_round']);
for($mail_index = 0; $mail_index < $arguments['mails_per_round']; $mail_index++)
{
    // Create a message
    $message = (new Swift_Message(MailHelper::getHeader()))
    ->setFrom([$arguments['sender_email'] => $arguments['sender_name']])
    ->setTo([$arguments['receiver_email'] => $arguments['receiver_email']])
    ->setBody(MailHelper::getMessage())
    ;

    // Send the message
    $result = $mailer->send($message);
    echo 'Mail N'.$mail_index.' '.json_encode($result).'\n\r';
    sleep($arguments['time_between_mails']);
}