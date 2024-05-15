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

## Running scripts on every page:
```
{
  "manifest_version": 3,
  "name": "Reading time",
  "version": "1.0",
  "description": "Add the reading time to Chrome Extension documentation articles"
}
```

Archive:
```
"content_scripts": [
    {
      "matches": ["*://*.youtube.com/*"],
      "js": ["content.js"]
    }
  ]
```