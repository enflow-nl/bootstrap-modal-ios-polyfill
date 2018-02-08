<?php

// Nananana, hackerman!

$content = file_get_contents('example.html');

echo str_replace('$VERSION', bin2hex(random_bytes(10)), $content);
