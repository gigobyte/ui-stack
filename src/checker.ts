import * as checks from './checks/index'
import { Library } from './checks/types'

let appendedLibs = false

const runCheck = () => {
    const body = document.getElementsByTagName('body')[0]

    const libs = [
        // languages
        checks.elm(),
        checks.scalajs(),
        checks.reason(),
        checks.purescript(),
        checks.clojurescript(),

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
        checks.nextjs(),
        checks.gatsby(),
        checks.ui5(),
        checks.marko(),
        checks.svelte(),
        checks.marionette(),
        checks.inferno(),
        checks.dio(),
        checks.extjs(),
        checks.yui(),
        checks.enyo(),
        checks.riot(),
        checks.phaser(),
        checks.webix(),
        checks.preact(),
        checks.amp(),
        checks.uikit(),
        checks.ractive(),

        // libraries
        checks.jquery(),
        checks.moment(),
        checks.socketio(),
        checks.cyclejs(),
        checks.styledComponents(),
        checks.emotion(),
        checks.glamorous(),
        checks.radium(),
        checks.modernizr(),
        checks.mobx(),
        checks.materialize(),
        checks.d3(),
        checks.whitestormjs(),
        checks.mootools(),
        checks.p5(),
        checks.pixijs(),
        checks.immutable(),
        checks.jqueryui(),
        checks.moon(),
        checks.chartjs(),
        checks.raphael(),
        checks.amcharts(),
        checks.echarts(),
        checks.lodash(),
        checks.highcharts(),
        checks.handlebars(),
        checks.anime(),
        checks.yalla(),
        checks.epoch(),
        checks.semantic(),

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
