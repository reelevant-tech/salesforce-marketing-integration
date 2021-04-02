const CracoAntDesignPlugin = require("craco-antd")
const path = require("path")
const fs = require("fs")
const cracoBabelLoader = require("craco-babel-loader")

module.exports = {
  plugins: [
    {
      plugin: cracoBabelLoader,
      options: {}
    },
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#5B25B2",
          "@layout-header-background": "#1D2A3E",
          "@font-family": "Open Sans, Pangram"
        }
      }
    }
  ]
}
