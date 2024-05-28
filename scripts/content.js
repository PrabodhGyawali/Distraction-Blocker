// Hides the youtube recommendations
window.onload = function() {
    console.log("script loaded");
    thumbnails = document.querySelector('#contents.ytd-rich-grid-renderer')

    if (thumbnails) {
        thumbnails.style.visibility = "hidden";
        console.log("Youtube recommendations hidden");
    }
};

// Example Code from Youtube Extension
// const homepage = document.querySelector('ytd-rich-grid-renderer');

// function removeContent() {
//     const homepage = document.querySelector('ytd-rich-grid-renderer');
//     if (homepage) {
//         Array.prototype.forEach.call(homepage.children, (child) => {
//             child.style.display = 'none';
//         });
//     }
// }

// var observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//         if (mutation.addedNodes.length) {
//             removeContent();
//         }
//     });
// });

// removeContent();

// window.scrollTo(0, 0);
// const yt = document.querySelector('#contents');
// observer.observe(yt, { childList: true });