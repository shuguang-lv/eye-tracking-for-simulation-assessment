module.exports = {
  // basic url
  publicPath: './',
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    electronBuilder: {
      // List native deps here if they don't work
      externals: ['python-shell'],
      nodeIntegration: true, // important for node to work
      builderOptions: {
        productName: 'Eye Tracking for Simulation Assessment',
        appId: "com.unnc.grp",
        extraResources: ["./simulation/**"], // pack the simulation codes
      },
    },
  },
}
