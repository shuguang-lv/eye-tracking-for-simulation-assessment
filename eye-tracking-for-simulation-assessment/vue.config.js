module.exports = {
    transpileDependencies: ['vuetify'],
    pluginOptions: {
        electronBuilder: {
            // List native deps here if they don't work
            externals: ['python-shell'],
            nodeIntegration: true
        },
    },
}
