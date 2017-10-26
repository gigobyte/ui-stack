chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.type === 'GET_STACK') {
        sendResponse('hello world')
    }
});