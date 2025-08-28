/* global vars */
let authenticated = false;
const unauth_valid_paths = new Set(['/i/grok', '/i/bookmarks', '/jobs', '/messages']);

function createAuthButton() {
    console.log('Creating authentication button...');
    
    // Remove existing button if it exists
    const existingButton = document.getElementById('authenticate-button');
    if (existingButton) {
        existingButton.remove();
    }

    // Create the button
    const authButton = document.createElement('button');
    authButton.id = 'authenticate-button';
    authButton.innerHTML = authenticated ? '🔒 Lock Page' : '🔓 Enable Full Access';
    authButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999999;
        background: ${authenticated ? '#dc3545' : '#1d9bf0'};
        color: white;
        border: none;
        border-radius: 20px;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;
    
    authButton.onmouseover = () => {
        authButton.style.background = authenticated ? '#c82333' : '#1a8cd8';
        authButton.style.transform = 'scale(1.05)';
    };
    
    authButton.onmouseout = () => {
        authButton.style.background = authenticated ? '#dc3545' : '#1d9bf0';
        authButton.style.transform = 'scale(1)';
    };
    
    // Add to page
    document.body.appendChild(authButton);
    console.log('Authentication button created and added to page');
    
    return authButton;
}

function updateButtonState() {
    const authButton = document.getElementById('authenticate-button');
    if (authButton) {
        authButton.innerHTML = authenticated ? '🔒 Lock Page' : '🔓 Enable Full Access';
        authButton.style.background = authenticated ? '#dc3545' : '#1d9bf0';
        
        // Update hover colors
        authButton.onmouseover = () => {
            authButton.style.background = authenticated ? '#c82333' : '#1a8cd8';
            authButton.style.transform = 'scale(1.05)';
        };
        
        authButton.onmouseout = () => {
            authButton.style.background = authenticated ? '#dc3545' : '#1d9bf0';
            authButton.style.transform = 'scale(1)';
        };
    }
}

function checkCurrentUrl() {
    console.log('checkCurrentUrl called, authenticated:', authenticated);
    if (!authenticated) {
        const url = window.location.href;
        console.log('Current URL:', url);
        console.log('Valid paths:', Array.from(unauth_valid_paths));
        if (!Array.from(unauth_valid_paths).some(path => url.includes(path))) {
            console.log('Redirecting to bookmarks');
            window.location.href = 'https://x.com/i/bookmarks';
        } else {
            console.log('URL is valid, allowing access');
        }
    } else {
        console.log('User is authenticated, allowing all URLs');
    }
}

async function initAuth() {
    console.log('initAuth called');
    try {
        await chrome.storage.local.set({'bookmark-auth': 'false'});
        console.log('Set bookmark-auth to false in storage');
        
        const result = await chrome.storage.local.get(['bookmark-auth']);
        authenticated = result['bookmark-auth'] === 'true';
        console.log('Retrieved auth status:', result['bookmark-auth']);
        console.log('Set authenticated to:', authenticated);

        checkCurrentUrl();
    } catch (error) {
        console.error('Error in initAuth:', error);
        authenticated = false;
    }
}

async function checkAndInitAuth() {
    console.log('checkAndInitAuth called');
    
    try {
        const result = await chrome.storage.local.get(['bookmark-auth']);
        console.log('Storage result:', result);
        
        // Fix the key name inconsistency - use the same key consistently
        const authValue = result['bookmark-auth'];
        console.log('Auth value from storage:', authValue);
        
        if (authValue === undefined) {
            console.log('Auth value is undefined, initializing auth');
            await initAuth();
        } else {
            console.log('Auth value exists:', authValue);
            authenticated = authValue === 'true';
            console.log('Set authenticated from storage:', authenticated);
        }
    } catch (error) {
        console.error('Error in checkAndInitAuth:', error);
        // Fallback: assume not authenticated
        authenticated = false;
    }
}

// Handle authentication state changes
async function setAuthenticated(value) {
    console.log('setAuthenticated called with value:', value);
    try {
        await chrome.storage.local.set({'bookmark-auth': value.toString()});
        authenticated = value;
        console.log('Updated authenticated to:', authenticated);
        
        // Update button appearance
        updateButtonState();
        
        // Check URL after authentication state change
        checkCurrentUrl();
    } catch (error) {
        console.error('Error in setAuthenticated:', error);
    }
}

window.addEventListener('load', async () => {
    console.log('Window load event fired');
    
    try {
        await checkAndInitAuth();
    } catch (error) {
        console.error('Error during auth initialization:', error);
        // Fallback: assume not authenticated
        authenticated = false;
    }

    try {
        // Create the authentication button
        const authButton = createAuthButton();
        
        // Set up the click handler for toggling authentication
        authButton.addEventListener('click', async () => {
            console.log('Auth button clicked, current state:', authenticated);
            
            if (authenticated) {
                // Lock the page - de-authenticate
                await setAuthenticated(false);
                console.log('Page locked - user is now restricted to bookmarks');
            } else {
                // Unlock the page - authenticate
                await setAuthenticated(true);
                console.log('Page unlocked - user now has full access');
            }
            
            // Update button appearance
            updateButtonState();
        });
        
        console.log('Auth button toggle handler attached');
        
    } catch (error) {
        console.error('Error creating auth button:', error);
    }
});

// Main execution block
console.log('Script loaded, authenticated:', authenticated);
if (!authenticated) {
    try {
        const url = window.location.href;
        console.log('Main execution - Current URL:', url);
        if (!Array.from(unauth_valid_paths).some(path => url.includes(path))) {
            console.log('Main execution - invalid url redirecting');
            window.location.href = 'https://x.com/i/bookmarks';
        } else {
            console.log('Main execution - valid url');
        }
    } catch(error) {
        console.log('Main execution error:', error);
    }
}

/* History API: Read MDN docs */
window.addEventListener("popstate", () => {
    console.log('Popstate event fired');
    checkCurrentUrl();
});