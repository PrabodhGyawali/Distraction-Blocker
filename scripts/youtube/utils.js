/**
 * Get the current url at the web browser
 * @returns {string}
 */
function get_current_href() {
    return window.location.href;
} 

// TODO: Create a method or class related to MutationObserver

const VALID_PATHS = new Set(['/watch', '/results', '/feed/you', '/', '/@']);

function isValidPath(url) {
    try {
        const urlObj = new URL(url);
        const path = urlObj.pathname;
        
        // Special case for root path to ensure exact match
        if (path === '/') {
            return true;
        }
        
        return Array.from(VALID_PATHS)
            .filter(p => p !== '/') 
            .some(valid_path => path.startsWith(valid_path));
    } catch (e) {
        console.error('Error parsing URL:', e);
        return false;
    }
}

function redirectToHome() {
    const currentURL = window.location.href;
    console.log('Redirecting from:', currentURL);
    window.location.href = 'https://www.youtube.com';
}

export {get_current_href, isValidPath, redirectToHome}; 