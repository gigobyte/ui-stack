document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
        if (tabs[0] && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id as number, {type: 'GET_STACK'}, (response) => {
                console.log(response)
            });
        }
    })
})