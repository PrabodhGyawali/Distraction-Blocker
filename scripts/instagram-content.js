var currentUrl = window.location.href;

if (!currentUrl.includes('/direct/')) {
    window.location.href = 'https://www.instagram.com/direct/inbox/';
}