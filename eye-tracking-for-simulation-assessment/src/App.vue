<template>
    <v-app>
        <!-- <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                    transition="scale-transition"
                    width="40"
                />

                <v-img
                    alt="Vuetify Name"
                    class="shrink mt-1 hidden-sm-and-down"
                    contain
                    min-width="100"
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                    width="100"
                />
            </div>

            <v-spacer></v-spacer>

            <v-btn
                href="https://github.com/vuetifyjs/vuetify/releases/latest"
                target="_blank"
                text
            >
                <span class="mr-2">Latest Release</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar> -->
        <Header />
        <v-main>
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </v-main>
    </v-app>
</template>

<script src="./storeUtil.js"></script>
<script>
// import HelloWorld from './components/HelloWorld'
import Header from "./components/Header";

export default {
    name: 'App',

    components: {
        Header
    },

    data: () => ({
        //
    }),

    mounted() {
        // this.sendToPython()
        // console.log(process.env.BASE_URL)
    },

    methods: {
        async sendToPython() {
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
                scriptPath: 'public/',
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
        },
    },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
