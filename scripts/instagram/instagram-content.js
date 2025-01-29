const valid_paths = new Set(['/direct', '/accounts/']);

function isValidPath(url) {
    const path = new URL(url).pathname;
    return Array.from(valid_paths).some(valid_path => path.startsWith(valid_path))
}

function redirectToInbox() {
    var currentURL = window.location.href;
    console.log('Current URL:', currentURL);
    if (!isValidPath(currentURL)) {
        window.location.href = 'https://www.instagram.com/direct/inbox/';
    }
}

window.onload = redirectToInbox();

// Prevent dynamic behavior loop of the page
window.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link?.href?.includes('instagram.com') && !isValidPath(link.href)) {
        if (e.target.href.includes('instagram.com') && !e.target.href.includes('/direct/')) {
            e.preventDefault();
            redirectToInbox();
        }
    };
    redirectToInbox();
});

// Intercept history API calls
const createHistoryHandle = (type) => {
    const original = window.history[type];
    return function() {
        const result = original.apply(this, arguments);
        window.dispatchEvent(new Event('locationchange'));
        return result;
    };
};

['load', 'popstate', 'locationchange'].forEach(event => {
    window.addEventListener(event, redirectToInbox);
});

const observer = new MutationObserver((mutations) => {
    if (mutations.some(m => m.type === 'childList' || m.type === 'subtree')) {
        redirectToInbox();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
});
