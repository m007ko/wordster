document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get("words", (data) => {
        const wordList = data.words || [];
        const wordContainer = document.getElementById("wordList");
        wordContainer.innerHTML = wordList.map(word => `<p>${word}</p>`).join('');
    });

    document.getElementById("clearWords").addEventListener("click", () => {
        chrome.storage.local.set({ words: [] }, () => {
            document.getElementById("wordList").innerHTML = '';
            alert("All words cleared!");
        });
    });

    document.getElementById("exportWords").addEventListener("click", () => {
        chrome.storage.local.get("words", (data) => {
            const wordList = data.words || [];
            const blob = new Blob([wordList.join('\n')], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'words.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    });
});