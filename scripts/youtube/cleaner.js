const noise_elements = [
    // "ytd-video-renderer",    // Videos linked to the search query
    "ytd-reel-shelf-renderer",
    "ytd-playlist-renderer",
    "ytd-shelf-renderer",
    "ytd-radio-renderer",
];

/**
 * Iterate over search renderers are not in `noise_elements`
 * @param {MutationRecord}
 */
function cleanSearchResults(mutation) {
    // TODO:
    // Customize the Sections -> Watch-later is only allowed
    if (mutation.target.id === 'sections') {
        const sections = document.querySelector('#sections');
        if (sections) {
            sections.style.display = "none";
        }
    }
    // Remove Footer
    if (mutation.target.id === 'footer') {
        const secondary = document.querySelector('#footer');
        if (secondary) {
            secondary.style.display = "none";
        }
    }
}

/**
 * Remove left side-bar completely
 * @param `mutation` : {MutationRecord}
 */
function cleanUI(mutation) {
    // Customize the Sections -> Watch-later is only allowed
    if (mutation.target.id === 'sections') {
        const sections = document.querySelector('#sections');
        if (sections) {
            sections.style.display = "none";
        }
    }
    // Remove Footer
    if (mutation.target.id === 'footer') {
        const secondary = document.querySelector('#footer');
        if (secondary) {
            secondary.style.display = "none";
        }
    }
}


export {cleanUI};