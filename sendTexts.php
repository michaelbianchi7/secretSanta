<?php
  // Decode our JSON into PHP objects we can use
  $AllInfo = json_decode($_POST["AllInfo"]);
    // Access our object's data and array values.
    // Get the PHP helper library from twilio.com/docs/php/install
    require_once 'vendor/autoload.php'; // Loads the library
    use Twilio\Rest\Client;
    // Your Account Sid and Auth Token from twilio.com/user/account
    $sid = "AC9d7623259771e0071a48b91969275e87";
    $token = "3287161521dad7b986f430ce27c8bb3f";
    $client = new Client($sid, $token);
    //size of name/number arrays
    $groupSize = count($AllInfo->name);
    //send out texts to each group member
    for($i=0; $i<$groupSize; $i++){
      $client->messages->create(
      $AllInfo->number[$i],
      array(
        'from' => "+12267820791",
        'body' =>  "Sent from ". $AllInfo->makerName[0] .". You got ". $AllInfo->name[$i] ." for Secret Santa and the minimum gift price is $". $AllInfo->price[0],
      )
      );
    }
?>
