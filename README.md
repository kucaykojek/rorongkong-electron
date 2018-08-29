
# Rorongkong Electron

Starting kit to create awesome electron apps.

#### Installation
Running development:
```sh
npm i && npm start
```

**Bugs** You need to reload after you start.

#### How To Use
Project Structure:
```bash

public/ # Auto generated public directory
renderer/ # Place your renderer js files
src/ # Your working directory
  img/ # Put your image/asset files here
  js/ # Put your .js files here
  scss/ # Put your .scss files here
gulpfile.js # Gulp file
main.js # Electron main js file
...
```
Adding more directory one level inside `src`? Don't forget to add few lines to automate the task in `gulpfile.js`

#### Features
- Electron - Build cross platform desktop apps
- Gulp - For automating tasks
- Support **ES6** for your Javascript
- Support **Sass** for your Stylesheet

#### License
MIT
