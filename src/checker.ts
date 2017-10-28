import * as checks from './checks/index'
import { Library } from './checks/types'

let appendedLibs = false

const runCheck = () => {
    const body = document.getElementsByTagName('body')[0]
    
    const libs = [
        // frameworks
        checks.angular(),
        checks.react(),
        checks.vue(),
        checks.angularjs(),
        checks.backbone(),
        checks.knockout(),
        checks.ember(),
        checks.knockback(),
        checks.polymer(),
        checks.mithril(),
        checks.aurelia(),
        checks.dojo(),
        checks.meteor(),
        checks.kendoui(),
    
        // libraries
        checks.jquery(),
        checks.moment(),
        checks.socketio(),
        checks.cyclejs(),

        // tools
        checks.require(),
        checks.webpack()
    ].filter(Boolean) as Library[]
    
    if (libs.length === 0) {
        appendedLibs = true

        const noLibEl = document.createElement('div')
        noLibEl.className = 'ui-stack-no-libs'
        body.appendChild(noLibEl)
    } else {
        appendedLibs = true

        libs.forEach((x) => {
            const libEl = document.createElement('div')
            libEl.setAttribute('data-title', x.title)
            libEl.setAttribute('data-slug', x.slug)
            libEl.setAttribute('data-version', x.version || '')
            libEl.setAttribute('data-website', x.website || '')
            libEl.className = 'ui-stack-lib'
            body.appendChild(libEl)
        })
    }
}

runCheck()

setInterval(() => {
    if (appendedLibs) {
        const libElementAdded = Boolean(document.querySelector('.ui-stack-lib, .ui-stack-no-libs'))

        if (!libElementAdded) {
            appendedLibs = false
            runCheck()
        }
    }
}, 1500)