# Add the scripts back and test if youtube is blocked

# TOFIX: Make Content.js load consistently

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

## Content-Scripts
- `matches` for identifying where to inject the content scripts into. `<scheme>://<host><path>`
- match pattern requirements where '*' cannot be on url
