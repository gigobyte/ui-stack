import { Check } from './types'
import safeGet from './safeGet'
import safeCall from './safeCall'
import safeRequire from './safeRequire'
import safeGetValues from './safeGetValues'
import isObjectWithProperties from './isObjectWithProperties'
import doesAnyElement from './doesAnyElement'

export const angularjs: Check = () => {
    const ANGULARJS_SELECTOR = '[ng-app],[ng-model],[ng-controller],[ng-scope],.ng-hide'

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
    const isReactFound = doesAnyElement(document, el => Object.keys(el).some(key => key.startsWith('__react')))

    if (document.querySelector(REACT_SELECTOR) || importedReact || isReactFound) { 
        return {
            title: 'React',
            slug: 'react',
            website: 'https://reactjs.org/',
            version: safeGet(importedReact, 'version')
        }
    }
}

export const angular: Check = () => {
    const ANGULAR_SELECTOR = '[_nghost-c0],[_ngcontent-c0],[ng-version],[ng-for]'
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
    const isVueFound = doesAnyElement(document, el => {
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
    const knockout = safeGet(window, 'ko') || safeRequire(window, 'knockout')

    if (safeGet(knockout, 'version')) {
        return {
            title: 'Knockout',
            slug: 'knockout',
            website: 'http://knockoutjs.com/',
            version: safeGet(knockout, 'version')
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

export const nextjs: Check = () => {
    if (safeGet(window, 'next', 'ErrorComponent') || safeGet(window, '__NEXT_DATA__')) {
        return {
            title: 'Next.js',
            slug: 'nextjs',
            website: 'https://zeit.co/next'
        }
    }
}

export const elm: Check = () => {
    if (typeof window['Elm'] === 'object') {
        return {
            title: 'Elm',
            slug: 'elm',
            website: 'http://elm-lang.org/'
        }
    }
}

export const scalajs: Check = () => {
    if (window['__ScalaJSExportsNamespace']) {
        return {
            title: 'Scala.js',
            slug: 'scalajs',
            website: 'https://www.scala-js.org/'
        }
    }
}

export const reason: Check = () => {
    if (safeGet(window, 'ocaml', 'version')) {
        return {
            title: 'Reason',
            slug: 'reason',
            website: 'https://reasonml.github.io/',
            version: safeGet(window, 'ocaml', 'version')
        }
    }
}

export const gatsby: Check = () => {
    if (document.querySelector('#___gatsby')) {
        return {
            title: 'Gatsby',
            slug: 'gatsby',
            website: 'https://www.gatsbyjs.org/'
        }
    }
}

export const modernizr: Check = () => {
    if (safeGet(window, 'Modernizr', '_version')) {
        return {
            title: 'Modernizr',
            slug: 'modernizr',
            website: 'https://modernizr.com/',
            version: safeGet(window, 'Modernizr', '_version')
        }
    }
}

export const mobx: Check = () => {
    const isStore = x => safeGet(x, '$mobx')
    const isRootStore = x => window[x] && safeGetValues(window[x]) && safeGetValues(window[x]).some(isStore)
    const mobxKey = Object.getOwnPropertyNames(window).find(isRootStore)

    if (mobxKey || safeRequire(window, 'mobx') || window['__mobxInstanceCount'] || window['__mobxGlobal']) {
        return {
            title: 'MobX',
            slug: 'mobx',
            website: 'https://mobx.js.org/'
        }
    }
}

export const materialize: Check = () => {
    if (typeof window['Materialize'] === 'object') {
        return {
            title: 'Materialize',
            slug: 'materialize',
            website: 'http://materializecss.com/'
        }
    }
}

export const d3: Check = () => {
    if (safeGet(window, 'd3', 'version')) {
        return {
            title: 'D3.js',
            slug: 'd3',
            website: 'https://d3js.org/',
            version: safeGet(window, 'd3', 'version')
        }
    }
}

export const whitestormjs: Check = () => {
    if (typeof window['WHS'] === 'object') {
        return {
            title: 'whs.js',
            slug: 'whsjs',
            website: 'https://whs.io/'
        }
    }
}

export const purescript: Check = () => {
    if (safeGet(window, 'PS', 'Main')) {
        return {
            title: 'PureScript',
            slug: 'purescript',
            website: 'http://www.purescript.org/'
        }
    }
}

export const mootools: Check = () => {
    if (safeGet(window, 'MooTools', 'version')) {
        return {
            title: 'MooTools',
            slug: 'mootools',
            website: 'https://mootools.net/',
            version: safeGet(window, 'MooTools', 'version')
        }
    }
}

export const clojurescript: Check = () => {
    if (safeGet(window, 'cljs', 'core')) {
        return {
            title: 'ClojureScript',
            slug: 'clojurescript',
            website: 'https://clojurescript.org/'
        }
    }
}

export const p5: Check = () => {
    if (typeof window['p5'] === 'function') {
        return {
            title: 'p5.js',
            slug: 'p5',
            website: 'https://p5js.org/'
        }
    }
}

export const pixijs: Check = () => {
    if (safeGet(window, 'PIXI', 'VERSION')) {
        return {
            title: 'PixiJS',
            slug: 'pixijs',
            website: 'http://www.pixijs.com/',
            version: safeGet(window, 'PIXI', 'VERSION')
        }
    }
}

export const ui5: Check = () => {
    if (safeGet(window, 'sap', 'ui', 'version')) {
        return {
            title: 'UI5',
            slug: 'ui5',
            website: 'http://openui5.org/',
            version: safeGet(window, 'sap', 'ui', 'version')
        }
    }
}

export const marko: Check = () => {
    if (document.querySelector('[data-marko],[data-marko-key]')) {
        return {
            title: 'Marko',
            slug: 'marko',
            website: 'https://markojs.com/'
        }
    }
}

export const svelte: Check = () => {
    if (safeGet(window, 'svelte', 'VERSION')) {
        return {
            title: 'Svelte',
            slug: 'svelte',
            website: 'https://svelte.technology/',
            version: safeGet(window, 'svelte', 'VERSION')
        }
    }
}

export const marionette: Check = () => {
    if (safeGet(window, 'Marionette', 'VERSION')) {
        return {
            title: 'Marionette',
            slug: 'marionette',
            website: 'https://marionettejs.com/',
            version: safeGet(window, 'Marionette', 'VERSION')
        }
    }
}

export const inferno: Check = () => {
    if (safeGet(window, 'Inferno', 'version')) {
        return {
            title: 'Inferno',
            slug: 'inferno',
            website: 'https://infernojs.org/',
            version: safeGet(window, 'Inferno', 'version')
        }
    }
}

export const dio: Check = () => {
    if (safeGet(window, 'dio', 'version')) {
        return {
            title: 'DIO',
            slug: 'dio',
            website: 'https://dio.js.org/',
            version: safeGet(window, 'dio', 'version')
        }
    }
}

export const extjs: Check = () => {
    if (safeGet(window, 'Ext', 'version')) {
        return {
            title: 'Ext JS',
            slug: 'extjs',
            website: 'https://www.sencha.com/products/extjs/',
            version: safeGet(window, 'Ext', 'version')
        }
    }
}

export const yui: Check = () => {
    if (safeGet(window, 'YUI', 'version')) {
        return {
            title: 'YUI',
            slug: 'yui',
            website: 'https://yuilibrary.com/',
            version: safeGet(window, 'YUI', 'version')
        }
    }
}

export const enyo: Check = () => {
    const enyo = safeGet(window, 'enyo')
    const enyoRequire = safeGet(enyo, 'require')

    if (enyo || safeGet(window, 'EnyoJS')) {
        return {
            title: 'Enyo',
            slug: 'enyo',
            website: 'http://enyojs.com/',
            version: safeGet(enyo, 'version') || safeGet(enyo, 'version', 'enyo') || safeGet(safeCall(enyoRequire, 'enyo'), 'version')
        }
    }
}

export const immutable: Check = () => {
    const im = safeGet(window, 'Immutable') || safeRequire(window, 'immutable')

    if (im) {
        return {
            title: 'Immutable.js',
            slug: 'immutable',
            website: 'https://facebook.github.io/immutable-js/',
            version: safeGet(im, 'version')
        }
    }
}

export const jqueryui: Check = () => {
    const jqKey = Object.getOwnPropertyNames(window).find(x => safeGet(window, x, 'ui', 'version'))

    if (jqKey) {
        return {
            title: 'jQuery UI',
            slug: 'jqueryui',
            website: 'https://jqueryui.com/',
            version: safeGet(window, jqKey, 'ui', 'version')
        }
    }
}

export const moon: Check = () => {
    const m = safeGet(window, 'Moon') || safeRequire(window, 'moonjs')
    if (m) {
        return {
            title: 'Moon',
            slug: 'moon',
            website: 'http://moonjs.ga/',
            version: safeGet(m, 'version')
        }
    }
}

export const riot: Check = () => {
    const r = safeGet(window, 'riot') || safeRequire(window, 'riot')

    if (r) {
        return {
            title: 'Riot',
            slug: 'riot',
            website: 'http://riotjs.com/',
            version: safeGet(r, 'version')
        }
    }
}

export const phaser: Check = () => {
    if (safeGet(window, 'Phaser', 'VERSION')) {
        return {
            title: 'Phaser',
            slug: 'phaser',
            website: 'https://phaser.io/',
            version: safeGet(window, 'Phaser', 'VERSION')
        }
    }
}

export const webix: Check = () => {
    if (safeGet(window, 'webix', 'version')) {
        return {
            title: 'webix',
            slug: 'webix',
            website: 'https://webix.com/',
            version: safeGet(window, 'webix', 'version')
        }
    }
}

export const preact: Check = () => {
    const preact = safeGet(window, 'preact') || safeRequire(window, 'preact')
    const isPreactFound = doesAnyElement(document, el => el[Symbol.for('preactattr')] || el['__preactattr_'])

    if (preact || isPreactFound) {
        return {
            title: 'Preact',
            slug: 'preact',
            website: 'https://preactjs.com/',
            version: safeGet(preact, 'version')
        }
    }
}