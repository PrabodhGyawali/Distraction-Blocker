import { cleanUI } from './cleaner.js';

/**
 * Add a 1 button to redirect to `/feed/you`
 */
function homeSignalMax() {
    console.log("home func called")
    removeHomePage();
    const button = document.createElement('button');
    button.className = "watch-later"
}

// // Remove Thumbnails
// thumbnails = document.querySelector('#contents.ytd-rich-grid-renderer');
// if (thumbnails) {
//     thumbnails.remove();
// }
// Remove Page Manager
function removeHomePage() {
    pageManager = document.querySelector('ytd-page-manager');
    if (pageManager) {
        pageManager.style.display = "none";
    }
}


// Hides the youtube home-page recommendations
// window.onload = () => {
//     // Reacting to a change in the DOM
//     const observer = new MutationObserver((mutationList, observer) => {
//         mutationList.forEach(mutation => {
//             // TODO: Use Clear Search Results button
//             cleanUI();
//         });
//     });
//     observer.observe(document, { childList: true, subtree: true });
    
//     footer = document.querySelector('#footer');
//     if (footer) {
//         footer.style.display = "none";
//     }

// };

export default homeSignalMax;
