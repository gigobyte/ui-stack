import { Check } from './types'
import safeGet from './safeGet'

export const angularjs: Check = () => {
    const ANGULARJS_SELECTOR = '[ng-app],[ng-model],[ng-controller],.ng-binding,[ng-scope],.ng-hide'

    if (document.querySelector(ANGULARJS_SELECTOR)) {
        return {
            title: 'AngularJS',
            slug: 'angularjs',
            website: 'https://angularjs.org/',
            version: safeGet(window, 'angular', 'version', 'full')
        }
    }
}

export const jquery: Check = () => {
    const jqKey = Object.getOwnPropertyNames(window).find(x => safeGet(window, x, 'fn', 'jquery'))

    if (jqKey) {
        return {
            title: 'jQuery',
            slug: 'jquery',
            website: 'https://jquery.com/',
            version: safeGet(window, jqKey, 'fn', 'jquery')
        }
    }
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
}

export const vue: Check = () => {
    const isVueFound = () => {
        const all = [...document.querySelectorAll('*')]

        for (const el of all) {
            const attributes = Array.from(el.attributes).map(attr => attr.nodeName)
            const vueAttr = attributes.find(x => x.startsWith('data-v-'))

            if (vueAttr && !el.getAttribute(vueAttr)) {
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
}

export const moment: Check = () => {
    if (safeGet(window, 'moment', 'version')) {
        return {
            title: 'Moment.js',
            slug: 'moment',
            website: 'https://momentjs.com/',
            version: safeGet(window, 'moment', 'version')
        }
    }
}

export const backbone: Check = () => {
    if (safeGet(window, 'Backbone', 'VERSION')) {
        return {
            title: 'Backbone.js',
            slug: 'backbone',
            website: 'http://backbonejs.org/',
            version: safeGet(window, 'Backbone', 'VERSION')
        }
    }
}

export const knockout: Check = () => {
    if (safeGet(window, 'ko', 'version')) {
        return {
            title: 'Knockout',
            slug: 'knockout',
            website: 'http://knockoutjs.com/',
            version: safeGet(window, 'ko', 'version')
        }
    }
}