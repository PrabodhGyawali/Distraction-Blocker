import { cleanUI } from './cleaner.js';

/**
 * Add a 1 button to redirect to `/feed/you`
 */
function homeSignalMax() {
    const button = document.createElement('button');
    button.className = ""
    // Add button to the div
}

// Hides the youtube home-page recommendations
window.onload = () => {
    // Reacting to a change in the DOM
    const observer = new MutationObserver((mutationList, observer) => {
        mutationList.forEach(mutation => {
            // TODO: Use Clear Search Results button
            
        });
    });
    observer.observe(document, { childList: true, subtree: true });
    
    footer = document.querySelector('#footer');
    if (footer) {
        footer.style.display = "none";
    }

};

export default homeSignalMax;
