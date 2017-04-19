<?php
// Get Data	
// your secret key
$secret = "6LcarxcTAAAAAGvowJn6DpAnDTCFmHt7SzDu4HzK";
 
// empty response
$response = null;
 
// check secret key
//$reCaptcha = new ReCaptcha($secret);
$destEmail = $_POST['destEmail'];
$url = $_SERVER['DOCUMENT_ROOT'];
$name = strip_tags($_POST['name']);
$email = strip_tags($_POST['email']);
$phone = strip_tags($_POST['phone']);
$address = strip_tags($_POST['address']);
$shipping = strip_tags($_POST['shipping']);
$type = strip_tags($_POST['type']);
$totalPrice = $_POST['totalPrice'];
$qty = strip_tags($_POST['qty']);
$applytext = strip_tags($_POST['applytext']);
$message = strip_tags($_POST['message']);
$picture1 = strip_tags($_POST['picture1']);
$picture2 = strip_tags($_POST['picture2']);
$message = " ";
if(isset($_POST['g-recaptcha-response'])){
$captcha=$_POST['g-recaptcha-response'];

$response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']);
        if(json_decode($response)->success==false)
        {
          echo 'Verificare Captcha esuata! Incearca din nou!';
        }else if(json_decode($response)->success==true)
        {
         


if(isset($_POST['picture2'])){
	$message = "Nume: $name\nEmail: $email\nTelefon: $phone\nAdresa: $address\nLivrare: $shipping\nTip cana: $type\nNr.Buc: $qty\nText Pe Cana: $applytext\nMesaj: $message\nTotal: $totalPrice\nPoza1: http://pozapecana.ro$picture1 \nPoza2: http://pozapecana.ro$picture2";

}
else
{
	$message = "Nume: $name\nEmail: $email\nTelefon: $phone\nAdresa: $address\nLivrare: $shipping\nTip cana: $type\nNr.Buc: $qty\nText Pe Cana: $applytext\nMesaj: $message\nTotal: $totalPrice\nPoza1: http://pozapecana.ro$picture1 \nPoza2: Doar o poza incarcata.";
}
// Send Message
if(mail( $destEmail, "Comanda cana personalizata pozapecana.ro",$message,
"From: Forms <comenzi@pozapecana.com>" ))
{
	echo "Comanda dvs. a fost trimisa, va multumim! \nIn cursul zilei va vom contacta pentru confirmarea comenzii.";//.$response.success.$_POST["g-recaptcha-response"];
}
else
{
	echo "Comanda nu a fost inregistrata, Incearca mai tarziu!";
}

        }
}
else
{
	echo "no";
}

?>