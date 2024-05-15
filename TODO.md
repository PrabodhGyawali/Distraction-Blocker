# Add the scripts back and test if youtube is blocked

# TOFIX: Fix error with Cors requirements for API-requests

Go to -> `document.querySelector("#contents")`
-  Add attribute: 'visibility: hidden'
- Redirect from shorts

## Chrome Dev Notes 
> Service Worker -> Independent extension
  - explore memory panel
  - service worker is always alive in dev-tools

Content scripts tab -> add breakpoints etc...
url: chrome://serviceworker-internals
  - for terminating service workers

Archive:
```
"content_scripts": [
    {
      "matches": ["*://*.youtube.com/*"],
      "js": ["content.js"]
    }
  ]
```