
function homeSignalMax() {
    removeHomePage();
    watchLaterButton();
}

function removeHomePage() {
    var pageManager = document.querySelector('ytd-page-manager');
    if (pageManager) {
        pageManager.remove();
    }
    var skeleton = document.querySelector('home-page-skeleton');
    if (skeleton) {
        skeleton.remove()
    }
}

/**
 * Add a 1 button to redirect to `/feed/you`
 */
function watchLaterButton() {
    const button = document.createElement('button');
    button.innerHTML = "Watch Later";
    button.className = "watch-later";
    const body = document.querySelector("body");
    body.appendChild(button);
    // Style the button
    button.style.position = 'absolute';
    button.style.fontSize = '5em';
    button.style.top = '50%';
    button.style.left= '45%';
    button.addEventListener('click', () => {
        window.location.href = 'https://youtube.com/feed/you';
    });
    removeHomePage();
}

export default homeSignalMax;
