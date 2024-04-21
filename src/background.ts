chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getCPUInfo') {
    chrome.system.cpu.getInfo((info) => {
      sendResponse(info);
    });
    return true; // Indicates that sendResponse will be called asynchronously
  }
});

export {};