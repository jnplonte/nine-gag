#!/usr/bin/env php

<?php
$upOne = realpath(__DIR__ . '/..');

if (!$loader = include $upOne.'/vendor/autoload.php') {
    die('You must set up the project dependencies.');
}

foreach (glob('nineGag/*.php') as $filename){
    include $upOne.'/'.$filename;
}

include $upOne.'/nineGagFunctions.php';
include $upOne.'/nineGagHelpers.php';
