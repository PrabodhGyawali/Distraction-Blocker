import { isValidPath, redirectToHome } from "./utils.js";
import { removeGuide } from "./home.js";

let lastCheckedURL = window.location.href;
let lastPathname = window.location.pathname;

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

        // Remove guide element for all routes
        removeGuide();

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
    const currentPathname = window.location.pathname;
    
    console.log('[DEBUG] Validating URL:', currentURL);
    console.log('[DEBUG] Current pathname:', currentPathname, 'Last pathname:', lastPathname);
    
    // Check if pathname has changed (client-side routing)
    if (currentPathname !== lastPathname) {
        console.log('[DEBUG] Path changed from', lastPathname, 'to', currentPathname);
        
        // Update last pathname
        lastPathname = currentPathname;
        
        // Validate new path
        if (!isValidPath(currentURL)) {
            console.log('[DEBUG] New path is invalid, redirecting to home');
            redirectToHome();
            return;
        }
        
        // If path is valid, reinitialize route
        initializeRoute();
    }
    
    // Regular validation
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
    if (!isValidPath(currentURL)) {
        console.log('[DEBUG] Initial path is invalid, redirecting to home');
        redirectToHome();
        return;
    }
    
    // Store initial URL and pathname
    lastCheckedURL = currentURL;
    lastPathname = window.location.pathname;
    
    
    // Initialize route-specific features
    initializeRoute();
    
    // Periodic URL validation
    setInterval(validateCurrentURL, 1000);
});