# Youtube
### Get rid of noise!
##### Parts of the DOM to get rid of:
{
    "ytd-section-list-renderer": {
        "ytd-item-section-renderer: [
            "ytd-video-renderer",
            "ytd-reel-shelf-renderer",
            "ytd-video-renderer",
            "ytd-playlist-renderer",
            "ytd-shelf-renderer",
            "ytd-radio-renderer",
        ]
    }
}
> The sections above except for "ytd-video-renderer" are noise, as it is not linked to the search query 
> **TODO**: Prevent Dynamic changes eg when URL changes on a button press

### TODO: Add Custom Large Watch-Later section and Youtube-Music Button

# Instagram

# X
##### Understanding the DOM
Wierd Coded Class names:
- Feeds: `<div role="presentation" class="css-175oi2r r-14tvyh0 r-cpa5s6 r-16y2uox">`
- Right-section: `<div class="css-175oi2r r-kemksi r-1kqtdi0 r-1867qdf r-1phboty r-rs99b7 r-1ifxtd0 r-1udh08x">`

Feed DOM:
- `Who to follow` div
- `Crypto scam`
- UBlock Origin does a good job getting rid of ads


### New Variables and DOM Elements:
- `chrome`
- `window`
- `Mutation`