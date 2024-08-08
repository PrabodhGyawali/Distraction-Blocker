function noise_elimination() {
    var currentURL = window.location.href;
    console.log('Current URL:', currentURL);
    if (!currentURL.includes('/direct/')) {
        window.location.href = 'https://www.instagram.com/direct/inbox/';
    }
}

window.onload = noise_elimination();

// Prevent dynamic behavior loop of the page
window.addEventListener('click', (e) => {
    if (e.target.href) {
        if (e.target.href.includes('instagram.com') && !e.target.href.includes('/direct/')) {
            window.location.href = 'https://www.instagram.com/direct/inbox/';
        }
    };
    noise_elimination();
});

