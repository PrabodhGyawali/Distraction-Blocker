export function homeSignalMax() {
    console.log("maximizing home signal");
    if (removeHomePage()) {
        removeGuide();
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
 * Removes the guide element (#guide) from the page
 * @returns {boolean} true if guide was successfully removed
 */
export function removeWatchLaterButton() {
    const watchLaterBtn = document.querySelector('.watch-later');
    if (watchLaterBtn) {
        watchLaterBtn.remove();
        return true;
    }
    return false;
}

export function removeGuide() {
    const guideElement = document.querySelector('#guide');
    console.log(guideElement);
    if (guideElement) {
        guideElement.remove();
        clearTimeout();
        return true;
    }
    setTimeout(removeGuide, 1000);
    return false;
}

/**
 * Add a 1 button to redirect to `/feed/you`
 */
export function watchLaterButton() {
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