<?php
$q=$_REQUEST["q"];
$json = file_get_contents("http://vimeo.com/api/v2/channel/staffpicks/videos.json");
$decoded_json = json_decode($json,true);
echo (json_encode($decoded_json[$q]));


?>
