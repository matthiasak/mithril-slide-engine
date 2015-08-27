### Universal JS Boilerplate

---

[![NPM](https://nodei.co/npm/universal-js-boilerplate.png)](https://nodei.co/npm/universal-js-boilerplate/)

![](https://david-dm.org/matthiasak/universal-js-boilerplate.svg)

This is a scaffolding project that includes boilerplate code for:

- Node
- Heroku
- Babel, Babel runtime, ES6/2015, ES7/2016
- Express, with a default server, some example code and routes, static file sharing, and proxy code
- SCSS-like syntax driven by PostCSS
- Some example SCSS, grids, normalize and typeplate css kits (installed from bower)
- An example index.html for serving files
- An example .gitignore for the project
- A host of npm scripts for watching and building your files

#### How to get started

1. Start your own project folder 

    ```sh
    cd ~/Github\ Projects/
    mkdir example01
    cd example01
    ```

2. Install this package through npm (**Warning**: this _will_ delete/overwrite files, so **ONLY** use this on brand new project folders)

    ```sh
    npm install universal-js-boilerplate
    ```

3. Watch the package scaffold out files in your project
4. Link or install global tools like bower, babel, etc...

    ```sh
    # first time ever installing this package on your machine?
    npm run setup
    # if not then just run..
    npm run linkup
    ```
    
5. Start your server:

    ```sh
    npm run s

    # Alternatively, if you need nodemon to auto-reload your server 
    # (when doing server-side work)
    # npm run server
    ```

6. Ready to push your code live, and want to minify your code with uglifyjs?

    ```sh
    npm run build
    ```

#### License

MIT.
