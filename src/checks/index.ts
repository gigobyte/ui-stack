import { Check } from './types'

const safeGet = (object: Object, path: string[]): any => {
    return path.reduce((value, getter) => {
        if (!value) {
            return value
        }

        return value[getter]
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