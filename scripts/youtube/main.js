/**
 * File: /scripts/youtube/main.js
 * Author: PrabodhGyawali
 * Date: 25/07/2024
 * Description: First file ran on extension load for Youtube.
 */

import { get_current_href } from "./utils.js";
import homeSignalMax from "./home.js"

const validRoutes = ["/feed/you", "/watch?", "/results?search_query="];

window.onload = () => {
    const current_url = get_current_href();
    if (current_url == "https://www.youtube.com/") {
        homeSignalMax();
    }
    else {
        validRoutes.forEach(path => {
            if (current_url.includes(path)) {
                console.log("Valid path")
            }
            else { console.log(current_url)}
        });
    }
}
