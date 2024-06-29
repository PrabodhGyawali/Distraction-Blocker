// Hides the youtube recommendations
window.onload = function() {
    // Remove Thumbnails
    thumbnails = document.querySelector('#contents.ytd-rich-grid-renderer');
    if (thumbnails) {
        thumbnails.style.display = "none";
    }
    // Remove Page Manager
    pageManager = document.querySelector('ytd-page-manager');
    if (pageManager) {
        pageManager.style.display = "none";
    }
    // Remove Left-Side Bar Sections: 5 Sections
    // More from Youtube

    // Reacting to a change in the DOM
    const observer = new MutationObserver((mutationList, observer) => {
        // console.log(mutationList);
        mutationList.forEach(mutation => {
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
            // Remove Shorts
            if (mutation.target.id === 'items') {
                const shortsElement = document.querySelector('ytd-mini-guide-entry-renderer[aria-label="Shorts"]');
                console.log(shortsElement);
                if (shortsElement) {
                    shortsElement.style.display = "none";
                }
            }
        });
    });
    observer.observe(document, { childList: true, subtree: true });
    
    footer = document.querySelector('#footer');
    if (footer) {
        footer.style.display = "none";
    }
};
