<?php
$url='https://hmcl.huangyuhui.net/api/update_link?';
$channel=$_GET["channel"];
$download_link=$_GET["download_link"];
$html = file_get_contents($url . "channel=" . $channel ."&download_link=" . $download_link);
echo $html;
?>