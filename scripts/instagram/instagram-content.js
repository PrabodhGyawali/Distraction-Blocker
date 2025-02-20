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
