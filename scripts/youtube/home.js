
export function homeSignalMax() {
    console.log("maximizing home signal");
    if (removeHomePage()) {
        watchLaterButton();    
    };
}

export function removeHomePage() {
    var skeleton = document.querySelector('#page-manager > ytd-browse > ytd-two-column-browse-results-renderer');
    if (skeleton) {
        skeleton.remove();
        clearTimeout();
        return true;
    }
    setTimeout(homeSignalMax, 1000);
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
}

export default homeSignalMax;
