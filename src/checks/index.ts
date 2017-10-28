import { Check } from './types'
import safeGet from './safeGet'
import safeRequire from './safeRequire'
import isObjectWithProperties from './isObjectWithProperties'

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
            version: safeGet(window, jqKey, 'fn', 'jquery').split(' ')[0]
        }
    }
}

export const react: Check = () => {
    const REACT_SELECTOR = '[data-reactroot],[data-reactid]'
    const importedReact = window['React'] || safeRequire(window, 'React') || safeRequire(window, 'react')

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
    const isVueFound = ([...(document.querySelectorAll('*') as any)] as HTMLElement[]).some(el => {
        const attributes = Array.from(el.attributes).map(attr => attr.nodeName)
        const vueAttr = attributes.find(x => x.startsWith('data-v-'))

        if (el['__vue__'] || (vueAttr && !el.getAttribute(vueAttr))) {
            return true
        }

        return false
    })

    if (window['Vue'] || isVueFound) {
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
    const backbone = safeGet(window, 'Backbone') || safeRequire(window, 'backbone')

    if (safeGet(backbone, 'VERSION')) {
        return {
            title: 'Backbone.js',
            slug: 'backbone',
            website: 'http://backbonejs.org/',
            version: safeGet(backbone, 'VERSION')
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

export const ember: Check = () => {
    const version = safeGet(window, 'Ember', 'VERSION')

    if (version || document.querySelector('.ember-application')) {
        return {
            title: 'Ember.js',
            slug: 'ember',
            website: 'https://www.emberjs.com/',
            version
        }
    }
}

export const knockback: Check = () => {
    const version = safeGet(window, 'kb', 'VERSION')

    if (document.querySelectorAll('[kb-inject]').length > 0 || version) {
        return {
            title: 'Knockback.js',
            slug: 'knockback',
            website: 'http://kmalakoff.github.io/knockback/',
            version
        }
    }
}

export const require: Check = () => {
    if (typeof window['require'] === 'function' && typeof window['requirejs'] === 'function') {
        return {
            title: 'RequireJS',
            slug: 'requirejs',
            website: 'http://requirejs.org/',
            version: safeGet(window, 'require', 'version')
        }
    }
}

export const webpack: Check = () => {
    if (window['webpackJsonp']) {
        return {
            title: 'Webpack',
            slug: 'webpack',
            website: 'https://webpack.js.org/'
        }
    }
}

export const polymer: Check = () => {
    if(safeGet(window, 'Polymer', 'version')) {
        return {
            title: 'Polymer',
            slug: 'polymer',
            website: 'https://www.polymer-project.org/',
            version: safeGet(window, 'Polymer', 'version')
        }
    }
}

export const mithril: Check = () => {
    const isMithrilObject = x => isObjectWithProperties(window[x], ['component', 'render', 'route', 'prop'])
    const mKey = Object.getOwnPropertyNames(window).find(isMithrilObject)

    if (mKey) {
        return {
            title: 'Mithril',
            slug: 'mithril',
            website: 'https://mithril.js.org/'
        }
    }
}

export const aurelia: Check = () => {
    if (document.querySelector('[aurelia-app]')) {
        return {
            title: 'Aurelia',
            slug: 'aurelia',
            website: 'http://aurelia.io/'
        }
    }
}

export const dojo: Check = () => {
    const version = safeGet(window, 'dojo', 'version', 'toString')

    if (version) {
        return {
            title: 'Dojo',
            slug: 'dojo',
            website: 'https://dojotoolkit.org/',
            version: version()
        }
    }
}

export const socketio: Check = () => {
    const isSocketIoObject = x => isObjectWithProperties(window[x], ['Manager', 'Socket', 'connect', 'managers'])
    const ioKey = Object.getOwnPropertyNames(window).find(isSocketIoObject)

    if (ioKey) {
        return {
            title: 'socket.io',
            slug: 'socketio',
            website: 'https://socket.io/'
        }
    }
}

export const cyclejs: Check = () => {
    if (safeGet(window, 'Cyclejs', 'sinks')) {
        return {
            title: 'Cycle.js',
            slug: 'cyclejs',
            website: 'https://cycle.js.org/'
        }
    }
}

export const meteor: Check = () => {
    const version = safeGet(window, 'Meteor', 'release')

    if (version) {
        return {
            title: 'Meteor',
            slug: 'meteor',
            website: 'https://www.meteor.com/',
            version: version.split('@').pop()
        }
    }
}

export const kendoui: Check = () => {
    if (safeGet(window, 'kendo', 'version')) {
        return {
            title: 'KendoUI',
            slug: 'kendoui',
            website: 'https://www.telerik.com/kendo-ui',
            version: safeGet(window, 'kendo', 'version')
        }
    }
}

export const styledComponents: Check = () => {
    if (document.querySelector('style[data-styled-components]')) {
        return {
            title: 'styled-components',
            slug: 'styledcomponents',
            website: 'https://www.styled-components.com/'
        }
    }
}

export const emotion: Check = () => {
    if (document.querySelector('style[data-emotion]')) {
        return {
            title: 'emotion',
            slug: 'emotion',
            website: 'https://emotion.sh/'
        }
    }
}

export const glamorous: Check = () => {
    if (document.querySelector('style[data-glamor]')) {
        return {
            title: 'glamorous',
            slug: 'glamorous',
            website: 'https://glamorous.rocks/'
        }
    }
}

export const radium: Check = () => {
    if (document.querySelector('[data-radium]')) {
        return {
            title: 'Radium',
            slug: 'radium',
            website: 'http://formidable.com/open-source/radium/'
        }
    }
}