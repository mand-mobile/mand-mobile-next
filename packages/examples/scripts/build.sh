platform=$1
target=$2

echo "build $target in $platform platform"

export VUE_CLI_SKIP_DIRTY_GIT_PROMPT=true 

export MAND_INPUT_DIR="../components/src"
export MAND_OUTPUT_DIR=".mand-mobile/${platform}/lib"

vue invoke @mand-mobile/vue-cli-plugin-builder --platform $platform --target $target

VUE_CLI_SERVICE_CONFIG_PATH=".mand-mobile/${plat}/vue.config.js" npx vue-cli-service md-build --platform=$platform --target=$target
