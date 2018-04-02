// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var lastFrame = 0;
var timeWait = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (lastFrame === 0) {
		lastFrame = currentTime;
	}

	if ((currentTime - lastFrame) > timeWait) {
		swapPhoto();
		lastFrame = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
function getQueryParams(qs) {
	qs = qs.aplit("+").join(" ");
	var params = {}
		tokens,
		re = /[?&]?([^=]+)=([^&]*)/g;
	while (token = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])]
			= decodeURIComponent(tokens[2]);
	}
	return params;
}
var $_GET = getQueryParams(document.location.search);

var mURL = "images.json";

if ($_GET["json"] != undefined){
	mURL = $_GET["json"];
}
// Counter for the mImages array
var mCurrentIndex = null;

function swapPhoto() {
  //Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	if(mCurrentIndex == null){ 
		mCurrentIndex = 0; 
	}

	else if (mCurrentIndex ==  mImages.length - 1) { 
		mCurrentIndex = 0; 
	}

	else { 
		mCurrentIndex++; 
	}

	const location = "Location: ", description = "Description: ", date = "Date: ";
	var photoLocation = mImages[mCurrentIndex].imgLocation;
	var photoDesc = mImages[mCurrentIndex].description;
	var photoDate = mImages[mCurrentIndex].date;
	console.log('swap photo');
	$("#photo").attr("src", mImages[mCurrentIndex].imgPath);
	console.log(mImages[mCurrentIndex].imgPath);
	$(".location").text(location + photoLocation);
	$(".description").text(description + photoDesc);
	$(".date").text(date + photoDate);

	console.log(photoLocation);
	console.log(mCurrentIndex + " mCurrentIndex on swapPhoto");
}

function PrevPhoto(){

	if(mCurrentIndex == null){ mCurrentIndex = mImages.length - 1; }

	else if(mCurrentIndex == 0){ mCurrentIndex = mImages.length - 1; }

	else { mCurrentIndex--; }

	const location = "Location: ", description = "Description: ", date = "Date: ";
	var photoLocation = mImages[mCurrentIndex].imgLocation;
	var photoDesc = mImages[mCurrentIndex].description;
	var photoDate = mImages[mCurrentIndex].date;
	$("#photo").attr("src", mImages[mCurrentIndex].imgPath);
	console.log(mImages[mCurrentIndex].imgPath);
	$(".location").text(location + photoLocation);
	$(".description").text(description + photoDesc);
	$(".date").text(date + photoDate);

	console.log(photoLocation);
	console.log(mCurrentIndex + " mCurrentIndex on swapPhoto");
}
/* URL for the JSON to load by default */
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();



mRequest.open("GET", mURL, true);
mRequest.send();



// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
mRequest.onreadystatechange = function() {
  // Do something interesting if file is opened successfully
  if (mRequest.readyState == 4 && mRequest.status == 200) {
    try {
		/* URL for the JSON to load by default */
		// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later

      var mJson = JSON.parse(mRequest.responseText);

      for (var i = 0; i < mJson.images.length; i++){
      	mImages.push(new GalleryImage(mJson.images[i].imgPath, mJson.images[i].imgLocation, mJson.images[i].description, mJson.images[i].date));
      }
      
      console.log(mJson.images);
      console.log(mJson.images[0].imgPath);

     
    } catch (err) {
      console.log(err.message)
    }
  }
};




//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();

	$('img.moreIndicator').click( function(){
		$('.details').eq(0).toggle();
	});

	$(".moreIndicator").click( function(){
		if( $(".moreIndicator").hasClass("rot90")){
			$(".moreIndicator").attr("class", "moreIndicator rot270");
		}
		else{
			$(".moreIndicator").attr("class", "moreIndicator rot90");
		};
	});

	$('#prevPhoto').click( function(){
		lastFrame = 0;
		PrevPhoto();
		animate();
	});

	$('#nextPhoto').click(function(){
		lastFrame = 0;
		swapPhoto();
		animate();
	});
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(imgPath, imgLocation, description, date){
	this.imgPath = imgPath;
	this.imgLocation = imgLocation;
	this.description = description;
	this.date = date;
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https:/  /developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
};