# Eye Tracking for Simulation Assessment

## NPM source setup
```
npm config set registry https://registry.npm.taobao.org/

npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/

npm config set SASS_BINARY_SITE='https://npm.taobao.org/mirrors/node-sass'
```

## Project setup
```
npm cache clean -f

npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run electron:build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
