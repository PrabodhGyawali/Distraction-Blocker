// Youtube Settings:

function ytSettings() {
    document.getElementById("yt-settings").style.display = "block";
    // read word list from storage
    chrome.storage.sync.get('ytWordList', function(data) {
        if (data.ytWordList) {
            document.getElementById("yt-word-list").value = data.ytWordList;
        }
    });
}