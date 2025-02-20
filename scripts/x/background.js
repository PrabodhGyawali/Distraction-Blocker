// Constants and helper functions
const unauth_valid_paths = new Set(['/i/grok', '/i/bookmarks', '/jobs', '/messages']);

function isValidUnauthPath(url) {
    try {
		return Array.from(unauth_valid_paths).some(path => url.includes(path));
    } catch(error) {
        console.error('URL validation error:', error);
        return false;
    }
}

// Check authentication status from chrome.storage
async function isAuthenticated() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['bookmark-auth'], (result) => {
            resolve(result['bookmark-auth'] === 'true');
        });
    });
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	if (changeInfo.url && changeInfo.url.includes('x.com')) {
		const result = await chrome.storage.local.get(['bookmark-auth']);
		const isAuthenticated = result['bookmark-auth'] === 'true';
        if (!isAuthenticated && !isValidUnauthPath(changeInfo.url)) {
            // Redirect to bookmarks page
            chrome.tabs.update(tabId, {
                url: 'https://x.com/i/bookmarks'
            });
        }
	}
})
