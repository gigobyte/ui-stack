import { Check } from './types'

const safeGet = (object: Object, path: string[]): any => {
    return path.reduce((value, getter) => {
        try {
            if (!value) {
                return value
            }
    
            return value[getter]
        } catch {}
    }, object)
}

export const angularjs: Check = () => {
    const ANGULARJS_SELECTOR = '[ng-app],[ng-model],[ng-controller],.ng-binding,[ng-scope],.ng-hide'

    if (document.querySelector(ANGULARJS_SELECTOR)) {
        return {
            title: 'AngularJS',
            slug: 'angularjs',
            website: 'https://angularjs.org/',
            version: safeGet(window, ['angular', 'version', 'full'])
        }
    }

    return null
}

export const jquery: Check = () => {
    const jqKey = Object.getOwnPropertyNames(window).find(x => safeGet(window, [x, 'fn', 'jquery']))

    if (jqKey) {
        return {
            title: 'jQuery',
            slug: 'jquery',
            website: 'https://jquery.com/',
            version: safeGet(window, [jqKey, 'fn', 'jquery'])
        }
    }

    return null
}

export const react: Check = () => {
    const REACT_SELECTOR = '[data-reactroot],[data-reactid]'
    const importedReact = window['require'] && window['require']('React')

    if (document.querySelector(REACT_SELECTOR) || importedReact) { 
        return {
            title: 'React',
            slug: 'react',
            website: 'https://reactjs.org/',
            version: importedReact && importedReact.version
        }
    }

    return null
}

export const angular: Check = () => {
    const ANGULAR_SELECTOR = '[_nghost-c0],[_ngcontent-c0],[ng-version]'
    const angularVersionEl = document.querySelector('[ng-version]')

    if (document.querySelector(ANGULAR_SELECTOR)) {
        return {
            title: 'Angular',
            slug: 'angular',
            website: 'https://angular.io/',
            version: angularVersionEl && angularVersionEl.getAttribute('ng-version') || undefined
        }
    }

    return null
}

export const vue: Check = () => {
    const isVueFound = () => {
        const all = [].slice.call(document.querySelectorAll('*'))

        for (const el of all) {
            const attributes = [].slice.call(el.attributes).map(attr => attr.nodeName)
            if (attributes.find(x => x.startsWith('data-v'))) {
                return true
            }
        }

        return false
    }    

    if (window['Vue'] || isVueFound()) {
        return {
            title: 'Vue.js',
            slug: 'vue',
            website: 'https://vuejs.org/'
        }
    }

    return null
}