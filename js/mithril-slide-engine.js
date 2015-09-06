import {resolver, container, m} from 'mithril-resolver'

const qs = (s, e=document) => s ? e.querySelector(s) : e

const computable = fn => {
    return (...args) => {
        m.startComputation()
        let result = fn(...args)
        m.endComputation()
        return result
    }
}

export default () => {
    const parseHash = () => parseInt(window.location.hash.slice(1)) || 0

    const slides = m.prop([]),
        active = m.prop(parseHash()),
        prev = m.prop()

    const insert = computable((..._slides) => {
        return slides(_slides.map(val => {
            if(val instanceof Function) val = {view: val}
            if(!val.controller) val.controller = () => {}
            return val
        }))
    })

    const remove = computable(index => {
        const i = slides(),
            [first, second] = [i.slice(0,index), i.slice(index+1)]
        return slides([...first, ...second])
    })

    const navigate = computable(index => {
        window.location.hash = `#${index}`
        prev(active())
        if(index >= slides().length) {
            window.location.hash = `#0`
            return
        }
        if(index < 0) {
            window.location.hash = `#${slides().length-1}`
            return
        }
        return active(index)
    })

    const toggleFullscreen = () => {
        const d = document.body,
            isFullscreen = (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement)

        if(!isFullscreen){
            d.requestFullscreen && d.requestFullscreen()
            d.mozRequestFullScreen && d.mozRequestFullScreen()
            d.webkitRequestFullScreen && d.webkitRequestFullScreen()
            d.msRequestFullscreen && d.msRequestFullscreen()
        } else {
            document.exitFullscreen && document.exitFullscreen()
            document.mozCancelFullScreen && document.mozCancelFullScreen()
            document.webkitExitFullscreen && document.webkitExitFullscreen()
            document.msExitFullscreen && document.msExitFullscreen()
        }
    }

    const keymap = {
            37: 'LEFT',
            39: 'RIGHT',
            224: 'CMD',
            17: 'CTRL',
            70: 'F'
        },
        pressed = {}

    const events = {
        keydown: (e) => {
            let {keyCode} = e
            pressed[keymap[keyCode]] = true

            if(pressed.LEFT) {
                let next = active()-1
                if(next < 0) next = slides().length - 1
                navigate(next)
            } else if(pressed.RIGHT) {
                let next = active()+1
                if(next > slides().length - 1) next = 0
                navigate(next)
            } else if(pressed.CTRL && pressed.F){
                toggleFullscreen()
                e.preventDefault()
                e.stopImmediatePropagation()
            }
        },
        keyup: (e) => {
            let {keyCode} = e
            pressed[keymap[keyCode]] = false
        }
    }

    const initEvents = () => {
        Object.keys(events).forEach(e =>
                window.addEventListener(e, events[e]))
        hashChanger()
    }

    const config = function(element, init, vdom) {
        if(active() === prev()) return
    }

    const hashChanger = () =>
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash
            let slide = parseInt(hash.slice(1))
            if(slide !== NaN && slide !== active()){
                navigate(slide)
            }
        })

    const valueOf = (a) => a()

    const arrows = () => [
        m('.arrow.left', {onclick: () => navigate(active()-1)}),
        m('.arrow.right', {onclick: () => navigate(active()+1)})
    ]

    const view = (ctrl) => {
        let a = active(),
            s = slides(),
            sel = (active() < prev() && 'from-left') ||
                (active() > prev() && 'from-right') ||
                ''

        let _slide =  m('div', {key:a, className: sel}, s[a])

        return m('html', {config}, [
            m('head', [
                m('title', `slide: ${active()}`),
                m('meta', {name:'viewport', content:"width=device-width, initial-scale=1.0"}),
                m('link', {href: './style.css', type:'text/css', rel:'stylesheet'})
            ]),
            m('body', [
                m('.slides', _slide),
                arrows()
            ])
        ])
    }

    const render = (..._) => (initEvents(), m.mount(qs(..._), {view}))

    return { slides, insert, remove, navigate, render }
}