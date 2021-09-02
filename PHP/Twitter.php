<?php // Keys and tokens
$consumer_key = '';
$consumer_secret = '';
$access_token = '';
$access_token_secret = ''; 
// Include library
require "../twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;
// Connect to API
$title = $_POST['title'];
$url = $_POST['url'];
$connection = new TwitterOAuth($consumer_key, $consumer_secret, $access_token, $access_token_secret); $content = $connection->get("account/verify_credentials"); 
//Create image in tweet
copy($url, '../images/file.png');
$media1 = $connection->upload('media/upload', ['media' => '../images/file.png']);
$parameters = [
    'status' => $title,
    'media_ids' => implode(',', [$media1->media_id_string, $media2->media_id_string])
];
// Create tweet
$new_status = $connection->post('statuses/update', $parameters);
