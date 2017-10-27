const injectScript = (file: string, node: string) => {
    const th = document.getElementsByTagName(node)[0]
    const s = document.createElement('script')
    s.setAttribute('type', 'text/javascript')
    s.setAttribute('src', file)
    th.appendChild(s)
}

injectScript(chrome.extension.getURL('./build/checker.js'), 'body')

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.type === 'GET_STACK') {
        const libInterval = setInterval(() => {
            const libs = [...document.querySelectorAll('.ui-stack-lib') as any] as HTMLElement[]
            const noLibsFound = Boolean(document.querySelector('.ui-stack-no-libs'))

            if (noLibsFound) {
                sendResponse([])
                clearInterval(libInterval)
            }

            if (libs.length !== 0) {
                sendResponse(libs.map(x => ({...x.dataset})))
                clearInterval(libInterval)
            }
        }, 1000)
    }

    return true;
});