// Hides the youtube recommendations
alert("script loaded");
thumbnails = document.querySelector('#contents.ytd-rich-grid-renderer')

if (thumbnails) {
    thumbnails.style.visibility = "hidden";
    console.log("Youtube recommendations hidden");
}