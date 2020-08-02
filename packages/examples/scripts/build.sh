platform=$1
componentName=$2

echo "build $componentName in $platform platform"

export VUE_CLI_SKIP_DIRTY_GIT_PROMPT=true 

export MAND_INPUT_DIR="../components/src"
export MAND_OUTPUT_DIR=".mand-mobile/${platform}/lib"

if [ $componentName ]; then
  vue invoke @mand-mobile/vue-cli-plugin-builder --platform $platform --target lib --component-name=$componentName
else 
  vue invoke @mand-mobile/vue-cli-plugin-builder --platform $platform --target lib
fi

VUE_CLI_SERVICE_CONFIG_PATH=".mand-mobile/${plat}/vue.config.js" npx vue-cli-service md-build --platform=$platform --target=lib
