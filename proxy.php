<?php
//supress warnings & errors
error_reporting(0);

//sets the base of the url we want to hit
define ('HOSTNAME', 'http://www.ist.rit.edu/api');

//access the api - remember we have to send in a leading '/'
//so the path variable could be '/about/'
$url=HOSTNAME.$_GET['path'];

// $url = HOSTNAME."/about/";

//set up curl (Client Uniform Resource Locator)
	//  Initiate curl
	$ch = curl_init();
	//echo "string3";
	// allow us to include a header in the return (we are setting to false as we don't need to)
	curl_setopt($session, CURLOPT_HEADER, false);
	//echo "string4";
	// Will return the response, if false it print the response (we want to capture it in a variable $result)
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	//echo "string5";
	// Set the url
	curl_setopt($ch, CURLOPT_URL,$url);
	//echo "string6";
	// Execute
	$result=curl_exec($ch);
	//echo "string7";
	// Closing
	curl_close($ch);
	//echo "string8";

//we want json back so set the correct mimetype
header("Content-Type: text/json");
//echo "string9";

//give it to me!
echo $result;
//echo "string10";
?>
