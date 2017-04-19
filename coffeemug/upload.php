<?php
if (isset($_POST['uploaded_file'])) {
    $savePath = $_SERVER['DOCUMENT_ROOT']."/".$_POST['save_path'];
    $ext = explode(".", $_POST['file_name']);
    $extension=end($ext);
    file_put_contents($savePath . $_POST['file_name'],base64_decode(str_replace("data:image/png;base64,","", $_POST['uploaded_file'])));
    echo 'Upload completed!';
}
if (isset($_FILES['uploaded_file'])) {
    $savePath = $_SERVER['DOCUMENT_ROOT']."/".$_POST['save_path'];
    $filename = $_FILES['uploaded_file']['name'];
    $ext = explode(".", $filename);
    $extension=end($ext);
    
    if(move_uploaded_file($_FILES['uploaded_file']['tmp_name'], $savePath . $_POST['file_name'])){
        echo $savePath.$_POST['file_name'];
    } else {
        echo $_FILES['uploaded_file']['name']. " NOT uploaded here: ". $savePath;
    }

    exit;
} else {
    echo "poop";
    
}
?>