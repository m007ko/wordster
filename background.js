const wordList = [];
chrome.runtime.onInstalled.addListener(() => {
  console.log("Word Collector Extension Installed");
  // Initialize empty array in storage if not exists
  chrome.storage.local.get("words", (data) => {
      if (!data.words) {
          chrome.storage.local.set({ words: [] });
      }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "saveWord") {
      chrome.storage.local.get("words", (data) => {
          const wordList = data.words || [];
          if (!wordList.includes(message.word)) {
              wordList.push(message.word);
              chrome.storage.local.set({ words: wordList }, () => {
                  sendResponse({ status: "Word saved successfully!" });
              });
          } else {
              sendResponse({ status: "Word already exists!" });
          }
      });
      return true; // Will respond asynchronously
  }
});
