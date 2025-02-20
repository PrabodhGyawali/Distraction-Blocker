/* global vars */
let authenticated = false;
const unauth_valid_paths = new Set(['/i/grok', '/i/bookmarks', '/jobs', '/messages']);

function checkCurrentUrl() {
    if (!authenticated) {
        const url = window.location.href;
        if (!Array.from(unauth_valid_paths).some(path => url.includes(path))) {
            window.location.href = 'https://x.com/i/bookmarks';
        }
    }
}

async function initAuth() {
	await chrome.storage.local.set({'bookmark-auth', 'false'});
	authenticated = result['bookmark-auth'] === 'true';

	checkCurrentUrl();
}

async function checkAndInitAuth() {
	const result = await chrome.storage.local.get(['bookmark-auth']);
	if (result['bookmark_auth'] === undefined) {
		console.log('initializing auth');
		await initAuth();
	}
}

// Handle authentication state changes
async function setAuthenticated(value) {
	await chrome.storage.local.set({'bookmark-auth': value.toString()});
}

window.addEventListener('load', async () => {
	await checkAndInitAuth();

	const authButton = document.querySelector('#authenticate-button');
	if (authButton) {
		        authButton.addEventListener('click', () => setAuthenticated(true));
	}
});

if (!authenticated) {
	try {
		const url = window.location.href;
		if (!Array.from(unauth_valid_paths).some(path => url.includes(path))) {
			console.log('invalid url redirecting');
			window.location.href = 'https://x.com/i/bookmarks';
		} else {console.log('valid url')};
	} catch(error) {
		console.log(error);
	}
}

/* History API: Read MDN docs */
window.addEventListener("popstate", checkCurrentUrl);


