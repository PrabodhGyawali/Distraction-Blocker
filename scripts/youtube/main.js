
import { get_current_href, isValidPath, redirectToHome } from "./utils.js";

let original_url = get_current_href();

/**
 * Initializes route-specific features when the page first loads
 * This runs only once when the DOM is ready
 */
async function initializeRoute() {
    try {
        const currentURL = window.location.href;
        const urlObj = new URL(currentURL);
        const path = urlObj.pathname;

        console.log('[DEBUG] Initializing route:', path);

        // Handle home page specific actions
        if (path === '/') {
            console.log('[DEBUG] Loading home page specific functions');
            try {
                const homeModule = await import('./home.js');
                homeModule.default();
            } catch (error) {
                console.error('[DEBUG] Error loading home.js:', error);
            }
        }

        if (path.startsWith('/results')) {
            let watch_later = document.getElementById("watch-later");
            if (watch_later) {
                watch_later.remove();
            }
            try {
                const searchModule = await import ('./cleaner.js');
                searchModule.default();
                cleanSearchResults();
                console.log('cleaning search');
            } catch (error) {
                console.error('[DEBUG] Error loading search.js:', error);
            }
        }
        
    } catch (e) {
        console.error('[DEBUG] Error in initializeRoute:', e);
    }
}

/**
 * Simple URL validator that runs periodically
 * Only checks if the current URL is valid and redirects if not
 */
function validateCurrentURL() {
    const currentURL = window.location.href;
    console.log('[DEBUG] Validating URL:', currentURL);
    
    if (!isValidPath(currentURL)) {
        console.log('[DEBUG] Invalid path detected, redirecting to home');
        redirectToHome();
    }
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('[DEBUG] DOM loaded, initializing route');
    
    // First check if the current path is valid
    const currentURL = window.location.href;
    if (original_url == currentURL) {
        if (!isValidPath(currentURL)) {
            redirectToHome();
            return;
        }
    } else {
        original_url = currentURL;
        window.location.href = currentURL;
    }
    
    
    // Initialize route-specific features
    initializeRoute();
    
    // Set up periodic URL validation
    setInterval(validateCurrentURL, 1000);
});