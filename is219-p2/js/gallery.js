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

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
// Counter for the mImages array
var mCurrentIndex = null;

function swapPhoto() {
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


// XMLHttpRequest variable
var mURL = "images.json";
var mRequest = new XMLHttpRequest();

var m2URL = "extra.json";
var m2Request = new XMLHttpRequest();

mRequest.open("GET", mURL, true);
mRequest.send();

m2Request.open("GET", m2URL, true);
m2Request.send();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
mRequest.onreadystatechange = function() {
  // Do something interesting if file is opened successfully
  if (mRequest.readyState == 4 && mRequest.status == 200) {
    try {
      // Let’s try and see if we can parse JSON
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

m2Request.onreadystatechange = function() {
  // Do something interesting if file is opened successfully
  if (m2Request.readyState == 4 && m2Request.status == 200) {
    try {
      // Let’s try and see if we can parse JSON
      var m2Json = JSON.parse(m2Request.responseText);

      for (var i = 0; i < m2Json.images.length; i++){
      	mImages.push(new GalleryImage(m2Json.images[i].imgPath, m2Json.images[i].imgLocation, m2Json.images[i].description, m2Json.images[i].date));
      }
      // Let’s print out the JSON; It will likely show as “obj”
      console.log(m2Json.images);
      console.log(m2Json.images[0].imgPath);

     
    } catch (err) {
      console.log(err.message)
    }
  }
};

mRequest.open("GET", mURL, true);
mRequest.send();

m2Request.open("GET", m2URL, true);
m2Request.send();

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
		mLastFrameTime = 0;
		PrevPhoto();
		animate();
	});

	$('#nextPhoto').click(function(){
		mLastFrameTime = 0;
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