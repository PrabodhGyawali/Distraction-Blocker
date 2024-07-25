/**
 * File: main.js
 * Author: PrabodhGyawali
 * Date: 25/07/2024
 * Description: First file ran on extension load for Youtube.
 */

import { get_current_href } from "../utils.js";
import homeSignalMax from "./home.js"

const validRoutes = ["/feed/you", "/watch?", "/results?search_query="];

window.onload = () => {
    if (validRoutes.includes(get_current_href())) {
        console.log("valid route");
    }
    else {
        console.log(get_current_href())
    }
}

// // Remove Thumbnails
// thumbnails = document.querySelector('#contents.ytd-rich-grid-renderer');
// if (thumbnails) {
//     thumbnails.remove();
// }
// // Remove Page Manager
// pageManager = document.querySelector('ytd-page-manager');
// if (pageManager) {
//     pageManager.style.display = "none";
// }



// TODO: Learn to stash this code or create a branch

// chrome.storage.onChanged.addEventListener((changes, namespace) => {
//     for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
//         console.log(
//             `Storage key "${key}" in namespace "${namespace}" changed.`,
//             `Old value was "${oldValue}", new value is "${newValue}".`
//         )
//     }
// });