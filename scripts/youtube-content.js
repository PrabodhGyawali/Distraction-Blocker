// For restricting URL to block ADHD content
const currentURL = window.location.href;
const noise_elements = [
    // "ytd-video-renderer",    // Videos linked to the search query
    "ytd-reel-shelf-renderer",
    "ytd-playlist-renderer",
    "ytd-shelf-renderer",
    "ytd-radio-renderer",
];

// Check whenver link is clicked the URL of page: BLOCK shorts and home-page recommendations
document.addEventListener('click', (e) => {
    const url = e.target.href;
    console.log('Page clicked:', url);
});

// Hides the youtube home-page recommendations
window.onload = function() {
    if (!currentURL.includes("/results?search_query=") && !currentURL.includes("/watch?")) {
        // Remove Thumbnails
        thumbnails = document.querySelector('#contents.ytd-rich-grid-renderer');
        if (thumbnails) {
            thumbnails.remove();
        }
        // Remove Page Manager
        pageManager = document.querySelector('ytd-page-manager');
        if (pageManager) {
            pageManager.style.display = "none";
        }
    }
    if (currentURL.includes("/shorts/")) {
        window.location.href = "https://www.youtube.com/";
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
            // Remove Noise in search results
            if (mutation.target.id === 'contents') {
                console.log("noise detected");
                noise_elements.forEach((noise_element_name) => {
                    let noisy_element = document.querySelector(noise_element_name);
                    console.log(noisy_element);
                    if (noisy_element) {
                        noisy_element.remove();
                    }
                });
            }
        });
    });
    observer.observe(document, { childList: true, subtree: true });
    
    footer = document.querySelector('#footer');
    if (footer) {
        footer.style.display = "none";
    }

};


