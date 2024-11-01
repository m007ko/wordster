document.addEventListener('dblclick', (event) => {
  let selectedWord = window.getSelection().toString().trim();
  if (selectedWord) {
      chrome.runtime.sendMessage(
          { type: "saveWord", word: selectedWord },
          (response) => {
              if (response && response.status === "Word saved successfully!") {
                  alert(`Word "${selectedWord}" saved!`);
              }
          }
      );
  }
});
