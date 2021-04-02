# Eye Tracking for Simulation Assessment

Eye tracking is the process of measuring either the point of gaze
(where the user is looking) or the motion of an eye relative to the
head (Daniel,2004). In this project, users will watch simulations on
the software. Combined with the functions of eye recognition and
fixation point positioning, the researcher analyzes the user's eye
movement trajectory and derives relevant information to obtain the
different concerns of users for different simulations.

Team Blog: https://18757670961.github.io/

## Project structure (frontend)

```
src
|
├─App.vue
│  background.js    // main process (entrance)
│  main.js          // renderer process (Vue initialization)
│
├─assets
│      clmtrackr.js
│      logo.png
│      rally.js     // theme configuration
│      tailwind.css
│
├─components
│      Card.vue
│      Drawer.vue
│      FloatButton.vue
│      GaugeChart.vue
│      Heatmap.vue
│      LoginForm.vue
│      Logout.vue
│      Navbar.vue
│      RegisterForm.vue
│      TopBar.vue
│
├─plugins
│      vuetify.js   // UI framework configuration
│
├─router
│      index.js
│
├─store
│  │  index.js
│  │
│  └─modules
│          Counter.js
│          index.js
│
├─utils
│      commonUtil.js
│      indexedDB.js     // local storage
│      storeUtil.js
│      upload.js        // record uploading API
│
└─views
        About.vue
        EyeTracking.vue
        Guide.vue
        Home.vue
        Records.vue
        Simulation.vue
        Visualization.vue
```

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


## Install Python dependencies (NumPy, OpenCV, Dlib):

```
pip install -r python_requirements.txt
```

## Project structure

```
|-- simulation
    |-- example.py   // the main function
    |-- gaze_tracking
        |-- calibration.py
        |-- eye.py   // detect eyes
        |-- gaze_tracking.py   
        |-- pupil.py   // detect pupil
        |-- trained_models   // a trained model provided by dlib
        |   |-- shape_predictor_68_face_landmarks.dat

```

