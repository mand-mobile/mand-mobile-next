# platform=$1
# target=$2

# echo "build $target in $platform platform"

export VUE_CLI_SKIP_DIRTY_GIT_PROMPT=true 

export MAND_INPUT_DIR=".mand-mobile/web-bundle"
export MAND_OUTPUT_DIR="web/bundle"

# vue invoke @mand-mobile/vue-cli-plugin-builder --platform web --target bundle

VUE_CLI_SERVICE_CONFIG_PATH="$MAND_INPUT_DIR/vue.config.js" npx vue-cli-service md-build --platform=web --target=bundle $MAND_INPUT_DIR/main.js
