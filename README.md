### Mithril Slide Engine

---

[![NPM](https://nodei.co/npm/mithril-slide-engine.png)](https://nodei.co/npm/mithril-slide-engine/)

![](https://david-dm.org/matthiasak/mithril-slde-engine.svg)

Mithril Slide Engine is a slidedeck / presentation engine for interactive web apps. Example app: https://github.com/matthiasak/keas-to-the-future-fullstack-barcelona-2015/

### Start running/building with:

```sh
npm run watch
```

#### How to get started

1. Start your own project folder

    ```sh
    cd ~/Github\ Projects/
    mkdir example01
    cd example01
    ```

2. Install this package through npm

    ```sh
    npm install -S mithril-slide-engine
    ```

3. Include the package, and use it

    ```js
    import {engine, container, resolver, m} from 'mithril-slide-engine'

    let home = {
        controller: () => {

        },
        view: () => {
            return m('.home', [
                m('.hr', 'This talk is called'),
                m('h1', 'Natural Physics Simulations', m('br'), 'and Canvas Hackery'),
                m('.hr', 'With this guy'),
                m('img', {src: './images/me.gif'}),
                m('.hr', [
                    m('a', {href:'mkeas.org'}, 'mkeas.org'),
                    ' • ',
                    m('a', {href:'twitter.com/matthiasak'}, '@matthiasak')
                ])
            ])
        }
    }

    let e = engine()
    e.insert({

    })
    e.render('html')
    ```

#### License

MIT.
