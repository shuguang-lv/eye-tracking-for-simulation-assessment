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
        appId: 'com.unnc.grp',
        extraResources: ['./simulation/**'], // pack the simulation codes
        win: {
          icon: 'build/icons/icon.ico',
          target: [
            {
              // 打包成一个独立的 exe 安装程序
              target: 'nsis',
              // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大
              arch: [
                'x64',
                // 'ia32'
              ],
            },
          ],
          asar: false,
        },
        nsis: {
          // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
          oneClick: false,
          // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowElevation: true,
          // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
          allowToChangeInstallationDirectory: true,
        },
      },
    },
  },
}
