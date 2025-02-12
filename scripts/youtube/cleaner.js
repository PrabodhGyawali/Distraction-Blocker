const noiseElements = [
    // "ytd-video-renderer",    // Videos linked to the search query
    "ytd-reel-shelf-renderer",  // Youtube Shorts shelf
    "ytd-playlist-renderer",    // Playlist Suggestions
    "ytd-shelf-renderer",       // General Content Shelves
    "ytd-radio-renderer",       // Radio/mix suggestions
];

/**
 * Removes node if its a youtube short
 * @param {Node} node - DOM node to check & potentially remove 
 * @returns 
 */
function removeShorts(node) {
    if (!(node instanceof Element)) {
        return;
    }

    if (node.id === 'contents' || node.id === 'container' || node.id === 'page-manager') {
        return;
    }


    const isShort = 
        node.matches('ytd-video-renderer, ytd-rich-item-renderer') &&
        (
            node.querySelector(`a[href*="/shorts/"]`) ||
            node.querySelector('.badge-style-type-shorts') ||
            node.querySelector('[aria-label*="Shorts"]')
        );
    
    if (isShort) {
        node.remove();
        console.log("Removed short");
    }
}

/**
 * Clean up observer when navigating away
 */
function cleanup() {
    if (window.shortsObserver) {
        window.shortsObserver.disconnect();
        window.shortsObserver = null;
    }
}

/**
 * Iterate over search renderers are not in `noise_elements`
 */
function cleanSearchResults() {

    if (window.shortsObserver) {
        window.shortsObserver.disconnect();
    }

    const observer = new MutationObserver((mutationList, observer) => {
        mutationList.forEach(mutation => {
            if (mutation.target.id === 'contents') {
                noiseElements.forEach((noiseElementName) => {
                    const noisyElement = document.querySelector(noiseElementName);
                    console.log("noise detected");
                    if (noisyElement) {
                        noisyElement.remove();
                        console.log("noise deleted!")
                    }
                });
                mutation.addedNodes.forEach(removeShorts);
            }
        });
    });

    const waitForContents = setInterval(() => {
        const contentsElement = document.querySelector('ytd-section-list-renderer #contents');
        if (contentsElement) {
            clearInterval(waitForContents);
            observer.observe(document, { childList: true, subtree: true });
            window.shortsObserver = observer;
        }
    }, 1000);
}

document.addEventListener('yt-navigate-start', cleanup);
document.addEventListener('yt-navigate-finish', cleanSearchResults);

export default cleanSearchResults;
