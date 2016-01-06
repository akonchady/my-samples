document.addEventListener('DOMContentLoaded', function () {
    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.tabs.executeScript(null, {file: 'downloadCode.js'});
    });
});