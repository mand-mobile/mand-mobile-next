# platform=$1
# target=$2

# echo "build $target in $platform platform"

# export VUE_CLI_SKIP_DIRTY_GIT_PROMPT=true 

# export MAND_INPUT_DIR=".mand-mobile/${platform}"
# export MAND_OUTPUT_DIR="./${platform}/lib"

# vue invoke @mand-mobile/vue-cli-plugin-builder --platform $platform --target $target

# VUE_CLI_SERVICE_CONFIG_PATH=".mand-mobile/${plat}/vue.config.js" npx vue-cli-service md-build --platform=$platform --target=$target

###

platform=$1
buildTarget=$2

echo "build $buildTarget in $platform platform"
export VUE_CLI_SKIP_DIRTY_GIT_PROMPT=true 

if [ "$platform"x = "all"x ]; then
  run-s "build:*"
else
  export MAND_INPUT_DIR=".mand-mobile/${platform}/$buildTarget"
  export MAND_OUTPUT_DIR="$platform/$buildTarget"

  npx vue invoke @mand-mobile/vue-cli-plugin-builder --platform $platform --target $buildTarget
  VUE_CLI_SERVICE_CONFIG_PATH=".mand-mobile/${plat}/vue.config.js" npx vue-cli-service md-build --platform=$platform --target=$buildTarget
fi
