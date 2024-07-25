/**
 * Maximize Signal when watching a video
 */
import { cleanSearchResults } from "./cleaner.js";

function searchSignalMaximizer() {
    // TODO: Add settings app to block certain keywords from youtube search
    var sections = document.querySelector("iron-selector");
    if (sections) {
        sections.remove();
    }
    cleanSearchResults();
}

export default searchSignalMaximizer;