import * as checks from './checks/index'
import { Library } from './checks/types'

const body = document.getElementsByTagName('body')[0]

const libs = [
    // frameworks
    checks.angular(),
    checks.react(),
    checks.vue(),
    checks.angularjs(),
    checks.backbone(),
    checks.knockout(),

    // libraries
    checks.jquery(),
    checks.moment()
].filter(Boolean) as Library[]

console.log(JSON.stringify(libs))

if (libs.length === 0) {
    const noLibEl = document.createElement('div')
    noLibEl.className = 'ui-stack-no-libs'
    body.appendChild(noLibEl)
}

libs.forEach((x) => {
    const libEl = document.createElement('div')
    libEl.setAttribute('data-title', x.title)
    libEl.setAttribute('data-slug', x.slug)
    libEl.setAttribute('data-version', x.version || '')
    libEl.setAttribute('data-website', x.website || '')
    libEl.className = 'ui-stack-lib'
    body.appendChild(libEl)
})