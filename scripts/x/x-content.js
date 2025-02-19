/* global vars */
let authenticated = false;
const unauth_valid_paths = new Set(['/i/grok', '/i/bookmarks', '/jobs', '/messages']);

/* custom push & replace states */ 
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function() {
  originalPushState.apply(this, arguments);
  window.dispatchEvent(new CustomEvent('statechange', { detail: 'pushState' }));
};

history.replaceState = function() {
  originalReplaceState.apply(this, arguments);
  window.dispatchEvent(new CustomEvent('statechange', { detail: 'replaceState' }));
};


function initBookmarkAuth() {
	localStorage.setItem('bookmark-auth', false);
}

if (localStorage.getItem('bookmark-auth') == undefined) {
	console.log('initializing auth');
	initBookmarkAuth();
} else {
	let bookmark_auth = localStorage.getItem('bookmark-auth');
	authenticated = bookmark_auth === 'true';
}

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
window.addEventListener("popstate", (event) => {
	// alert(`location: ${document.location}, state: ${JSON.stringify(event.state)}`,);
	let url = document.location.href;
	console.log(url);
	if (!Array.from(unauth_valid_paths).some(path => url.includes(path))) {
		history.back();
	}
});

window.addEventListener("statechange", (e) => {
	console.log(`${e.detail} detected!`);
});
