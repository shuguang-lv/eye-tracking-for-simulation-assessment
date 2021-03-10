module.exports = {
  // 基本路径
  publicPath: './',
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    electronBuilder: {
      // List native deps here if they don't work
      externals: ['python-shell'],
      nodeIntegration: true,
      builderOptions: {
        productName: 'Eye Tracking for Simulation Assessment',
        appId: "com.unnc.grp",
        extraResources: ["./simulation/**"],
      },
    },
  },
}
