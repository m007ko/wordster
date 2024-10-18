chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("hello.html") });
});
document.addEventListener('dblclick', (event) => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0 && selectedText.split(' ').length === 1) {
      chrome.runtime.sendMessage({ action: "storeWord", word: selectedText });
    }
  });
