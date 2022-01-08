<?php

return array(
    'source' => 'file',
    'source_file' => __DIR__ . '/bad_words.php',
    'strictness' => 'permissive',
    'also_check' => [
        ...json_decode(file_get_contents(storage_path("bannedwords.json")), true) # mycustomslicing(json_decode(file_get_contents(storage_path("bannedwords.json")), true),50,60)
    ],
);
