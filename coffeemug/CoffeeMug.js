$(function () {
    
   
    var productLeft;
    var productRight;
    var productCenter;
    var productBack;
    var productPosition;
    var UploadFolder;
    var UserImageHeight;
    var UserImageWidth;
    var now = new Date();
    var UserImage;
    var UserImage1;
    var UserImage2;
    var UserImageOrig1;
    var UserImageOrig2;
    var UserImageOrig1Exists;
    var UserImageOrig2Exists;    
    var PathToPicture1;
    var PathToPicture2;
    var TotalPrice;

// Reset all Variables function on reload   

function setVars(){
//productLeft = "http://i.imgur.com/yKlEkUb.png";
productLeft = "coffeemug/img/left.png";
//productRight = "http://i.imgur.com/iiXaQDQ.png";
productRight = "coffeemug/img/right.png";
//productCenter = "http://i.imgur.com/6h7GyiE.png";
productCenter = "coffeemug/img/center.png";
//productBack = "http://i.imgur.com/ZW2mcqV.png"
productBack = "coffeemug/img/back.png";
productPosition = 0; //0 = LEFT, 1 = CENTER, 2 = RIGHT, 3 = BACK
UploadFolder = "coffeemug/uploads/";
UserImageHeight = 300;
UserImageWidth = 600;
now = new Date();
now = now.getTime();
UserImage = "coffeemug/img/text-pe-cana2.png";// = "/test/plugins/coffeemug/img/text-pe-cana.png";
UserImage1 = now+"_Photo1.png";
UserImage2 = now+"_Photo2.png";
UserImageOrig1 = now+"_Photo1_ORIGINAL.png"
UserImageOrig2 = now+"_Photo2_ORIGINAL.png"
UserImageOrig1Exists = false;
UserImageOrig2Exists = false;
}
    
   
 
//EVENT HANDLERS




var uploadIMG1 = document.querySelector('#fileToUpload1');
uploadIMG1.addEventListener('change', function () { doUpload(1)
});
document.getElementById("File1holder").addEventListener("click", function () { uploadIMG1.click() })
var uploadIMG2 = document.querySelector('#fileToUpload2');
uploadIMG2.addEventListener('change', function () { doUpload(2) 
});
document.getElementById("File2holder").addEventListener("click", function () { uploadIMG2.click() })
document.getElementById("OrderNowButton").addEventListener("click", function () {
    document.getElementById("buttonArea").style.display = 'none';
    document.getElementById("contact-form").style.display = 'block';
    document.getElementById("info").style.display = 'block';
    updateTotalPrice();
})
document.getElementById("backtodesign").addEventListener("click", function () {
    document.getElementById("buttonArea").style.display = 'block';
    document.getElementById("contact-form").style.display = 'none';
    document.getElementById("info").style.display = 'none';
})
/*
document.getElementsByClassName("close")[0].addEventListener("click", function () {
    setTimeout(function () {
        window.location.reload(1);
    }, 1000);
    document.getElementById('myModal').style.display = "none";
})   
*/
document.getElementById("qty").addEventListener("change", function(){updateTotalPrice()});
document.getElementById("model").addEventListener("change", function(){updateTotalPrice()});
document.getElementById("transport").addEventListener("change", function(){updateTotalPrice()});
// Handlers for the Left and Right rotation controls
document.getElementById("rotate_right").addEventListener("click", function () { CycleImagePosition("right", UserImage) })
document.getElementById("rotate_left").addEventListener("click", function () { CycleImagePosition("left", UserImage) })
//// Handlers for the Clear Create and Auto buttons
//document.getElementById("img-source-clear").addEventListener("click", function () { clear() })
//document.getElementById("img-source-disp").addEventListener("click", function () { console.log("call bindImages"); doUpload(1); doUpload(2); bindImages() })
document.getElementById("img-source-auto").addEventListener("click",function(){UserImage1="auto_Photo1.png";UserImage2="auto_Photo2.png"; bindImages()})
//document.getElementById("img-source-upload").addEventListener("click",function(){doUpload(1);doUpload(2);})
/* Used for the Hover selector -- currently hidden    
//Load Left side cup
document.getElementById("product-thumbnail-left").addEventListener("mouseover",function(){LoadImage(0)})
//Load Front side cup
document.getElementById("product-thumbnail-front").addEventListener("mouseover",function(){LoadImage(1)})
//Load Right side cup
document.getElementById("product-thumbnail-right").addEventListener("mouseover",function(){LoadImage(2)})
//Load Back side cup
document.getElementById("product-thumbnail-back").addEventListener("mouseover",function(){LoadImage(3)})
*/

// Submit the Order Form
document.getElementById("formsubmit").addEventListener("click", function () { document.contact.submit })
document.getElementById("contact").onsubmit = function (e) {
    e.preventDefault();

    var xhr = new XMLHttpRequest();
    var fd = new FormData();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Every thing ok, file uploaded
            // console.log(xhr.responseText); // handle response.
        }
    };
    fd.append('save_path', UploadFolder);




    var f = e.target,
        formData = new FormData(f),
        xhr = new XMLHttpRequest();
    formData.append('destEmail', "mitzapopa@gmail.com");
    formData.append('totalPrice', TotalPrice);
    if (UserImageOrig1Exists == true) formData.append('picture1', UploadFolder + UserImageOrig1);
    if (UserImageOrig2Exists == true) {
        console.log("second picture attached");
        formData.append('picture2', UploadFolder + UserImageOrig2);
    }
    xhr.open("POST", "coffeemug/process.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Every thing ok, file uploaded
            console.log(xhr.responseText); // handle response.
            if (xhr.responseText == "Verificare Captcha esuata! Incearca din nou!") {
                alert(xhr.responseText);
            } else {
                //alert(xhr.responseText);
                document.getElementById('myModal').style.display = "block";
                //if(alert(xhr.responseText)){}
                //else    window.location.reload(); 

            }

        }
    };
    //xhr.open("POST", f.action);
    xhr.send(formData);

}
///
///
/// Start of the show
///
///
///
window.onload = function() {
  setVars();
LoadImage("left", UserImage);
};

  

function updateTotalPrice()
{   
    var transportPrice = 0;
    var prodCount = document.getElementById("qty").value;
    var transportElement = document.getElementById("transport");
    if(transportElement.selectedIndex == 0)
    {
        transportPrice = 25; //Curier Rapid(1-2 zile) - 25 Lei
        console.log("index ",transportElement.selectedIndex);
    }
    else if(transportElement.selectedIndex == 1) {
        transportPrice = 13; //Posta Romana(valabil pentru cani) - 13 Lei
        console.log("index ",transportElement.selectedIndex);
    }
    else
    {
        transportPrice = 0; //>Ridicare personala - Timisoara/Cluj
        console.log("index ",transportElement.selectedIndex);
    }
    
    
     var typeElement = document.getElementById("model");
    if(typeElement.selectedIndex == 0)
    {
        typePrice = 25; //Simpla - 25 Lei
        console.log("index ",typeElement.selectedIndex);
    }
    else if(typeElement.selectedIndex == 1) {
        typePrice = 26; //Interior Colorat - 26 Lei
        console.log("index ",typeElement.selectedIndex);
    }
    else if(typeElement.selectedIndex == 2) {
        typePrice = 38; //Termosensibila - 38 Lei
        console.log("index ",typeElement.selectedIndex);
    }
    else if(typeElement.selectedIndex == 3) {
        typePrice = 29; //Cu toarta de inimioara - 29 Lei
        console.log("index ",typeElement.selectedIndex);
    }
    else if(typeElement.selectedIndex == 4) {
        typePrice = 48; //Fosforescenta - 48 Lei
        console.log("index ",typeElement.selectedIndex);
    }
    else
    {
        typePrice = 0; //Alta
        console.log("index ",typeElement.selectedIndex);
    }               
   TotalPrice = transportPrice + (typePrice * Number(prodCount));
   document.getElementById("total").innerText = "Total: " + TotalPrice+" Lei";
   console.log("Transport= ", transportPrice, "Model= ", typePrice, "Nr Buc.= ", Number(prodCount), "Total= ", TotalPrice);
    
}

function doUpload(imgnumber) {
    var file = document.getElementById('fileToUpload' + imgnumber).files[0];
   // console.log("DoImageUpload", UserImage1);
    var tmpName = document.getElementById('fileToUpload' + imgnumber).files[0].name;
    var dataUrl = "";
    var dataUrlOrig = "";
    // Create an image
    var img = document.createElement("img");
    // Create a file reader
    var reader = new FileReader();
    // Set the image once loaded into file reader
    reader.onload = function (e) {
        img.src = e.target.result;
        console.log("reader.onload function");
        var canvas = document.createElement("canvas");
        //var canvas = $("<canvas>", {"id":"testing"})[0];
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var width = img.width;
        var height = img.height;
        // Set Width and Height
        if (img.height > img.width) {

            var sourceX = 0;
            var sourceY = img.height * 0.15;
            var sourceWidth = img.width;
            var sourceHeight = img.height * 0.6;
            var destWidth = sourceWidth;
            var destHeight = sourceHeight;
            var destX = 0;
            var destY = 0;
            //canvas.width = width;
            //canvas.height = height;
                

            while (destHeight >= UserImageHeight) {
                destHeight = destHeight * 0.99;
                destWidth = destWidth * 0.99;
                console.log("Portrait image dimensions reduced to:" + destHeight + " X " + destWidth);
            }
            canvas.width = destWidth;
            canvas.height = destHeight;
            ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
        }
        else {
            // Original Non-Portrait images
           
            console.log("start of resize");
            while (height >= UserImageHeight) {
                height = height * 0.99;
                width = width * 0.99;
                console.log("image dimensions reduced to:" + height + " X " + width);
            }
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
        }
        dataUrl = canvas.toDataURL("image/png");
        document.getElementById('image_preview' + imgnumber).src = dataUrl;    
            
        // Post the data
        console.log("post resized image");
        var fd = new FormData();
        fd.append('save_path', UploadFolder)
        if (imgnumber == 1) {
            fd.append('file_name', UserImage1);
            uploadFile(document.getElementById('fileToUpload' + imgnumber).files[0], 1);
            PathToPicture1 = UserImageOrig1;
            UserImageOrig1Exists = true;

        }
        if (imgnumber == 2) {
            fd.append('file_name', UserImage2);
            uploadFile(document.getElementById('fileToUpload' + imgnumber).files[0], 2);
            PathToPicture2 = UserImageOrig2;
            UserImageOrig2Exists = true;
        }

        fd.append('uploaded_file', dataUrl);
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", "coffeemug/upload.php");
        xhr.send(fd);


    }
    // Load files into file reader
    reader.readAsDataURL(file);
}

/*      
function doUpload(imgnumber) {
    var file = document.getElementById('fileToUpload' + imgnumber).files[0];
    console.log(UserImage1);
    var tmpName = document.getElementById('fileToUpload' + imgnumber).files[0].name;
    var dataUrl = "";
    var dataUrlOrig = "";
    // Create an image
    var img = document.createElement("img");
    // Create a file reader
    var reader = new FileReader();
    // Set the image once loaded into file reader
    reader.onload = function (e) {
        img.src = e.target.result;
        console.log("reader.onload function");
        var canvas = document.createElement("canvas");
        //var canvas = $("<canvas>", {"id":"testing"})[0];
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var width = img.width;
        var height = img.height;
        // Set Width and Height
        if (img.height > img.width) {

            var sourceX = 0;
            var sourceY = img.height * 0.15;
            var sourceWidth = img.width;
            var sourceHeight = img.height * 0.6;
            var destWidth = sourceWidth;
            var destHeight = sourceHeight;
            var destX = 0;
            var destY = 0;
            //canvas.width = width;
            //canvas.height = height;
                

            while (destHeight >= UserImageHeight) {
                destHeight = destHeight * 0.99;
                destWidth = destWidth * 0.99;
                console.log("Portrait image dimensions reduced to:" + destHeight + " X " + destWidth);
            }
            canvas.width = destWidth;
            canvas.height = destHeight;
            ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
        }
        else {
            // Original Non-Portrait images
           
            console.log("start of resize");
            while (height >= UserImageHeight) {
                height = height * 0.99;
                width = width * 0.99;
                console.log("image dimensions reduced to:" + height + " X " + width);
            }
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
        }
        dataUrl = canvas.toDataURL("image/png");
        document.getElementById('image_preview' + imgnumber).src = dataUrl;    
            
        // Post the data
        console.log("post resized image");
        var fd = new FormData();
        fd.append('save_path', UploadFolder)
        if (imgnumber == 1) {
            fd.append('file_name', UserImage1);
            uploadFile(document.getElementById('fileToUpload' + imgnumber).files[0], 1);
            PathToPicture1 = UserImageOrig1;
            UserImageOrig1Exists = true;

        }
        if (imgnumber == 2) {
            fd.append('file_name', UserImage2);
            uploadFile(document.getElementById('fileToUpload' + imgnumber).files[0], 2);
            PathToPicture2 = UserImageOrig2;
            UserImageOrig2Exists = true;
        }

        fd.append('uploaded_file', dataUrl);
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", "plugins/coffeemug/upload.php");
        xhr.send(fd);


    }
    // Load files into file reader
    reader.readAsDataURL(file);
}*/
function uploadProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        document.getElementById('progress').innerHTML = percentComplete.toString() + '%';
    } else {
        document.getElementById('progress').innerHTML = 'Upload error!';
    }
}
    

function uploadComplete(evt) {
    //alert(evt.target.responseText);
    console.log("Completed Uploading Image")
    bindImages();
    //setTimeout(bindImages, 3000);
    
}

function uploadFailed(evt) {
    alert("Error on file upload!");
}

function uploadCanceled(evt) {
    alert("Upload aborted or network error!");
}
      
function uploadFile(file, nr) {
    console.log(nr);
    var url = "coffeemug/upload.php";
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Every thing ok, file uploaded
            console.log(xhr.responseText); // handle response.
        }
    };
    fd.append('save_path', UploadFolder);

    if (nr == 1) {
        fd.append('file_name', UserImageOrig1);
        //console.log(UserImageOrig1);
    }
    if (nr == 2) {
        fd.append('file_name', UserImageOrig2);
        // console.log(UserImageOrig2);
    }


    fd.append('uploaded_file', file);
    xhr.send(fd);
}

function bindImages() {
    var firstImage = new Image();
    var secondImage = new Image();
    var canvasimage = new Image();
    var overlap = 250;
    ///
    var offscreenCanvas = document.createElement('canvas');
    // offscreenCanvas.width =  ctx.canvas.width;
    // offscreenCanvas.height = ctx.canvas.height;
    var ctx = offscreenCanvas.getContext('2d');
    ///
    // var cvs = document.getElementById("testCanvas");
    // var ctx = cvs.getContext("2d");
    //var dataURL = cvs.toDataURL();    
    //console.log("bindImages");
    firstImage.onload = function () {

        console.log("FirstImage.onload");
        secondImage.onload = function () {
            console.log("SecondImage.onload");
             while(secondImage.height>=UserImageHeight)
          {
              secondImage.height=secondImage.height*0.98;
              secondImage.width=secondImage.width*0.98;
              console.log("second", secondImage.height);
          }  
          
          // RESIZE FIRST IMAGE TO MATCH SECOND
          while(firstImage.height>=UserImageHeight)
          {
              firstImage.height=firstImage.height*0.98;
              firstImage.width=firstImage.width*0.98;
              console.log("first", firstImage.height);
          }

            ctx.canvas.width = firstImage.width + secondImage.width - overlap;
            ctx.canvas.height = firstImage.height;
            ctx.beginPath();
            ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = "white";
            ctx.fill();
           
            // draw something into the OFFSCREEN context
                     
            console.log(ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(firstImage, -20, 0, firstImage.width, firstImage.height);

            var linearGradient = ctx.createLinearGradient(0, 0, overlap, 0);
            linearGradient.addColorStop(0, "transparent");
            linearGradient.addColorStop(1, "#000");

            ctx.drawImageGradient(secondImage, firstImage.width - overlap, 0, linearGradient, secondImage.height, secondImage.width);
            ///REMOVE
            console.log("ConvertcanvasToImage");
            convertHiddenCanvasToImage(offscreenCanvas);


        }
        secondImage.onerror = function () {



            ctx.canvas.width = firstImage.width;
            ctx.canvas.height = firstImage.height;
            ctx.beginPath();
            ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = "white";
            ctx.fill();
           
            // draw something into the OFFSCREEN context
                     
            console.log("only one image uploaded, painting..." + ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(firstImage, 0, 0, firstImage.width, firstImage.height);
            convertHiddenCanvasToImage(offscreenCanvas);


        }

        secondImage.src = UploadFolder + UserImage2;
       // secondImage.src = UploadFolder + "jack.png";
        console.log("bindImages() second image src ", secondImage.src);
        

    }
    firstImage.src = UploadFolder + UserImage1;
   // firstImage.src = UploadFolder + "china.png";
    console.log("bindImages()  image src ", firstImage.src);

}



function convertHiddenCanvasToImage(canvas) {
    var ctx = canvas.getContext("2d");
    var dataURL = canvas.toDataURL();
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    UserImage = image.src;
    CycleImagePosition(productPosition, UserImage);
	console.log("Canvas converted to image"+image.src);
}
/*    Original Function
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}*/
    
function CycleImagePosition(DrawDirection, UserImage)
{
     if(DrawDirection == "right")
    {
        if(productPosition>0)
        {
            productPosition-=1;
        }
        else
        {
            productPosition = 3;
        }
    }
    if(DrawDirection == "left")
    {
        if(productPosition<3)
        {
            productPosition += 1;
        }
        else
        {
            productPosition = 0;
        }
    }
    LoadImage(productPosition, UserImage);
    
}

function LoadImage(DrawPosition, UserImg) {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var productImg = new Image();
    productImg.onload = function () {
        var iw = productImg.width;
        var ih = productImg.height;
        //console.log("height");

        canvas.width = iw;
        canvas.height = ih;

        ctx.drawImage(productImg, 0, 0, productImg.width, productImg.height,
            0, 0, iw, ih);

        //start();
        // outline
        // ctx.beginPath();
        // ctx.moveTo(88, 235.734375);
        // ctx.bezierCurveTo(1000, 234.734375, 204, 298, 327, 234.734375);
        // ctx.stroke();
    };


    if (DrawPosition == "left" || DrawPosition == 0) {
        productImg.src = productLeft;
    }
    if (DrawPosition == "center" || DrawPosition == 1) {
        productImg.src = productCenter;
    }
    if (DrawPosition == "right" || DrawPosition == 2) {
        productImg.src = productRight;
    }
    if (DrawPosition == "back" || DrawPosition == 3) {
        productImg.src = productBack;
    }
    
    // productImg.src = document.getElementById('large-image-id').src; //NEED TO FIX THIS
  
  
  
    // paint Picture on top of the Mug
    if (UserImage != null) {
        var img = new Image();
        img.onload = function () { start(DrawPosition) };
        img.src = UserImage;
        var pointer = 0;
    }

    function start(DrawPosition) {

        var scaleFactor;
        var iw = img.width; //1280
        var ih = img.height; //854
        var positionOffset;
        var iwLeft = img.width - img.width / 3;
        /* origs 
        var iwRight = img.width - iwLeft;
        var xOffset = 116.5,
        yOffset = 106;
        var a = 138.0;
        var b = 22.0;
        */
        var iwRight = img.width - iwLeft;
        var xOffset = 90;
        var yOffset = 339.5;
        var a = 137.0;
        var b = 18.5;


        if (DrawPosition == 'left' || DrawPosition == 0) {
            console.log("Rotate left");
            var iwLeft = img.width - img.width / 3;
            scaleFactor = iw / (3 * a);
            positionOffset = 0.01;
        }
        if (DrawPosition == 'front' || DrawPosition == 1) {
            console.log("Rotate front");
            scaleFactor = iw / (3 * a);
            positionOffset = iw * 0.15
        }
        if (DrawPosition == 'right' || DrawPosition == 2) {
            console.log("Rotate right");
            scaleFactor = iw / (3 * a);
            positionOffset = iw * 0.35
        }
        if (DrawPosition == 'back' || DrawPosition == 3) {
            //  return; // NOT SHOWING IMAGE ON THE BACK OF THE MUG
            console.log("Rotate back");
            scaleFactor = iw / (3 * a);
            //positionOffset = 700; 
            positionOffset = iw * 0.80;
            //console.log("imageWdth" + iw);
        }
        /*    else
            {                
                var iwLeft = img.width-img.width/3;
                var iwRight = img.width - iwLeft;
                var xOffset = 116.5,
                    yOffset = 106;           
                var a = 138.0;
                var b = 22.0;
                var scaleFactor = iw / (3*a);
            }
          */  
      

        // draw vertical slices
        for (var X = 0; X < iw; X += 1) {
            var y = b / a * Math.sqrt(a * a - (X - a) * (X - a)); // ellipsis equation          
            /*
            img	Specifies the image, canvas, or video element to use	 
            sx	Optional. The x coordinate where to start clipping	
            sy	Optional. The y coordinate where to start clipping	
            swidth	Optional. The width of the clipped image	
            sheight	Optional. The height of the clipped image	
            x	The x coordinate where to place the image on the canvas	
            y	The y coordinate where to place the image on the canvas	
            width	Optional. The width of the image to use (stretch or reduce the image)	
            height	Optional. The height of the image to use (stretch or reduce the image)
            */
            //ctx.drawImage(img, X * scaleFactor, 0, 6, ih, X + xOffset, y + yOffset, 1, ih - 555 + y/2);

            ctx.drawImage(img, X * scaleFactor + positionOffset, 0, 6, ih, X + xOffset, y + yOffset, 1, ih - 595 + y / 2);
            if (DrawPosition == 'back' || DrawPosition == 3) {
                //positionOffset = 600;
                console.log("load back");
                ctx.drawImage(img, X * scaleFactor - iw * 0.50, 0, 6, ih, X + xOffset, y + yOffset, 1, ih - 595 + y / 2);
            }
        }
    }

}



function clear() {
    console.log("clear");
    setVars();
    UserImage = UserImage1 = UserImage2 = "";
    LoadImage(productPosition);
    var uploadIMG1 = document.querySelector('#fileToUpload1');
    var uploadIMG2 = document.querySelector('#fileToUpload2');
    uploadIMG1.value = "";
    uploadIMG2.value = "";
}

function SetImage(URL1, URL2) {
    UserImage1 = URL1;
    UserImage2 = URL2
    if (URL2 = null) {
        LoadImage("front");
    }
    if (URL1 != null) {
        bindImages();
    }
}

function uploadImages(files){
    alert(files.length);    
}    


//GRADIENT
    

// If browser doesn't support canvas exit function.
if (!CanvasRenderingContext2D) alert("CanvasNotSupported");

// holds a dynamically create canvas element that the gradient is drawn onto.
var imageGradientCanvas;

CanvasRenderingContext2D.prototype.drawImageGradient = function (img, x, y, gradient) {
    var ctx = this;

    // throw error if image to use for gradient hasn't loaded.
    if (!img.complete) {
        var err = new Error();
        err.message = "CanvasRenderingContext2D.prototype.drawImageGradient: The image has not loaded."
        throw err;
    }

    var imgWidth = img.width;
    var imgHeight = img.height;

    if (!imageGradientCanvas) {
        imageGradientCanvas = document.createElement("canvas");
    }

    imageGradientCanvas.width = imgWidth;
    imageGradientCanvas.height = imgHeight;

    var imgCtx = imageGradientCanvas.getContext("2d");

    // Create default gradient.
    if (!gradient) {
        var gradient = imgCtx.createLinearGradient(0, 0, 0, imgHeight);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "#000");
    }

    var gradientImageData = createRectangularGradientImageData();

    imgCtx.drawImage(img, 0, 0);

    var imageImageData = imgCtx.getImageData(0, 0, imgWidth, imgHeight);

    var ctxImageData = ctx.getImageData(x, y, imgWidth, imgHeight);

    var opacity = 1;

    var ctxImageDataData = ctxImageData.data;
    var imageImageDataData = imageImageData.data;
    var gradientImageDataData = gradientImageData.data;
    var ctxImageDataDataLength = ctxImageData.data.length;

    var i;
    for (i = 0; i < ctxImageDataDataLength; i += 4) {
        opacity = gradientImageDataData[i + 3] / 255;

        // Update rgb values of context image data.
        ctxImageDataData[i] =
        (imageImageDataData[i] * opacity) +
        (ctxImageDataData[i] * (1 - opacity));

        ctxImageDataData[i + 1] =
        (imageImageDataData[i + 1] * opacity) +
        (ctxImageDataData[i + 1] * (1 - opacity));

        ctxImageDataData[i + 2] =
        (imageImageDataData[i + 2] * opacity) +
        (ctxImageDataData[i + 2] * (1 - opacity));
    }

    ctx.putImageData(ctxImageData, x, y);

    function createRectangularGradientImageData() {
        imgCtx.fillStyle = gradient;
        imgCtx.fillRect(0, 0, imgWidth, imgHeight);

        return imgCtx.getImageData(0, 0, imgWidth, imgHeight);
    }
}
    
    
    //END-GRADIENT

   
   });
