#!/usr/bin/env php

<?php
if (!$loader = include __DIR__.'/vendor/autoload.php') {
    die('You must set up the project dependencies.');
}

include __DIR__.'/nineGagFunctions.php';
include __DIR__.'/nineGagHelpers.php';

foreach (glob('nineGag/*.php') as $filename){
    include __DIR__.'/'.$filename;
}

$app = new \Cilex\Application('Cilex');

$app->command(new \Cilex\Command\instagramImport());

$app->run();
