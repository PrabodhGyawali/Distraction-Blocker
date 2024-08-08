/**
 * File: /scripts/youtube/main.js
 * Author: PrabodhGyawali
 * Date: 25/07/2024
 * Description: First file ran on extension load for Youtube.
 */

import { get_current_href } from "./utils.js";
import homeSignalMax from "./home.js"
import { cleanUI } from "./cleaner.js";
import searchSignalMaximizer from "./search.js";

const validRoutes = ["/feed/you", "/watch?", "/results?search_query=", '/account'];

window.onload = () => {
    cleanUI()
    const current_url = get_current_href();
    if (current_url == "https://www.youtube.com/") {
        homeSignalMax();
    }
    else if (current_url.includes(validRoutes[0])) {
        
    }
    else if (current_url.includes(validRoutes[1])) {
        searchSignalMaximizer();
    }
    else if (current_url.includes(validRoutes[2])) {
        searchSignalMaximizer();
    }
}
