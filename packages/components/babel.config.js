module.exports = {
  "env": {
    "test": {
      "presets": [["@babel/preset-env", {"targets": {"node": "current"}}]],
      "plugins": [
        ["import", {
          "libraryName": "mand-mobile",
          "libraryDirectory": "src"
        }]
      ]
    }
  }
}
