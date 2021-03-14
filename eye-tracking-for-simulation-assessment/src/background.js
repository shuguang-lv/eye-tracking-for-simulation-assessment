'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  Menu,
  MenuItem,
  ipcMain,
  dialog,
  nativeImage,
} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import fs from 'fs'
import path from 'path'
import http from 'http'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    // show: false,
    backgroundColor: '#FFF',
    // height: 720,
    // width: 1280,
    // minHeight: 600,
    // maxHeight: 2160,
    // minWidth: 800,
    // maxWidth: 3840,
    // useContentSize: true,
    resizable: true,
    title: 'Eye Tracking for Simulation Assessment',
    frame: false,
    center: true,
    resizable: false,
    titleBarStyle: 'hidden',
    fullscreen: true,
    icon: path.join(__static, 'icon.png'),
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      backgroundThrottling: false, // 当页面被置于非激活窗口的时候是否停止动画和计时器
      webSecurity: false,
    },
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// Example of usage of Vuex Store from the main process
// Results of action will be automatically passed to all renderer processes
// setInterval(() => {
//   store.dispatch('decrement')
// }, 5000)

//////////////////////////////////////////////////////////////////////////////////

ipcMain.on('run', (event) => {
  sendToPython()
  event.reply('success')
})

ipcMain.on('downloadMap', (event, url, fileName) => {
  downloadMapFile(event, url, fileName)
})

ipcMain.on('play', (event, source) => {
  playSimulation(event, source)
})

ipcMain.on('loadMap', (event, file) => {
  readMapFile(event, file)
})

ipcMain.on('rename', (event, name) => {
  renameFile(event, name)
})

ipcMain.on('copyMap', (event, file) => {
  copyMapFile(event, file)
})

function sendToPython() {
  // var cp = require('child_process')
  // const path = require('path')
  // const filePath = path.join(process.env.BASE_URL, 'calc.py')
  // cp.spawn('python', [filePath])

  const { PythonShell } = require('python-shell')
  // const path = require('path')

  // const filePath = path.resolve(process.env.BASE_URL)

  const options = {
    mode: 'text', // 'json', 'binary'
    pythonOptions: ['-u'],
    scriptPath: './',
  }

  PythonShell.run('calc.py', options, (err) => {
    if (err) throw err
    console.log('finished')
    // results is an array consisting of messages collected during execution
    // console.log('results: ', results);
    // this.result = results[0];
  })

  // exchange data between node and python ////////////////////

  // const pyshell = new PythonShell('my_script.py');

  // // sends a message to the Python script via stdin
  // pyshell.send('hello');

  // pyshell.on('message', (message) => {
  //   // received a message sent from the Python script (a simple "print" statement)
  //   console.log(message);
  // });

  // // end the input stream and allow the process to exit
  // pyshell.end((err, code, signal) => {
  //   if (err) throw err;
  //   console.log(`The exit code was: ${code}`);
  //   console.log(`The exit signal was: ${signal}`);
  //   console.log('finished');
  // });

  // ////////////////////////////////////////////////////////////
}

function downloadMapFile(event, url, fileName) {
  let filePath
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    filePath = path.join('./simulation/', fileName + '.csv')
  } else {
    filePath = path.join('./resources/simulation/', fileName + '.csv')
  }
  if (fs.existsSync(filePath)) {
    console.log('文件已存在')
  } else {
    http
      .get(url, (res) => {
        res.setEncoding('utf8')
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          fs.writeFileSync(filePath, data)
        })
      })
      .on('error', (e) => {
        console.log(`Got error: ${e.message}`)
      })

    // let stream = fs.createWriteStream(filePath)
    // request(url)
    //   .pipe(stream)
    //   .on('close', (err) => {
    //     console.log('文件下载完毕')
    //     event.reply('mapDownloaded' + fileName)
    //   })
  }
}

function playSimulation(event, source) {
  let simulation
  switch (source) {
    case 'Air Defense':
      simulation = 'AirDefense'
      break

    case 'Billiard Balls':
      simulation = 'BilliardBalls'
      break

    case 'Cargo Unload':
      simulation = 'CargoUnload'
      break

    case 'City Square':
      simulation = 'CitySquare'
      break

    case 'Covid-19':
      simulation = 'Covid19'
      break

    case 'Gas Station':
      simulation = 'GasStation'
      break

    case 'Maze':
      simulation = 'Maze'
      break

    case 'Terrorist Attack On A City Square':
      simulation = 'TerroristAttackOnCitySquare'
      break

    case 'Three Body Problem':
      simulation = 'ThreeBodyProblem'
      break
  }

  let url
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    url = path.join('./simulation/')
  } else {
    url = path.join('./resources/simulation/')
  }
  // const { execSync } = require('child_process')
  // execSync(simulation + '.bat', { cwd: url }, (err, stdout, stderr) => {
  //   if (err) {
  //     console.error(err)
  //     return
  //   }
  //   console.log(stdout)
  // })

  const { execSync } = require('child_process')
  execSync('java Main ' + simulation, { cwd: url }, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(stdout)
  })

  event.reply('success' + source)
}

function readMapFile(event, file) {
  let filePath
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    filePath = path.join('./simulation/', file + '.csv')
  } else {
    filePath = path.join('./resources/simulation/', file + '.csv')
  }

  if (!fs.existsSync(filePath)) {
    console.log('csv文件不存在')
    event.reply('mapLoaded' + file, [])
    return
  }

  let data = fs.readFileSync(filePath)

  let table = []
  data = data.toString()
  table = data.match(/\d+(.\d+)?/g)

  let result = []
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 24; col++) {
      result.push([row, col, parseInt(table[(9 - row) * 24 + col + 1])])
    }
  }

  event.reply('mapLoaded' + file, result)
}

function renameFile(event, name) {
  let dir
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    dir = path.resolve('./simulation/')
  } else {
    dir = path.resolve('./resources/simulation/')
  }

  let oldPath = path.join(dir, 'std.csv')
  let newPath = path.join(dir, name + 'STD' + '.csv')

  if (!fs.existsSync(oldPath)) {
    console.log('csv文件不存在')
    event.reply('renamed' + name)
    return
  }

  fs.renameSync(oldPath, newPath)

  oldPath = path.join(dir, 'count.csv')
  newPath = path.join(dir, name + '.csv')

  if (!fs.existsSync(oldPath)) {
    console.log('csv文件不存在')
    event.reply('renamed' + name)
    return
  }

  fs.renameSync(oldPath, newPath)
  event.reply('renamed' + name)

  // fs.readdir(dir, (err, files) => {
  //   files.forEach((value) => {
  //     if (value == 'map.csv') {
  //       console.log(oldPath);
  //       fs.renameSync(oldPath, newPath)
  //     }
  //   })
  // })

  // fs.mkdirSync(newPath)
  // fs.openSync(newPath)
  // fs.readFile(oldPath, (err, data) => {
  //   if (err) {
  //     console.log(err.stack)
  //     return
  //   }

  //   fs.writeFileSync(newPath, data)
  //   fs.closeSync(newPath)
  // })
}

function copyMapFile(event, file) {
  let filePath
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    filePath = path.join('./simulation/', file + '.csv')
  } else {
    filePath = path.join('./resources/simulation/', file + '.csv')
  }

  // event.reply('mapCopied' + file, path.resolve(filePath))

  let data = fs.readFileSync(filePath)
  data = new Buffer(data).toString('base64')
  event.reply('mapCopied' + file, data)
}

