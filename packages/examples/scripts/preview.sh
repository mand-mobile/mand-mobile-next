platform=$1
componentName=$2

echo "preview $componentName in $platform platform"
export VUE_CLI_SKIP_DIRTY_GIT_PROMPT=true 

if [ "$platform"x = "all"x ]; then
  platforms="web uni"

  run-p "serve:* -- ${componentName}"
else
  export MAND_INPUT_DIR=".mand-mobile/${platform}"
  export MAND_OUTPUT_DIR="dist/development/mp-weixin"

  if [ $componentName ]; then
    vue invoke @mand-mobile/vue-cli-plugin-builder --platform $platform --target example --component-name=$componentName
  else 
    vue invoke @mand-mobile/vue-cli-plugin-builder --platform $platform --target example
  fi
  VUE_CLI_SERVICE_CONFIG_PATH=".mand-mobile/${plat}/vue.config.js" npx vue-cli-service md-serve --platform=$platform
fi
