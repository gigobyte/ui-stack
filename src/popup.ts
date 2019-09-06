import { Library } from './checks/types'

const sendRequest = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    if (tabs[0] && tabs[0].id) {
      chrome.tabs.sendMessage(
        tabs[0].id as number,
        { type: 'GET_STACK' },
        renderStack
      )

      const $message = document.querySelector('.message')

      if ($message) {
        $message.textContent = 'Loading...'
      }
    }
  })
}

const renderStack = (libs: Library[]): void => {
  if (!libs) {
    sendRequest()
    return
  }

  const $container = document.querySelector('.container') as HTMLElement

  if (libs.length === 0) {
    $container.innerHTML = `
            <div class="message">Nothing found. <span class="try-again">Try again</span></div>
        `

    const $tryAgain = document.querySelector('.try-again')

    if ($tryAgain) {
      $tryAgain.addEventListener('click', sendRequest)
    }
  } else {
    $container.innerHTML = libs.reduce(
      (html, library) => `
            ${html}
            <div class="flex-container lib">
                <div class="flex-item-1 logo">
                    <img src="../images/${library.slug}.png" alt="${
        library.title
      }" />
                </div>
                <div class="flex-item-4 info">
                    <div class="title">${library.title}</div>
                    ${library.website &&
                      `<a href="${library.website}" data-href="${library.website}" class="website">${library.website}</a>`}
                    <div class="version">${library.version || ''}</div>
                </div>
            </div>
        `,
      ''
    )
  }

  ;[...(document.querySelectorAll('.website') as any)].forEach(el => {
    el.addEventListener('click', e => {
      chrome.tabs.create({ url: e.target.dataset.href })
    })
  })
}

sendRequest()
