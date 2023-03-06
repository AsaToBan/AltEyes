function executeContentScript(message) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      files: ['/content.js']
    },() => {
      chrome.tabs.sendMessage(tabs[0].id, {message: message});
    });
  });
}

document.getElementById('btn1').addEventListener('click', () => {
  executeContentScript('insert');
});

document.getElementById('btn2').addEventListener('click', () => {
  executeContentScript('append');
});