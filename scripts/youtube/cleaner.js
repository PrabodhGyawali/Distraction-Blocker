const noiseElements = [
    // "ytd-video-renderer",    // Videos linked to the search query
    "ytd-reel-shelf-renderer",
    "ytd-playlist-renderer",
    "ytd-shelf-renderer",
    "ytd-radio-renderer",
];

// .badge-shape-wiz__text -> innerHTML -> SHORTS

/**
 * Iterate over search renderers are not in `noise_elements`
 * @param {string[]}
 */
function cleanSearchResults() {
    console.log("reach here");
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
    observer.observe(document, { childList: true, subtree: true });
}

function removeShorts(node) {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'ytd-video-renderer') {
        const shortsElement = node.querySelector('.badge-shape-wiz__text');
        if (shortsElement && shortsElement.innerHTML.trim() === "SHORTS") {
            node.remove();
            console.log('Removed a SHORTS video');
        }
    }
}   // TODO: Fix

/**
 * Remove left side-bar completely
 * @param `mutation` : {MutationRecord}
 */
function cleanUI() {
    var navBar = document.querySelector("ytd-mini-guide-renderer");
    if (navBar) {
        navBar.remove();
    }
}


export {cleanUI, cleanSearchResults};