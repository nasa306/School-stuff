<?php
class PHP_Email_Form {
    public $to;
    public $from_name;
    public $from_email;
    public $subject;
    public $messages = [];
    public $ajax = false;

    public function add_message($content, $label) {
        $this->messages[] = "$label: $content";
    }

    public function send() {
        $headers = "From: $this->from_name <$this->from_email>\r\n";
        $headers .= "Reply-To: $this->from_email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        $body = "";
        foreach ($this->messages as $message) {
            $body .= $message . "\n";
        }

        if (mail($this->to, $this->subject, $body, $headers)) {
            return 'Message sent successfully!';
        } else {
            return 'Message sending failed!';
        }
    }
}
?>
