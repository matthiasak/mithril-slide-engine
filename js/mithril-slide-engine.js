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

const engine = () => {
    const parseHash = () => parseInt(window.location.hash.slice(1)) || 0

    const slides = m.prop([]),
        active = m.prop(parseHash()),
        prev = m.prop()

    const insert = computable((val, index) => {
        if(val instanceof Function) val = {view: val}
        if(!val.controller) val.controller = () => {}

        if(typeof index === 'undefined')
            index = slides().length

        const i = slides(),
            [first, third] = [i.slice(0,index), i.slice(index+1)]

        return slides([...first, val, ...third])
    })

    const remove = computable(index => {
        const i = slides(),
            [first, second] = [i.slice(0,index), i.slice(index+1)]
        return slides([...first, ...second])
    })

    const navigate = index => {
        window.location.hash = `#${index}`
        prev(active())
        return active(index)
    }

    const LEFT = 37,
        RIGHT = 39

    const events = {
        onkeyup: (e) => {
            let {keyCode} = e

            if(LEFT === keyCode) {
                let next = active()-1
                if(next < 0) next = slides().length - 1
                navigate(next)
            } else if(RIGHT === keyCode) {
                let next = active()+1
                if(next > slides().length - 1) next = 0
                navigate(next)
            }
        }
    }

    const config = function(element, init, vdom) {
        if(active() === prev()) return
    }

    const hashChanger = () => window.addEventListener('hashchange', () => {
        const hash = window.location.hash
        let slide = parseInt(hash.slice(1))
        if(slide !== NaN){
            navigate(slide)
        }
    })

    const valueOf = (a) => a()

    const view = (ctrl) => {
        let a = active(),
            s = slides(),
            sel = (active() < prev() && 'from-left') ||
                (active() > prev() && 'from-right') ||
                ''

        let _slide =  m('div', {key:a, className: sel}, s[a])

        return m('html', {config}, [
            m('head', [
                m('title', 'something'),
                m('meta', {name:'viewport', content:"width=device-width, initial-scale=1.0"}),
                m('link', {href: './style.css', type:'text/css', rel:'stylesheet'})
            ]),
            m('body', events, [
                m('.slides', _slide)//_slides.map(valueOf))
            ])
        ])
    }

    const render = (..._) => (hashChanger(), m.mount(qs(..._), {view}))

    return { slides, insert, remove, navigate, render }
}

module.exports = {engine, resolver, container, m}