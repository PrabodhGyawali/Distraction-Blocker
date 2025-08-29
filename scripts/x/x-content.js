/* global vars */
let authenticated = false;
let autoLockTimer = null;
let timeRemaining = 0;
let cooldownEndTime = null;
let cooldownTimer = null;
const unauth_valid_paths = new Set(['/i/grok', '/i/bookmarks', '/jobs', '/messages']);
const AUTO_LOCK_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds
const COOLDOWN_TIME = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

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
        if (isInCooldown()) {
            // Show cooldown time
            const remaining = getCooldownRemaining();
            const hours = Math.floor(remaining / (60 * 60 * 1000));
            const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
            authButton.innerHTML = `⏳ Cooldown (${hours}:${minutes.toString().padStart(2, '0')}h)`;
            authButton.style.background = '#6c757d'; // Gray color for cooldown
        } else if (authenticated && autoLockTimer) {
            // Show countdown if timer is active
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = Math.floor((timeRemaining % 60000) / 1000);
            authButton.innerHTML = `🔒 Lock (${minutes}:${seconds.toString().padStart(2, '0')})`;
        } else {
            authButton.innerHTML = authenticated ? '🔒 Lock Page' : '🔓 Enable Full Access';
        }
        
        if (isInCooldown()) {
            authButton.style.background = '#6c757d';
        } else {
            authButton.style.background = authenticated ? '#dc3545' : '#1d9bf0';
        }
        
        // Update hover colors
        authButton.onmouseover = () => {
            if (isInCooldown()) {
                authButton.style.background = '#5a6268';
            } else {
                authButton.style.background = authenticated ? '#c82333' : '#1a8cd8';
            }
            authButton.style.transform = 'scale(1.05)';
        };
        
        authButton.onmouseout = () => {
            if (isInCooldown()) {
                authButton.style.background = '#6c757d';
            } else {
                authButton.style.background = authenticated ? '#dc3545' : '#1d9bf0';
            }
            authButton.style.transform = 'scale(1)';
        };
    }
}

function isInCooldown() {
    return cooldownEndTime && Date.now() < cooldownEndTime;
}

function getCooldownRemaining() {
    if (!cooldownEndTime) return 0;
    return Math.max(0, cooldownEndTime - Date.now());
}

function startCooldown() {
    console.log('Starting 12-hour cooldown period');
    cooldownEndTime = Date.now() + COOLDOWN_TIME;
    
    // Store cooldown end time in storage
    chrome.storage.local.set({'cooldown-end-time': cooldownEndTime.toString()});
    
    // Clear any existing cooldown timer
    if (cooldownTimer) {
        clearInterval(cooldownTimer);
    }
    
    // Update button every minute during cooldown
    cooldownTimer = setInterval(() => {
        if (!isInCooldown()) {
            console.log('Cooldown period ended');
            clearInterval(cooldownTimer);
            cooldownTimer = null;
            cooldownEndTime = null;
            chrome.storage.local.remove(['cooldown-end-time']);
            updateButtonState();
        } else {
            updateButtonState();
        }
    }, 60000); // Update every minute
}



function loadCooldownState() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['cooldown-end-time'], (result) => {
            const storedEndTime = result['cooldown-end-time'];
            if (storedEndTime) {
                cooldownEndTime = parseInt(storedEndTime);
                if (isInCooldown()) {
                    console.log('Cooldown period still active');
                    // Restart cooldown timer
                    startCooldown();
                } else {
                    console.log('Cooldown period has expired');
                    cooldownEndTime = null;
                    chrome.storage.local.remove(['cooldown-end-time']);
                }
            }
            resolve();
        });
    });
}

function startAutoLockTimer() {
    console.log('Starting auto-lock timer for 5 minutes');
    timeRemaining = AUTO_LOCK_TIME;
    
    // Clear any existing timer
    if (autoLockTimer) {
        clearInterval(autoLockTimer);
    }
    
    // Update the button every second to show countdown
    autoLockTimer = setInterval(() => {
        timeRemaining -= 1000;
        
        if (timeRemaining <= 0) {
            // Time's up - auto-lock
            console.log('Auto-lock timer expired - locking page');
            clearInterval(autoLockTimer);
            autoLockTimer = null;
            setAuthenticated(false);
            
            // Show notification
            showAutoLockNotification();
        } else {
            // Update button with remaining time
            updateButtonState();
        }
    }, 1000);
}

function clearAutoLockTimer() {
    if (autoLockTimer) {
        console.log('Clearing auto-lock timer');
        clearInterval(autoLockTimer);
        autoLockTimer = null;
        timeRemaining = 0;
    }
}

function clearCooldownTimer() {
    if (cooldownTimer) {
        clearInterval(cooldownTimer);
        cooldownTimer = null;
    }
}

function showCooldownNotification() {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.innerHTML = '⏰ Session ended! 12-hour cooldown started.';
    notification.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        z-index: 999998;
        background: #ffc107;
        color: black;
        padding: 10px 15px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: bold;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        animation: fadeInOut 3s ease-in-out;
    `;
    
    // Add fade animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-10px); }
            10%, 90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
        if (style.parentNode) {
            style.remove();
        }
    }, 3000);
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
    
    // Store previous authentication state before changing it
    const wasAuthenticated = authenticated;
    
    try {
        await chrome.storage.local.set({'bookmark-auth': value.toString()});
        authenticated = value;
        console.log('Updated authenticated to:', authenticated);
        
        if (value) {
            // User just authenticated - start the auto-lock timer
            startAutoLockTimer();
        } else {
            // User just de-authenticated - clear the timer and start cooldown
            clearAutoLockTimer();
            
            // Start cooldown if we were previously authenticated
            if (wasAuthenticated) {
                startCooldown();
                showCooldownNotification();
            }
        }
        
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
        // Load cooldown state first
        await loadCooldownState();
        
        await checkAndInitAuth();
        
        // If user was previously authenticated, restart the timer
        if (authenticated) {
            console.log('User was previously authenticated, restarting timer');
            startAutoLockTimer();
        }
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
            
            if (isInCooldown()) {
                console.log('Cannot unlock - still in cooldown period');
                // Show cooldown time remaining
                const remaining = getCooldownRemaining();
                const hours = Math.floor(remaining / (60 * 60 * 1000));
                const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
                alert(`Still in cooldown period. ${hours} hours and ${minutes} minutes remaining.`);
                return;
            }
            
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

// Handle page visibility changes (tab switching, minimizing)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && authenticated && autoLockTimer) {
        console.log('Page hidden while authenticated - timer continues running');
    } else if (!document.hidden && authenticated && autoLockTimer) {
        console.log('Page visible again - timer still running');
        updateButtonState(); // Update countdown display
    }
});