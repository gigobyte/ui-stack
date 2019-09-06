const injectScript = (file: string, node: string) => {
  const th = document.getElementsByTagName(node)[0]
  const s = document.createElement('script')
  s.setAttribute('type', 'text/javascript')
  s.setAttribute('src', file)
  th.appendChild(s)
}

let cachedResult

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === 'GET_STACK') {
    if (!cachedResult) {
      injectScript(chrome.extension.getURL('./build/checker.js'), 'body')

      const libInterval = setInterval(() => {
        const libs = ([
          ...(document.querySelectorAll('.ui-stack-lib') as any)
        ] as HTMLElement[]).map(x => ({ ...x.dataset }))
        const noLibsFound = Boolean(document.querySelector('.ui-stack-no-libs'))

        if (noLibsFound) {
          cachedResult = []
          sendResponse([])
          clearInterval(libInterval)
        }

        if (libs.length !== 0) {
          cachedResult = libs
          sendResponse(libs)
          clearInterval(libInterval)
        }
      }, 1000)
    } else {
      sendResponse(cachedResult)
    }
  }

  return true
})
