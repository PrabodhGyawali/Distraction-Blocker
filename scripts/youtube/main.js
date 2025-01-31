const valid_paths = new Set(['/watch', '/results?search_query=', '/feed/you', '/']);

function isValidPath(url) {
    try {
        const urlObj = new URL(url);
        const path = urlObj.pathname;
        
        // Special case for root path to ensure exact match
        if (path === '/') {
            return true;
        }
        
        return Array.from(valid_paths)
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

// shadow DOM checker
function isInShadowDOM(element) {
    return element.getRootNode() instanceof ShadowRoot;
}

// Enhanced click handler that works with Shadow DOM
function handleClick(e) {
    // Get the complete path of elements from the click target up to the window
    const path = e.composedPath();
    console.log('Click path:', path);
    
    // Check all elements in the path for our target selectors
    for (let element of path) {
        if (element instanceof Element) {
            // Check if the element is any kind of interactive element we want to monitor
            const isClickable = element.matches(`
                a, 
                button, 
                [role="button"], 
                .shortsLockupViewModelHostEndpoint,
                ytm-shorts-lockup-view-model,
                ytm-shorts-lockup-view-model-v2
            `);

            if (isClickable) {
                const currentURL = window.location.href;
                console.log('Clickable element detected, checking URL:', currentURL);
                
                if (!isValidPath(currentURL)) {
                    console.log('Invalid path detected, preventing navigation');
                    e.preventDefault();
                    e.stopPropagation();
                    redirectToHome();
                    break;
                }
            }
        }
    }
}

// Intercept all anchor clicks more aggressively
function handleAnchorClick(e) {
    const anchor = e.target.closest('a');
    if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && !isValidPath(href)) {
            console.log('Invalid anchor href detected:', href);
            e.preventDefault();
            e.stopPropagation();
            redirectToHome();
            return false;
        }
    }
}

// Create a wrapper for history API modifications
function createHistoryHandle(type) {
    const original = window.history[type];
    return function() {
        const newUrl = arguments[2]; // URL is the third argument
        console.log(`History ${type} called with URL:`, newUrl);
        
        if (newUrl && !isValidPath(newUrl)) {
            console.log(`Blocked ${type} to invalid path:`, newUrl);
            redirectToHome();
            return;
        }
        
        const result = original.apply(this, arguments);
        window.dispatchEvent(new Event('locationchange'));
        return result;
    };
}

// Initialize all event listeners and interceptors
function initializeBlocker() {
    window.addEventListener('click', handleClick, {capture: true, passive: false});
    document.addEventListener('click', handleAnchorClick, {capture: true, passive: false});

    // Intercept history API calls
    window.history.pushState = createHistoryHandle('pushState');
    window.history.replaceState = createHistoryHandle('replaceState');

    // Add listeners for various navigation events
    ['load', 'popstate', 'locationchange'].forEach(event => {
        window.addEventListener(event, () => {
            const currentURL = window.location.href;
            console.log(`${event} event detected, URL:`, currentURL);
            if (!isValidPath(currentURL)) {
                redirectToHome();
            }
        });
    });

    // Set up mutation observer to watch for DOM changes
    const observer = new MutationObserver((mutations) => {
        if (mutations.some(m => m.type === 'childList' || m.type === 'subtree')) {
            const currentURL = window.location.href;
            console.log("DOM mutation detected, checking URL:", currentURL);
            if (!isValidPath(currentURL)) {
                redirectToHome();
            }
        }
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });

    // Initial check when script loads
    window.onload = () => {
        const currentURL = window.location.href;
        console.log('Initial URL check:', currentURL);
        if (!isValidPath(currentURL)) {
            redirectToHome();
        }
    };
}

// Start the blocker
initializeBlocker();